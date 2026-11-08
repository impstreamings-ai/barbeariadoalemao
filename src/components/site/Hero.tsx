import { hero } from "@/assets/barbearia";
import { RATING } from "@/lib/site";

import { CtaLink, CtaWhatsApp } from "./ui";

export function Hero() {
  return (
    <section id="topo" className="relative isolate overflow-hidden">
      <div className="mx-auto split:grid split:max-w-6xl split:grid-cols-[1.05fr_0.95fr] split:items-center split:gap-14 split:px-5 split:py-16">
        {/* Foto: full-bleed até 1023px (celular e tablet em pé), retrato emoldurado a partir de 1024px */}
        <div className="absolute inset-0 -z-10 split:relative split:inset-auto split:z-0 split:order-2">
          <img
            src={hero.src}
            width={hero.width}
            height={hero.height}
            alt="O Alemão cortando o cabelo de um cliente, diante do mural da Caveira Gentleman"
            fetchPriority="high"
            decoding="async"
            className="photo absolute left-0 top-[-8rem] h-[calc(100%+8rem)] max-[380px]:top-[-7.25rem] max-[380px]:h-[calc(100%+7.25rem)] w-full object-cover object-[32%_0%] split:static split:aspect-[4/5] split:h-auto split:object-[50%_28%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background from-15% via-background/60 via-45% to-background/10 split:hidden" />
        </div>

        {/* Abaixo de 1024px (ou em telas em pé): reserva 13rem de foto livre acima do texto e puxa a imagem 8rem para cima (rostos visíveis) e o bloco de
            texto repousa sobre fundo sólido, com um degradê curto que dissolve a foto até ele. */}
        <div className="flex min-h-[calc(100svh-4rem)] flex-col justify-end pt-[13rem] split:min-h-0 split:justify-center split:pt-0">
          <div className="relative bg-background px-5 pb-10 pt-1 max-[380px]:pb-8 before:pointer-events-none before:absolute before:inset-x-0 before:-top-20 before:h-20 before:bg-gradient-to-b before:from-transparent before:to-background split:bg-transparent split:p-0 split:py-12 split:before:hidden">
            <div className="copy-box max-w-xl split:max-w-none">
              <p className="label flex items-center gap-3 text-brand">
                <span aria-hidden="true" className="h-px w-7 bg-brand" />
                Sorocaba · Desde 2015
              </p>
              <h1 className="t-display mt-5 max-[380px]:mt-4">
                Corte no capricho.
                <br />
                Barba alinhada.
                <span className="t-display-sub">Atendimento sem pressa.</span>
              </h1>
              <p className="mt-6 max-w-md text-foreground/85 max-[380px]:mt-5 sm:text-lg split:text-[1.0625rem]">
                Barbearia no Júlio de Mesquita Filho para quem valoriza atendimento tranquilo,
                atenção aos detalhes e resultado bem feito.
              </p>

              <div className="mt-8 flex flex-col gap-3 max-[380px]:mt-6 sm:flex-row split:max-[1023px]:flex-wrap">
                <CtaWhatsApp className="split:max-[1023px]:whitespace-nowrap split:max-[1023px]:px-5 split:max-[1023px]:tracking-[0.06em]! split:max-[899px]:px-3 split:max-[899px]:text-[0.75rem]! split:max-[899px]:tracking-[0.04em]!" />
                <CtaLink
                  href="#resultados"
                  className="split:max-[1023px]:whitespace-nowrap split:max-[1023px]:px-5 split:max-[1023px]:tracking-[0.06em]! split:max-[899px]:px-3 split:max-[899px]:text-[0.75rem]! split:max-[899px]:tracking-[0.04em]!"
                >
                  Ver resultados
                </CtaLink>
              </div>

              <p className="label mt-8 flex flex-wrap max-[380px]:mt-6 items-center gap-x-3 gap-y-1 text-muted-foreground">
                <span className="text-foreground">★ {RATING.valor} no Google</span>
                <span aria-hidden="true">·</span>
                <span>{RATING.total} avaliações</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
