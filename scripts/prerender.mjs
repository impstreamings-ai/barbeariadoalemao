// Pré-renderização: gera o HTML estático a partir do próprio Worker compilado (.output/server),
// sem servidor e sem rede. Roda depois do "vite build" (veja o script "build" do package.json).
// Os arquivos gravados em .output/public são servidos pelo ASSETS sem invocar o Worker;
// qualquer outra rota continua caindo no Worker (SSR).
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const out = resolve(process.argv[2] ?? ".output");
const { default: worker } = await import(pathToFileURL(resolve(out, "server/index.mjs")).href);
const ctx = { waitUntil() {}, passThroughOnException() {} };

// Host neutro: a proteção por host (*.workers.dev) não pode entrar no HTML estático.
async function render(path) {
  const res = await worker.fetch(new Request(`http://localhost${path}`), {}, ctx);
  return {
    status: res.status,
    type: res.headers.get("content-type") ?? "",
    robots: res.headers.get("x-robots-tag"),
    body: Buffer.from(await res.arrayBuffer()),
  };
}

function expect(cond, message) {
  if (!cond) throw new Error(`prerender: ${message}`);
}

const targets = [
  { path: "/", file: "index.html", status: 200, type: "text/html", marker: "<h1" },
  { path: "/__nao-existe__", file: "404.html", status: 404, type: "text/html", marker: "<html" },
  { path: "/sitemap.xml", file: "sitemap.xml", status: 200, type: "xml", marker: "<urlset" },
];

for (const t of targets) {
  const res = await render(t.path);
  expect(res.status === t.status, `${t.path} retornou ${res.status} (esperado ${t.status})`);
  expect(res.type.includes(t.type), `${t.path} com content-type inesperado: ${res.type}`);
  expect(res.body.includes(t.marker), `${t.path} sem o marcador ${t.marker}`);
  expect(res.robots === null, `${t.path} não deve trazer X-Robots-Tag em host neutro`);
  await writeFile(resolve(out, "public", t.file), res.body);
  console.log(`prerender: ${t.file} (${res.body.length} bytes)`);
}

// A regra de noindex por host vem de public/_headers (mesclado pelo Nitro). O parser do ASSETS aceita
// só um "*" por regra, então "https://*.workers.dev/*" seria ignorada: o host usa placeholders.
const headers = await readFile(resolve(out, "public/_headers"), "utf8");
expect(
  /^https:\/\/:worker\.:account\.workers\.dev\/\*\s*\n\s+X-Robots-Tag:\s*noindex, nofollow/m.test(
    headers,
  ),
  "regra de X-Robots-Tag para *.workers.dev ausente em .output/public/_headers",
);
console.log("prerender: regra noindex para *.workers.dev presente em _headers");
