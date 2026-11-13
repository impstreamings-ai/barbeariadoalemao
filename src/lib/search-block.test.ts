// Testes unitários de withSearchBlock. Execução (Node 22.18+ ou 24, sem dependências):
//   node --test src/lib/search-block.test.ts
import assert from "node:assert/strict";
import { test } from "node:test";

import { withSearchBlock } from "./search-block.ts";

const NOINDEX = "noindex, nofollow";
const req = (host: string) => new Request(`https://${host}/`);
const robots = (res: Response) => res.headers.get("x-robots-tag");

test("host *.workers.dev de três níveis recebe noindex", () => {
  const res = withSearchBlock(
    req("barbeariadoalemao.impstreamings.workers.dev"),
    new Response("x"),
  );
  assert.equal(robots(res), NOINDEX);
});

test("URL de preview de versão *.workers.dev recebe noindex", () => {
  const res = withSearchBlock(
    req("abc12345-barbeariadoalemao.impstreamings.workers.dev"),
    new Response("x"),
  );
  assert.equal(robots(res), NOINDEX);
});

test("domínio próprio não recebe o cabeçalho", () => {
  assert.equal(
    robots(withSearchBlock(req("www.barbeariadoalemao.com.br"), new Response("x"))),
    null,
  );
});

test("lovable.app não recebe o cabeçalho", () => {
  assert.equal(
    robots(withSearchBlock(req("barbeariadoalemao.lovable.app"), new Response("x"))),
    null,
  );
});

test("host parecido (evilworkers.dev) não recebe o cabeçalho", () => {
  assert.equal(robots(withSearchBlock(req("evilworkers.dev"), new Response("x"))), null);
});

test("localhost não recebe o cabeçalho", () => {
  const res = withSearchBlock(new Request("http://localhost/"), new Response("x"));
  assert.equal(robots(res), null);
});

test("maiúsculas no host são normalizadas pela URL", () => {
  assert.equal(robots(withSearchBlock(req("Foo.Bar.WORKERS.DEV"), new Response("x"))), NOINDEX);
});

for (const status of [200, 404, 500]) {
  test(`status ${status} é preservado e recebe o cabeçalho`, async () => {
    const res = withSearchBlock(req("a.b.workers.dev"), new Response("corpo", { status }));
    assert.equal(res.status, status);
    assert.equal(robots(res), NOINDEX);
    assert.equal(await res.text(), "corpo");
  });
}

test("redirect (cabeçalhos imutáveis) funciona e preserva o Location", () => {
  const res = withSearchBlock(
    req("a.b.workers.dev"),
    Response.redirect("https://a.b.workers.dev/x", 301),
  );
  assert.equal(res.status, 301);
  assert.equal(res.headers.get("location"), "https://a.b.workers.dev/x");
  assert.equal(robots(res), NOINDEX);
});

test("304 sem corpo funciona", () => {
  const res = withSearchBlock(req("a.b.workers.dev"), new Response(null, { status: 304 }));
  assert.equal(res.status, 304);
  assert.equal(robots(res), NOINDEX);
});

test("não duplica: um X-Robots-Tag existente é substituído (um único valor)", () => {
  const res = withSearchBlock(
    req("a.b.workers.dev"),
    new Response("x", { headers: { "X-Robots-Tag": "all" } }),
  );
  assert.equal(robots(res), NOINDEX);
  assert.equal(
    [...res.headers].filter(([name]) => name.toLowerCase() === "x-robots-tag").length,
    1,
  );
});

test("demais cabeçalhos são preservados", () => {
  const res = withSearchBlock(
    req("a.b.workers.dev"),
    new Response("x", {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=3600",
      },
    }),
  );
  assert.equal(res.headers.get("content-type"), "text/html; charset=utf-8");
  assert.equal(res.headers.get("cache-control"), "public, max-age=3600");
});

test("outro host devolve o mesmo objeto, sem custo", () => {
  const original = new Response("x");
  assert.equal(withSearchBlock(req("example.com"), original), original);
});

test("streaming é preservado: o primeiro pedaço chega antes do fim", async () => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let release!: () => void;
  const gate = new Promise<void>((resolve) => (release = resolve));
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(encoder.encode("PRIMEIRO"));
      await gate;
      controller.enqueue(encoder.encode("ULTIMO"));
      controller.close();
    },
  });
  const res = withSearchBlock(
    req("a.b.workers.dev"),
    new Response(stream, { headers: { "content-type": "text/html" } }),
  );
  const reader = res.body!.getReader();
  const first = await Promise.race([
    reader.read(),
    new Promise<"TIMEOUT">((resolve) => setTimeout(() => resolve("TIMEOUT"), 500)),
  ]);
  assert.notEqual(first, "TIMEOUT");
  assert.equal(decoder.decode((first as ReadableStreamReadResult<Uint8Array>).value), "PRIMEIRO");
  release();
  const rest = await reader.read();
  assert.equal(decoder.decode(rest.value), "ULTIMO");
});

test("streaming: o fim do stream chega depois do primeiro pedaço", async () => {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("a"));
      controller.close();
    },
  });
  const res = withSearchBlock(req("a.b.workers.dev"), new Response(stream));
  const reader = res.body!.getReader();
  assert.equal((await reader.read()).done, false);
  assert.equal((await reader.read()).done, true);
});

test("requisição HEAD funciona", () => {
  const head = new Request("https://a.b.workers.dev/", { method: "HEAD" });
  const res = withSearchBlock(head, new Response(null, { status: 200 }));
  assert.equal(res.status, 200);
  assert.equal(robots(res), NOINDEX);
});
