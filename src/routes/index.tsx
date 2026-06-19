import { createFileRoute } from "@tanstack/react-router";

import logo from "@/assets/barbearia/a2.png.asset.json";
import interior from "@/assets/barbearia/a1.png.asset.json";
import rockWall from "@/assets/barbearia/a14.png.asset.json";
import owner from "@/assets/barbearia/a12.png.asset.json";
import ownerWorking from "@/assets/barbearia/a11.png.asset.json";
import tattoo from "@/assets/barbearia/a13.png.asset.json";
import grisalhoAntes from "@/assets/barbearia/a5.png.asset.json";
import grisalhoDepois from "@/assets/barbearia/a6.png.asset.json";
import corteAntes from "@/assets/barbearia/a3.png.asset.json";
import corteDepois from "@/assets/barbearia/a4.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Barbearia do Alemão — Corte e Barba" },
      {
        name: "description",
        content:
          "Barbearia do Alemão: corte masculino, barba e acabamento. Agende seu horário pelo WhatsApp.",
      },
      { property: "og:title", content: "Barbearia do Alemão — Corte e Barba" },
      {
        property: "og:description",
        content:
          "Corte masculino, barba e acabamento. Agende seu horário pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: ownerWorking.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: ownerWorking.url },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const nav = [
  { href: "#sobre", label: "O Alemão" },
  { href: "#galeria", label: "Galeria" },
  { href: "#servicos", label: "Serviços" },
  { href: "#horarios", label: "Horários" },
];

const servicos = [
  { nome: "Corte Masculino", desc: "Corte na tesoura ou máquina, do clássico ao degradê." },
  { nome: "Barba", desc: "Toalha quente, navalha e contorno bem feito." },
  { nome: "Corte + Barba", desc: "Corte e barba no mesmo atendimento." },
  { nome: "Acabamento", desc: "Manutenção rápida do corte e contorno." },
  { nome: "Corte Infantil", desc: "Atendimento com paciência para as crianças." },
];

const resultados = [
  {
    antes: corteAntes,
    depois: corteDepois,
    titulo: "Corte + Barba",
    desc: "Corte com degradê e barba alinhada.",
  },
  {
    antes: grisalhoAntes,
    depois: grisalhoDepois,
    titulo: "Aparo de barba",
    desc: "Barba modelada e cabelo contornado.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Galeria />
        <Servicos />
        <Horarios />
        <Tatuagem />
        <CtaFinal />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#topo" className="flex items-center gap-3">
          <img src={logo.url} alt="Logo Barbearia do Alemão" className="h-11 w-11 rounded-full object-cover" />
          <span className="font-condensed text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
            Barbearia do Alemão
          </span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="font-condensed text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#cta"
          className="font-condensed text-xs font-semibold uppercase tracking-[0.16em] border border-primary bg-primary px-4 py-2 text-primary-foreground transition-opacity hover:opacity-90"
        >
          Agendar
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={interior.url} alt="Interior da Barbearia do Alemão" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 to-transparent" />
      </div>
      <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28">
        <p className="font-condensed text-sm font-medium uppercase tracking-[0.3em] text-primary">
          Barbearia do Alemão
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl uppercase leading-[0.92] sm:text-7xl md:text-8xl">
          Corte e barba <span className="text-stroke">bem feitos.</span>
        </h1>
        <p className="mt-6 max-w-xl font-body text-base text-muted-foreground sm:text-lg">
          Corte masculino, barba e acabamento com atendimento tranquilo e atenção
          aos detalhes. Agende seu horário pelo WhatsApp.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noreferrer"
            className="font-condensed text-sm font-semibold uppercase tracking-[0.16em] bg-primary px-7 py-3.5 text-primary-foreground transition-opacity hover:opacity-90"
          >
            Agendar no WhatsApp
          </a>
          <a
            href="#galeria"
            className="font-condensed text-sm font-semibold uppercase tracking-[0.16em] border border-border px-7 py-3.5 text-foreground transition-colors hover:border-foreground"
          >
            Ver galeria
          </a>
        </div>
      </div>
    </section>
  );
}

function Sobre() {
  return (
    <section id="sobre" className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
        <div className="relative">
          <img
            src={owner.url}
            alt="O Alemão, barbeiro da Barbearia do Alemão"
            className="aspect-[4/5] w-full rounded-sm object-cover"
          />
          <span className="absolute -bottom-4 left-4 bg-primary px-4 py-2 font-condensed text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground">
            O Alemão
          </span>
        </div>
        <div>
          <p className="font-condensed text-sm font-medium uppercase tracking-[0.28em] text-primary">
            Sobre
          </p>
          <h2 className="mt-3 text-4xl uppercase leading-tight sm:text-5xl">
            O Alemão
          </h2>
          <p className="mt-6 font-body text-muted-foreground">
            Alemão é o rosto por trás da barbearia. Conhecido pelo atendimento
            tranquilo, pela atenção aos detalhes e pela conversa boa durante o
            corte.
          </p>
          <p className="mt-4 font-body text-muted-foreground">
            Quem entra pela primeira vez entende rápido por que tantos clientes
            voltam.
          </p>
        </div>
      </div>
    </section>
  );
}

