import { avaliacoes, MAPS_SHORT_URL, RATING } from "@/lib/site";

import { CtaLink, Reveal, SectionHead } from "./ui";

export function Reviews() {
  const [destaque, ...demais] = avaliacoes;
  return (
    <section id="avaliacoes" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <SectionHead n="04" eyebrow="Avaliações" title="O que dizem os clientes" />
          </Reveal>
          <Reveal delay={80}>
            <p className="flex items-baseline gap-3">
              <span className="font-display text-6xl leading-none">{RATING.valor}</span>
              <span className="label leading-relaxed text-muted-foreground">
                <span className="block text-foreground" aria-label="5 de 5 estrelas">
                  ★★★★★
                </span>
                {RATING.total} avaliações no Google
              </span>
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14" delay={60}>
          <figure className="max-w-4xl">
            <blockquote className="font-display text-2xl italic leading-snug sm:text-4xl">
              “{destaque.texto}”
            </blockquote>
            <figcaption className="label mt-6 text-muted-foreground">
              {destaque.nome} · Google
            </figcaption>
          </figure>
        </Reveal>

        <Reveal
          className="mt-14 grid gap-10 border-t border-border pt-10 md:grid-cols-2"
          delay={100}
        >
          {demais.map((a) => (
            <figure key={a.nome}>
              <blockquote className="text-base leading-relaxed text-foreground/90">
                “{a.texto}”
              </blockquote>
              <figcaption className="label mt-4 text-muted-foreground">
                {a.nome} · Google
              </figcaption>
            </figure>
          ))}
        </Reveal>

        <div className="mt-12">
          <CtaLink href={MAPS_SHORT_URL} external>
            Ver mais avaliações no Google
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
