// Testes de validateHome. Execução (Node 22.18+ ou 24, sem dependências):
//   node --test scripts/validate-home.test.mjs
// Os casos válidos usam o HTML real de .output/public/index.html quando existir (após o build);
// os inválidos derivam de um HTML mínimo válido, para provar que cada requisito é exigido.
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

import { assertValidHome, EXPECTED_CANONICAL, validateHome } from "./validate-home.mjs";

const LD = JSON.stringify({ "@context": "https://schema.org", "@type": "Barbershop", name: "x" });
const SECTIONS = ["topo", "sobre", "servicos", "horarios", "localizacao"]
  .map((id) => `<section id="${id}"></section>`)
  .join("");

function page({
  lang = "pt-BR",
  title = "<title>Barbearia do Alemão</title>",
  canonical = `<link rel="canonical" href="${EXPECTED_CANONICAL}"/>`,
  ogUrl = `<meta property="og:url" content="${EXPECTED_CANONICAL}"/>`,
  ld = `<script type="application/ld+json">${LD}</script>`,
  body = `<h1>Técnica no corte.<br/>Respeito ao seu estilo.</h1>${SECTIONS}`,
} = {}) {
  return `<!DOCTYPE html><html lang="${lang}"><head>${title}${canonical}
<meta property="og:title" content="t"/><meta property="og:description" content="d"/>${ogUrl}${ld}
</head><body>${body}</body></html>`;
}

const has = (problems, fragment) =>
  assert.ok(
    problems.some((p) => p.includes(fragment)),
    `esperava "${fragment}" em: ${JSON.stringify(problems)}`,
  );

test("HTML mínimo válido passa", () => {
  assert.deepEqual(validateHome(page()), []);
});

const real = ".output/public/index.html";
test("HTML real do build passa", { skip: !existsSync(real) }, () => {
  assert.deepEqual(validateHome(readFileSync(real, "utf8")), []);
});

test("rejeita HTML vazio", () => {
  has(validateHome(""), "HTML vazio");
  has(validateHome("   \n"), "HTML vazio");
});

test("rejeita página de erro genérica com status 200 (a do próprio Worker)", () => {
  const err = `<!doctype html><html lang="en"><head><title>This page didn't load</title></head>
<body><h1>This page didn't load</h1></body></html>`;
  const problems = validateHome(err);
  assert.ok(problems.length >= 4);
  has(problems, "canonical ausente");
  has(problems, "JSON-LD ausente");
  has(problems, "página de erro");
});

test("rejeita HTML com <h1> mas sem o conteúdo real", () => {
  const problems = validateHome(page({ body: "<h1>Algo deu errado</h1>" }));
  has(problems, "sem a manchete");
  has(problems, "seções ausentes");
  has(problems, "página de erro");
});

test("rejeita HTML sem canonical", () => {
  has(validateHome(page({ canonical: "" })), "canonical ausente");
});

test("rejeita canonical diferente do esperado", () => {
  const problems = validateHome(
    page({ canonical: '<link rel="canonical" href="https://outro.example/"/>' }),
  );
  has(problems, "diferente de");
  has(problems, "diverge do canonical");
});

test("rejeita HTML sem JSON-LD", () => {
  has(validateHome(page({ ld: "" })), "JSON-LD ausente");
});

test("rejeita JSON-LD inválido", () => {
  has(
    validateHome(page({ ld: '<script type="application/ld+json">{"@type": </script>' })),
    "não é JSON válido",
  );
});

test("rejeita JSON-LD válido com @type incoerente", () => {
  const ld = `<script type="application/ld+json">{"@type":"Restaurant"}</script>`;
  has(validateHome(page({ ld })), 'nenhum JSON-LD com @type "Barbershop"');
});

test("rejeita idioma diferente de pt-BR", () => {
  has(validateHome(page({ lang: "en" })), 'lang="pt-BR"');
  has(validateHome(page({ lang: "pt-PT" })), 'lang="pt-BR"');
});

test("rejeita og:url divergente do canonical", () => {
  const ogUrl = '<meta property="og:url" content="https://barbeariadoalemao.lovable.app/outra"/>';
  has(validateHome(page({ ogUrl })), "diverge do canonical");
});

test("rejeita og:url, <title> ausentes", () => {
  has(validateHome(page({ ogUrl: "" })), "og:url ausente");
  has(validateHome(page({ title: "<title> </title>" })), "<title> ausente ou vazio");
});

test("assertValidHome lança erro com a lista de requisitos", () => {
  assert.throws(() => assertValidHome(page({ canonical: "" })), /canonical ausente/);
  assert.doesNotThrow(() => assertValidHome(page()));
});
