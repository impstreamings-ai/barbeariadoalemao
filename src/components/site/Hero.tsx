import { hero } from "@/assets/barbearia";
import { RATING } from "@/lib/site";

import { CtaLink, CtaWhatsApp } from "./ui";

export function Hero() {
  return (
    <section id="topo" className="relative isolate overflow-hidden">
      <div className="mx-auto md:grid md:max-w-6xl md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-14 md:px-5 md:py-16">
        {/* Foto: full-bleed no celular, retrato emoldurado no desktop */}
        <div className="absolute inset-0 -z-10 md:relative md:inset-auto md:z-0 md:order-2">
          <img
            src={hero.src}
            width={hero.width}
            height={hero.height}
            alt="O Alemão cortando o cabelo de um cliente, diante do mural da Caveira Gentleman"
            fetchPriority="high"
            decoding="async"
            className="photo h-full w-full object-cover object-[50%_28%] md:aspect-[4/5] md:h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background from-15% via-background/70 via-45% to-background/10 md:hidden" />
        </div>

        <div className="flex min-h-[calc(100svh-4rem)] flex-col justify-end px-5 pb-10 pt-32 md:min-h-0 md:justify-center md:px-0 md:py-12">
          <p className="label text-brand">Sorocaba/SP · Desde 2015</p>
          <h1 className="mt-5 text-[2.9rem] leading-[0.98] sm:text-6xl lg:text-7xl">
            Corte no capricho.
            <br />
            Barba alinhada.
            <br />
            <em className="font-medium text-foreground/80">Atendimento sem pressa.</em>
          </h1>
          <p className="mt-6 max-w-md text-base text-foreground/85">
            Barbearia no Júlio de Mesquita Filho para quem valoriza atendimento tranquilo, atenção
            aos detalhes e resultado bem feito.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaWhatsApp />
            <CtaLink href="#resultados">Ver resultados</CtaLink>
          </div>

          <p className="label mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
            <span className="text-foreground">★ {RATING.valor} no Google</span>
            <span aria-hidden="true">·</span>
            <span>{RATING.total} avaliações</span>
          </p>
        </div>
      </div>
    </section>
  );
}
