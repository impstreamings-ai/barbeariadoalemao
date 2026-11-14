// Pré-renderização: gera o HTML estático a partir do próprio servidor compilado, sem servidor HTTP
// e sem rede. Roda depois do "vite build" (veja o script "build" do package.json).
// O layout é detectado pelos arquivos que o Nitro gerou (e não por variáveis de ambiente):
//  - Cloudflare (preset cloudflare-module): .output/server/index.mjs, estáticos em .output/public.
//    Os arquivos são servidos pelo ASSETS sem invocar o Worker; outras rotas caem no Worker (SSR).
//  - Netlify (preset netlify): .netlify/functions-internal/server/main.mjs, estáticos no diretório
//    público indicado por nitro.json (dist).
import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

import { assertValidHome } from "./validate-home.mjs";

const out = resolve(process.argv[2] ?? ".output");
const cloudflareEntry = resolve(out, "server/index.mjs");
const netlifyDir = resolve(".netlify/functions-internal");
const netlifyEntry = resolve(netlifyDir, "server/main.mjs");
const ctx = { waitUntil() {}, passThroughOnException() {} };

let platform;
let publicDir;
let fetchHandler;
if (existsSync(cloudflareEntry)) {
  platform = "cloudflare";
  publicDir = resolve(out, "public");
  const { default: worker } = await import(pathToFileURL(cloudflareEntry).href);
  fetchHandler = (request) => worker.fetch(request, {}, ctx);
} else if (existsSync(netlifyEntry)) {
  platform = "netlify";
  const meta = JSON.parse(await readFile(resolve(netlifyDir, "nitro.json"), "utf8"));
  publicDir = resolve(netlifyDir, meta.publicDir);
  const { default: handler } = await import(pathToFileURL(netlifyEntry).href);
  fetchHandler = (request) => handler(request);
} else {
  throw new Error(
    `prerender: build não encontrado. Esperado ${cloudflareEntry} (Cloudflare) ou ${netlifyEntry} (Netlify).`,
  );
}
console.log(`prerender: plataforma ${platform}, estáticos em ${publicDir}`);

// Host neutro: a proteção por host (*.workers.dev) não pode entrar no HTML estático.
async function render(path) {
  const res = await fetchHandler(new Request(`http://localhost${path}`));
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
  if (t.path === "/") assertValidHome(res.body.toString("utf8"));
  await writeFile(resolve(publicDir, t.file), res.body);
  console.log(`prerender: ${t.file} (${res.body.length} bytes)`);
}

// A regra de noindex por host (*.workers.dev) é específica da Cloudflare e vem de public/_headers
// (mesclado pelo Nitro). O parser do ASSETS aceita só um "*" por regra, então
// "https://*.workers.dev/*" seria ignorada: o host usa placeholders.
if (platform === "cloudflare") {
  const headers = await readFile(resolve(publicDir, "_headers"), "utf8");
  expect(
    /^https:\/\/:worker\.:account\.workers\.dev\/\*\s*\n\s+X-Robots-Tag:\s*noindex, nofollow/m.test(
      headers,
    ),
    "regra de X-Robots-Tag para *.workers.dev ausente em .output/public/_headers",
  );
  console.log("prerender: regra noindex para *.workers.dev presente em _headers");
}