function Galeria() {
  return (
    <section id="galeria" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <p className="font-condensed text-sm font-medium uppercase tracking-[0.28em] text-primary">
          Galeria
        </p>
        <h2 className="mt-3 text-4xl uppercase leading-tight sm:text-5xl">
          A barbearia por dentro
        </h2>

        <div className="mt-14">
          <h3 className="font-condensed text-lg font-semibold uppercase tracking-[0.18em]">
            Ambiente
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden border border-border">
              <img src={interior.url} alt="Ambiente da Barbearia do Alemão" className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className="overflow-hidden border border-border">
              <img src={rockWall.url} alt="Parede decorada da barbearia" className="aspect-[4/3] w-full object-cover" />
            </div>
          </div>
        </div>

        <div className="mt-14">
          <h3 className="font-condensed text-lg font-semibold uppercase tracking-[0.18em]">
            Trabalho
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden border border-border">
              <img src={ownerWorking.url} alt="Alemão cortando cabelo" className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className="overflow-hidden border border-border">
              <img src={owner.url} alt="Alemão na barbearia" className="aspect-[4/3] w-full object-cover" />
            </div>
          </div>
        </div>

        <div className="mt-14">
          <h3 className="font-condensed text-lg font-semibold uppercase tracking-[0.18em]">
            Resultados
          </h3>
          <div className="mt-5 grid gap-8 md:grid-cols-2">
            {resultados.map((t) => (
              <figure key={t.titulo} className="border border-border bg-card p-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative overflow-hidden">
                    <img src={t.antes.url} alt={`${t.titulo} — antes`} className="aspect-[4/5] w-full object-cover" />
                    <span className="absolute left-2 top-2 bg-background/85 px-2.5 py-1 font-condensed text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">Antes</span>
                  </div>
                  <div className="relative overflow-hidden">
                    <img src={t.depois.url} alt={`${t.titulo} — depois`} className="aspect-[4/5] w-full object-cover" />
                    <span className="absolute left-2 top-2 bg-primary px-2.5 py-1 font-condensed text-[0.65rem] uppercase tracking-[0.16em] text-primary-foreground">Depois</span>
                  </div>
                </div>
                <figcaption className="mt-4">
                  <h4 className="text-xl uppercase leading-tight">{t.titulo}</h4>
                  <p className="mt-2 font-body text-sm text-muted-foreground">{t.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Servicos() {
  return (
    <section id="servicos" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <p className="font-condensed text-sm font-medium uppercase tracking-[0.28em] text-primary">
          Serviços
        </p>
        <h2 className="mt-3 text-4xl uppercase leading-tight sm:text-5xl">
          Serviços
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {servicos.map((s) => (
            <div key={s.nome} className="bg-card p-7">
              <h3 className="text-xl uppercase leading-tight">{s.nome}</h3>
              <p className="mt-3 font-body text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Horarios() {
  const dias = [
    { d: "Terça a Sexta", h: "09h — 20h" },
    { d: "Sábado", h: "09h — 18h" },
    { d: "Domingo e Segunda", h: "Fechado" },
  ];
  return (
    <section id="horarios" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-3xl px-5 py-20 md:py-28">
        <p className="font-condensed text-sm font-medium uppercase tracking-[0.28em] text-primary">
          Horários de Atendimento
        </p>
        <div className="mt-8 overflow-hidden border border-border">
          <div className="grid grid-cols-2 bg-card px-6 py-4">
            <span className="font-condensed text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Dias</span>
            <span className="text-right font-condensed text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Horários</span>
          </div>
          <div className="divide-y divide-border">
            {dias.map((d) => (
              <div key={d.d} className="grid grid-cols-2 items-center px-6 py-5">
                <span className="font-condensed text-sm uppercase tracking-[0.14em] text-foreground">{d.d}</span>
                <span className="text-right font-condensed text-sm uppercase tracking-[0.14em] text-muted-foreground">{d.h}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Tatuagem() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto flex max-w-4xl items-center gap-6 px-5 py-12">
        <img src={tattoo.url} alt="Tatuagem do Alemão" className="h-24 w-24 shrink-0 rounded-sm object-cover" />
        <div>
          <h3 className="font-condensed text-sm font-semibold uppercase tracking-[0.18em]">Curiosidade</h3>
          <p className="mt-2 font-body text-sm text-muted-foreground">
            Uma tatuagem do Alemão — detalhe pessoal, não o logo da barbearia.
          </p>
        </div>
      </div>
    </section>
  );
}

function CtaFinal() {
  return (
    <section id="cta" className="relative overflow-hidden border-t border-border">
      <div className="absolute inset-0 grain opacity-60" />
      <div className="relative mx-auto max-w-4xl px-5 py-24 text-center md:py-32">
        <img src={logo.url} alt="Logo Barbearia do Alemão" className="mx-auto h-20 w-20 rounded-full object-cover" />
        <h2 className="mt-8 text-4xl uppercase leading-[0.95] sm:text-6xl">
          Agende seu horário
        </h2>
        <p className="mx-auto mt-6 max-w-lg font-body text-muted-foreground">
          Fale diretamente com a Barbearia do Alemão pelo WhatsApp.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noreferrer"
            className="font-condensed text-sm font-semibold uppercase tracking-[0.16em] bg-primary px-8 py-4 text-primary-foreground transition-opacity hover:opacity-90"
          >
            Agendar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-12 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-3">
          <img src={logo.url} alt="Logo Barbearia do Alemão" className="h-12 w-12 rounded-full object-cover" />
          <div>
            <p className="font-condensed text-sm font-semibold uppercase tracking-[0.18em]">Barbearia do Alemão</p>
            <p className="font-body text-xs text-muted-foreground">Corte · Barba · Acabamento</p>
          </div>
        </div>
        <nav className="flex flex-wrap justify-center gap-5">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="font-condensed text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground">
              {n.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="border-t border-border py-5 text-center font-body text-xs text-muted-foreground">
        © {new Date().getFullYear()} Barbearia do Alemão.
      </div>
    </footer>
  );
}
