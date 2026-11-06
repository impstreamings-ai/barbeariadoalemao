import { useEffect, useState } from "react";

import { horarios } from "@/lib/site";

import { CtaWhatsApp, Reveal, SectionHead } from "./ui";

/** Dia da semana (0 = domingo) em Sorocaba, independente do fuso do visitante. */
function hojeEmSorocaba() {
  const nome = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date());
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(nome);
}

export function Hours() {
  // Calculado só no cliente para não causar divergência de hidratação.
  const [hoje, setHoje] = useState(-1);
  useEffect(() => setHoje(hojeEmSorocaba()), []);

  const ordem = [2, 3, 4, 5, 6, 0, 1]; // terça → segunda
  return (
    <section id="horarios" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-3xl px-5 py-20 md:py-28">
        <Reveal>
          <SectionHead n="05" eyebrow="Horários" title="Quando atendemos">
            Terça a sábado. Domingo e segunda a barbearia fica fechada.
          </SectionHead>
        </Reveal>

        <Reveal className="mt-12" delay={80}>
          <ul className="border-t border-border">
            {ordem.map((i) => {
              const d = horarios[i];
              const isHoje = hoje === i;
              return (
                <li
                  key={d.dia}
                  aria-current={isHoje ? "date" : undefined}
                  className={`flex min-h-14 items-center justify-between gap-4 border-b border-border px-1 py-3 ${
                    d.horas ? "" : "text-muted-foreground"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg">{d.dia}</span>
                    {isHoje && <span className="label text-brand">Hoje</span>}
                  </span>
                  <span className="tabular-nums">
                    {d.horas ? `${d.horas[0]} às ${d.horas[1]}` : "Fechado"}
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <div className="mt-10">
          <CtaWhatsApp message="Olá! Vim pelo site da Barbearia do Alemão e gostaria de combinar um horário." />
        </div>
      </div>
    </section>
  );
}
