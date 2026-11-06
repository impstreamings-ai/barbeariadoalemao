import { alemao } from "@/assets/barbearia";

import { Reveal, SectionHead } from "./ui";

export function About() {
  return (
    <section id="sobre" className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[0.8fr_1fr] md:items-center md:gap-20 md:py-28">
        <Reveal>
          <img
            src={alemao.src}
            width={alemao.width}
            height={alemao.height}
            alt="O Alemão, barbeiro e dono da Barbearia do Alemão"
            loading="lazy"
            decoding="async"
            className="photo aspect-[4/5] w-full object-cover object-[50%_20%]"
          />
        </Reveal>
        <Reveal delay={100}>
          <SectionHead n="01" eyebrow="Sobre" title="O Alemão" />
          <div className="mt-8 max-w-lg space-y-5 text-base text-muted-foreground">
            <p>
              Desde 2015, o Alemão atende clientes em Sorocaba com atenção aos detalhes, respeito ao
              horário e foco em um atendimento tranquilo e de qualidade.
            </p>
            <p>
              Ao longo dos anos, esse cuidado ajudou a construir uma avaliação 5,0 estrelas no
              Google e a confiança de centenas de clientes.
            </p>
          </div>
          <p className="font-display mt-10 max-w-md border-l border-brand/60 pl-5 text-2xl italic leading-snug text-foreground">
            Atendimento sem pressa, capricho em cada corte e um ambiente onde o cliente se sente à
            vontade pra voltar sempre.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
