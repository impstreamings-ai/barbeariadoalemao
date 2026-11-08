import { servicos } from "@/lib/site";

import { CtaWhatsApp, Reveal, SectionHead } from "./ui";

export function Services() {
  return (
    <section id="servicos" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
          <SectionHead eyebrow="Serviços e valores" title="O que você pode agendar">
            Atendimento completo de cabelo e barba, feito com calma e capricho.
          </SectionHead>
        </Reveal>

        <Reveal className="mt-12 max-w-3xl" delay={80}>
          <ul className="border-t border-border">
            {servicos.map((s) => (
              <li key={s.nome} className="border-b border-border py-6">
                <div className="flex items-baseline gap-4">
                  <h3 className="t-service text-2xl sm:text-[1.75rem]">{s.nome}</h3>
                  <span
                    aria-hidden="true"
                    className="h-0.5 min-w-6 flex-1 translate-y-[-0.3em] bg-[linear-gradient(to_right,color-mix(in_oklab,var(--color-foreground)_45%,transparent)_2px,transparent_2px)] bg-[length:8px_2px] bg-repeat-round"
                  />
                  <span className="t-price text-2xl text-foreground sm:text-[1.75rem]">
                    {s.preco}
                  </span>
                </div>
                <p className="mt-2 max-w-md text-[0.9375rem] text-muted-foreground">{s.desc}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-10">
          <CtaWhatsApp />
        </div>
      </div>
    </section>
  );
}
