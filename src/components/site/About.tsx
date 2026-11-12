import { alemao } from "@/assets/barbearia";

import { Reveal, SectionHead } from "./ui";

export function About() {
  return (
    <section id="sobre" className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[1fr_1fr] md:items-center md:gap-10 md:py-28 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
        <Reveal>
          {/* Reenquadramento por CSS (zoom 1,35): o arquivo original não é alterado */}
          <div className="aspect-[4/5] w-full overflow-hidden">
            <img
              src={alemao.src}
              width={alemao.width}
              height={alemao.height}
              alt="O Alemão na Barbearia do Alemão, olhando para a câmera e fazendo o gesto de rock com a mão"
              loading="lazy"
              decoding="async"
              className="photo h-full w-full origin-[34%_24%] scale-[1.35] object-cover object-[50%_20%]"
            />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <SectionHead eyebrow="Sobre" title="O Alemão" />
          <div className="mt-8 max-w-lg space-y-5 text-muted-foreground">
            <p>
              Desde 2015, o Alemão atende clientes em Sorocaba com atenção aos detalhes, respeito ao
              horário e foco em um atendimento tranquilo e de qualidade.
            </p>
            <p>
              Ao longo dos anos, esse cuidado ajudou a construir uma avaliação 5,0 estrelas no
              Google.
            </p>
          </div>
          <p className="mt-8 max-w-md border-t border-border pt-5 text-[0.9375rem] leading-relaxed text-foreground/80">
            Um ambiente onde o cliente se sente à vontade para voltar sempre.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
