import {
  ambiente,
  barbaAntes,
  barbaDepois,
  cacheadoAntes,
  cacheadoDepois,
  corteAntes,
  corteDepois,
  interior,
  pompadourAntes,
  pompadourDepois,
} from "@/assets/barbearia";

import { Reveal, SectionHead } from "./ui";

type Img = { src: string; width: number; height: number };

const resultados: { titulo: string; desc: string; antes: Img; depois: Img }[] = [
  {
    titulo: "Corte + barba",
    desc: "Corte com degradê e barba alinhada.",
    antes: corteAntes,
    depois: corteDepois,
  },
  {
    titulo: "Aparo de barba",
    desc: "Barba modelada e cabelo contornado.",
    antes: barbaAntes,
    depois: barbaDepois,
  },
  {
    titulo: "Pompadour + barba",
    desc: "Cabelo modelado com fade e barba desenhada nos detalhes.",
    antes: pompadourAntes,
    depois: pompadourDepois,
  },
  {
    titulo: "Fade cacheado",
    desc: "Redução de volume com fade e barba alinhada.",
    antes: cacheadoAntes,
    depois: cacheadoDepois,
  },
];

function Photo({ img, alt }: { img: Img; alt: string }) {
  return (
    <img
      src={img.src}
      width={img.width}
      height={img.height}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="photo aspect-[4/5] w-full object-cover object-[50%_25%]"
    />
  );
}

export function Results() {
  return (
    <section id="resultados" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
          <SectionHead n="02" eyebrow="Resultados" title="O trabalho, antes e depois.">
            Clientes atendidos na barbearia.
          </SectionHead>
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-2">
          {resultados.map((r, i) => (
            <Reveal key={r.titulo} delay={(i % 2) * 80}>
              <figure>
                <div className="grid grid-cols-2 gap-1.5">
                  <div>
                    <Photo img={r.antes} alt={`${r.titulo} — antes`} />
                    <p className="label mt-3 text-muted-foreground">Antes</p>
                  </div>
                  <div>
                    <Photo img={r.depois} alt={`${r.titulo} — depois`} />
                    <p className="label mt-3 text-brand">Depois</p>
                  </div>
                </div>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <h3 className="text-2xl">{r.titulo}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24" delay={40}>
          <h3 className="label text-muted-foreground">O ambiente</h3>
          <div className="mt-6 grid gap-1.5 sm:grid-cols-2">
            <img
              src={interior.src}
              width={interior.width}
              height={interior.height}
              alt="Ambiente interno da Barbearia do Alemão, com a cadeira e o mural da caveira"
              loading="lazy"
              decoding="async"
              className="photo aspect-[4/3] w-full object-cover"
            />
            <img
              src={ambiente.src}
              width={ambiente.width}
              height={ambiente.height}
              alt="Parede com quadros, pôsteres e decoração rock da barbearia"
              loading="lazy"
              decoding="async"
              className="photo aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
