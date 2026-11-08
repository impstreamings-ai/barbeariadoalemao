import {
  ambiente,
  barbaAntes as r2Antes,
  barbaDepois as r2Depois,
  cacheadoAntes as r4Antes,
  cacheadoDepois as r4Depois,
  corteAntes as r1Antes,
  corteDepois as r1Depois,
  interior,
  pompadourAntes as r3Antes,
  pompadourDepois as r3Depois,
} from "@/assets/barbearia";

import { CtaWhatsApp, Reveal } from "./ui";

type Img = { src: string; width: number; height: number };

/**
 * Recorte 4/5 individual por foto, feito só por CSS (os arquivos originais não são alterados).
 * cx/cy = centro do recorte (fração da imagem); bh = altura do recorte (fração da altura da imagem).
 * Cada foto é enquadrada em separado (cabeça e barba inteiras, com respiro): as diferenças reais de
 * ângulo, distância, fundo e luz entre antes e depois continuam visíveis.
 */
type Crop = { cx: number; cy: number; bh: number };

const resultados: { antes: Img; depois: Img; cropAntes: Crop; cropDepois: Crop }[] = [
  {
    antes: r1Antes,
    depois: r1Depois,
    cropAntes: { cx: 0.4, cy: 0.5, bh: 1 },
    cropDepois: { cx: 0.46, cy: 0.385, bh: 0.82 },
  },
  {
    antes: r2Antes,
    depois: r2Depois,
    cropAntes: { cx: 0.5, cy: 0.5, bh: 1 },
    cropDepois: { cx: 0.6, cy: 0.345, bh: 0.78 },
  },
  {
    antes: r3Antes,
    depois: r3Depois,
    cropAntes: { cx: 0.45, cy: 0.5, bh: 1 },
    cropDepois: { cx: 0.48, cy: 0.5, bh: 1 },
  },
  {
    antes: r4Antes,
    depois: r4Depois,
    cropAntes: { cx: 0.42, cy: 0.5, bh: 1 },
    cropDepois: { cx: 0.52, cy: 0.416, bh: 0.9 },
  },
];

function Photo({ img, crop, alt }: { img: Img; crop: Crop; alt: string }) {
  const { cx, cy, bh } = crop;
  const bw = (0.8 * bh * img.height) / img.width; // largura do recorte 4/5, em fração da imagem
  const x0 = Math.min(Math.max(cx - bw / 2, 0), 1 - bw);
  const y0 = Math.min(Math.max(cy - bh / 2, 0), 1 - bh);
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden">
      <img
        src={img.src}
        width={img.width}
        height={img.height}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="photo absolute max-w-none"
        style={{
          width: `${100 / bw}%`,
          left: `${-(x0 / bw) * 100}%`,
          top: `${-(y0 / bh) * 100}%`,
        }}
      />
    </div>
  );
}

export function Results() {
  return (
    <section id="resultados" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
          <header className="max-w-2xl">
            <h2 className="t-title">Antes e depois</h2>
          </header>
        </Reveal>

        {/* Galeria limpa: só fotografias, sem legendas, rótulos ou numeração. Em cada dupla, a foto da
            esquerda é o antes e a da direita é o depois. Abaixo de 768px: uma dupla por linha, com no
            máximo 600px. A partir de 768px: duas duplas por linha. */}
        <div className="mt-14 grid gap-8 min-[768px]:grid-cols-2">
          {resultados.map((r, i) => {
            const n = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={n} delay={(i % 2) * 80}>
                <figure className="grid max-w-[600px] grid-cols-2 gap-1.5 min-[768px]:max-w-none">
                  <Photo img={r.antes} crop={r.cropAntes} alt="Foto do antes" />
                  <Photo img={r.depois} crop={r.cropDepois} alt="Foto do depois" />
                </figure>
              </Reveal>
            );
          })}
        </div>

        {/* Galeria separada dos resultados */}
        <Reveal className="mt-24 border-t border-border pt-14" delay={40}>
          <p className="label text-muted-foreground">Galeria</p>
          <h3 className="mt-4 text-3xl sm:text-4xl">O ambiente</h3>
          <div className="mt-8 grid gap-1.5 sm:grid-cols-2">
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

        <div className="mt-14">
          <CtaWhatsApp variant="outline" />
        </div>
      </div>
    </section>
  );
}
