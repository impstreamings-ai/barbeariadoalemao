// Validação do HTML pré-renderizado da página inicial. Pura (sem I/O): recebe o HTML e devolve a
// lista de requisitos não atendidos. Usada por scripts/prerender.mjs e testada em
// scripts/validate-home.test.mjs (node --test scripts/validate-home.test.mjs).

// URL pública atual (provisória). Quando o domínio definitivo entrar (SITE_URL em src/lib/site.ts),
// atualize esta constante no mesmo PR.
export const EXPECTED_CANONICAL = "https://barbeariadoalemao.lovable.app/";
export const EXPECTED_LD_TYPE = "Barbershop";
// Seções da página real (src/components/site) que identificam o conteúdo principal.
const EXPECTED_SECTIONS = ["topo", "sobre", "servicos", "horarios", "localizacao"];

const attr = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];

function metaContent(html, key, value) {
  for (const tag of html.match(/<meta\b[^>]*>/g) ?? []) {
    if (attr(tag, key) === value) return attr(tag, "content");
  }
  return undefined;
}

export function validateHome(html) {
  const problems = [];
  const need = (cond, message) => {
    if (!cond) problems.push(message);
    return cond;
  };

  if (!need(typeof html === "string" && html.trim().length > 0, "HTML vazio")) return problems;

  need(/<html\b[^>]*\blang="pt-BR"/.test(html), 'atributo lang="pt-BR" ausente em <html>');

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
  need(!!title, "<title> ausente ou vazio");

  const canonicalTag = (html.match(/<link\b[^>]*>/g) ?? []).find(
    (t) => attr(t, "rel") === "canonical",
  );
  const canonical = canonicalTag && attr(canonicalTag, "href");
  if (need(!!canonical, "canonical ausente")) {
    need(
      canonical === EXPECTED_CANONICAL,
      `canonical "${canonical}" diferente de "${EXPECTED_CANONICAL}"`,
    );
  }

  const ogTitle = metaContent(html, "property", "og:title");
  const ogDescription = metaContent(html, "property", "og:description");
  const ogUrl = metaContent(html, "property", "og:url");
  need(!!ogTitle, "og:title ausente ou vazio");
  need(!!ogDescription, "og:description ausente ou vazio");
  if (need(!!ogUrl, "og:url ausente ou vazio") && canonical) {
    need(ogUrl === canonical, `og:url "${ogUrl}" diverge do canonical "${canonical}"`);
  }

  const blocks = [
    ...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
  ];
  if (need(blocks.length > 0, "JSON-LD ausente")) {
    const parsed = [];
    blocks.forEach((m, i) => {
      try {
        parsed.push(JSON.parse(m[1]));
      } catch (e) {
        problems.push(`JSON-LD #${i + 1} não é JSON válido: ${e.message}`);
      }
    });
    if (parsed.length > 0) {
      const types = parsed.flatMap((d) => (Array.isArray(d) ? d : [d])).map((d) => d?.["@type"]);
      need(
        types.includes(EXPECTED_LD_TYPE),
        `nenhum JSON-LD com @type "${EXPECTED_LD_TYPE}" (encontrados: ${types.join(", ") || "nenhum"})`,
      );
    }
  }

  // Conteúdo principal: exatamente um <h1> com a manchete e as seções reais; recusa páginas de erro.
  const h1s = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/g) ?? [];
  need(h1s.length === 1, `esperado exatamente um <h1>, encontrados ${h1s.length}`);
  need(
    h1s.length === 1 && /Técnica no corte/.test(h1s[0]) && /Respeito ao seu estilo/.test(h1s[0]),
    "<h1> sem a manchete da página inicial",
  );
  const missing = EXPECTED_SECTIONS.filter((id) => !html.includes(`<section id="${id}"`));
  need(missing.length === 0, `seções ausentes: ${missing.join(", ")}`);
  need(
    !/This page didn't load|Algo deu errado|Internal Server Error/i.test(html),
    "o HTML parece uma página de erro",
  );

  return problems;
}

export function assertValidHome(html) {
  const problems = validateHome(html);
  if (problems.length > 0) {
    throw new Error(`HTML de "/" inválido (${problems.length}):\n  - ${problems.join("\n  - ")}`);
  }
}
