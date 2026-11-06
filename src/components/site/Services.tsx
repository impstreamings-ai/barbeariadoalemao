import { servicos } from "@/lib/site";

import { CtaWhatsApp, Reveal, SectionHead } from "./ui";

export function Services() {
  return (
    <section id="servicos" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-3xl px-5 py-20 md:py-28">
        <Reveal>
          <SectionHead n="03" eyebrow="Serviços e valores" title="O que você pode agendar">
            Atendimento completo de cabelo e barba, feito com calma e capricho.
          </SectionHead>
        </Reveal>

        <Reveal className="mt-12" delay={80}>
          <ul className="border-t border-border">
            {servicos.map((s) => (
              <li key={s.nome} className="border-b border-border py-6">
                <div className="flex items-baseline gap-4">
                  <h3 className="text-2xl sm:text-3xl">{s.nome}</h3>
                  <span
                    aria-hidden="true"
                    className="min-w-6 flex-1 translate-y-[-0.3em] border-b border-dotted border-foreground/25"
                  />
                  <span className="font-display text-2xl tabular-nums text-foreground sm:text-3xl">
                    {s.preco}
                  </span>
                </div>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">{s.desc}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted-foreground">
            Valores de referência — confirme pelo WhatsApp ao agendar.
          </p>
        </Reveal>

        <div className="mt-10">
          <CtaWhatsApp message="Olá! Vim pelo site da Barbearia do Alemão e gostaria de agendar um horário para corte e barba." />
        </div>
      </div>
    </section>
  );
}
