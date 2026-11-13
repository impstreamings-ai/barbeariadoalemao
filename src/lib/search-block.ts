/**
 * Impede a indexação de qualquer cópia do site servida em *.workers.dev (endereço de teste).
 * Só altera a resposta quando o host termina em ".workers.dev"; qualquer outro host
 * (domínio próprio, lovable.app, localhost) recebe a resposta intacta, sem custo.
 */
export function withSearchBlock(request: Request, response: Response): Response {
  let hostname: string;
  try {
    hostname = new URL(request.url).hostname;
  } catch {
    return response;
  }
  if (!hostname.endsWith(".workers.dev")) return response;

  // Copia a resposta (os cabeçalhos de respostas como redirect são imutáveis); o corpo segue em stream.
  const blocked = new Response(response.body, response);
  blocked.headers.set("X-Robots-Tag", "noindex, nofollow");
  return blocked;
}
