// Verificação estática do HTML renderizado (SSR). Sem dependências.
// Uso: npm run dev (outro terminal) && node scripts/check-site.mjs [http://127.0.0.1:4173]
const base = process.argv[2] ?? "http://127.0.0.1:4173";
const html = await (await fetch(`${base}/`)).text();
const fails = [];
const ok = (c, m) => { console.log(`${c ? "PASS" : "FAIL"}  ${m}`); if (!c) fails.push(m); };

ok(/<html[^>]*lang="pt-BR"/.test(html), "html lang=pt-BR");
ok((html.match(/<h1[\s>]/g) ?? []).length === 1, "exatamente um <h1>");
ok((html.match(/<meta name="description"/g) ?? []).length === 1, "uma única meta description");
ok(/rel="canonical" href="https:\/\//.test(html), "canonical absoluto");
ok(/property="og:image" content="https:\/\//.test(html), "og:image absoluto");
const imgs = html.match(/<img\b[^>]*>/g) ?? [];
ok(imgs.length > 0 && imgs.every((i) => /\balt=/.test(i)), `todas as ${imgs.length} <img> têm alt`);
ok(imgs.every((i) => /\bwidth=/.test(i) && /\bheight=/.test(i)), "todas as <img> têm width/height");

const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
const anchors = [...new Set([...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]))];
const broken = anchors.filter((a) => !ids.has(a));
ok(broken.length === 0, `âncoras internas resolvem (${anchors.length})${broken.length ? " quebradas: " + broken : ""}`);

const wa = [...new Set([...html.matchAll(/href="(https:\/\/wa\.me\/[^"]+)"/g)].map((m) => m[1].replaceAll("&amp;", "&")))];
ok(wa.length > 0 && wa.every((u) => u.startsWith("https://wa.me/5515988030574?text=")), `links WhatsApp com número correto e mensagem (${wa.length} variações)`);

const ld = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
let data; try { data = JSON.parse(ld[1].replaceAll("&quot;", '"')); } catch {}
ok(!!data && data["@type"] === "Barbershop", "JSON-LD válido (Barbershop)");
if (data) {
  const text = html.replace(/<[^>]+>/g, " ");
  const all = data.openingHoursSpecification.every((o) => text.includes(o.opens) && text.includes(o.closes));
  ok(all, "horários do JSON-LD aparecem na página");
  ok(text.includes("98803-0574") && data.telephone === "+5515988030574", "telefone consistente");
}
const sm = await fetch(`${base}/sitemap.xml`).then((r) => r.text());
ok(/<loc>https:\/\/[^<]+<\/loc>/.test(sm), "sitemap com <loc> absoluto");

console.log(fails.length ? `\n${fails.length} falha(s)` : "\nTudo OK");
process.exit(fails.length ? 1 : 0);
