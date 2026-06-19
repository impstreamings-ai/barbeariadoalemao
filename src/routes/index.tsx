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
      { title: "Barbearia do Alemão — Corte e Barba bem feitos · Desde 2015" },
      {
        name: "description",
        content:
          "Barbearia do Alemão: corte masculino, barba na navalha e atendimento no capricho desde 2015. Agende seu horário com o Alemão.",
      },
      { property: "og:title", content: "Barbearia do Alemão — Corte e Barba" },
      {
        property: "og:description",
        content:
          "Corte masculino, barba na navalha e atendimento no capricho desde 2015. Agende seu horário.",
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
  { href: "#identidade", label: "Identidade" },
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#horarios", label: "Horários" },
];

const servicos = [
  {
    nome: "Corte na Tesoura & Máquina",
    desc: "Do clássico ao degradê. Feito no capricho, do jeito raiz.",
    preco: "R$ 35",
  },
  {
    nome: "Barba Completa",
    desc: "Toalha quente, navalha e contorno. Barba de gentleman.",
    preco: "R$ 30",
  },
  {
    nome: "Corte + Barba",
    desc: "O combo da casa. Você senta cliente, levanta lenda.",
    preco: "R$ 60",
  },
  {
    nome: "Pezinho & Acabamento",
    desc: "Aquela manutenção rápida pra manter a linha.",
    preco: "R$ 15",
  },
  {
    nome: "Corte Infantil",
    desc: "A próxima geração também é raiz. Paciência inclusa.",
    preco: "R$ 30",
  },
  {
    nome: "Hidratação & Tratamento",
    desc: "Cabelo e barba na régua, macios e domados.",
    preco: "R$ 25",
  },
];

const trabalhos = [
  {
    antes: corteAntes,
    depois: corteDepois,
    titulo: "Corte + Barba",
    desc: "Cabelo volumoso na régua com degradê e barba alinhada na navalha.",
  },
  {
    antes: grisalhoAntes,
    depois: grisalhoDepois,
    titulo: "Aparo de Barba Grisalha",
    desc: "Barba longa modelada e cabelo contornado, mantendo a personalidade.",
  },
];

const identidade = [
  { titulo: "Atendimento no capricho", desc: "Sem pressa. Cada corte sai do jeito que você pediu." },
  { titulo: "Barba na navalha", desc: "Toalha quente, contorno e acabamento de barbeiro raiz." },
  { titulo: "Ambiente descontraído", desc: "Música boa, papo reto e aquele clima de barbearia de bairro." },
  { titulo: "Desde 2015", desc: "Clientela fiel que volta toda semana pra manter a linha." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Sobre />
        <Identidade />
        <Trabalhos />
        <Servicos />
        <Horarios />
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
        <img src={heroSkull.url} alt="Mural da Caveira Gentleman na Barbearia do Alemão" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 to-transparent" />
      </div>
      <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28">
        <p className="font-condensed text-sm font-medium uppercase tracking-[0.3em] text-primary">
          Barba, Cabelo e Amigos · Desde 2015
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl uppercase leading-[0.92] sm:text-7xl md:text-8xl">
          Barbearia <span className="text-stroke">raiz.</span>
          <br />Alma rock'n roll.
        </h1>
        <p className="mt-6 max-w-xl font-body text-base text-muted-foreground sm:text-lg">
          Aqui não tem fórmula de salão. Tem caveira de cartola na parede,
          navalha afiada e aquele papo de quem entende de barba. Senta na cadeira
          e faz parte.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#cta"
            className="font-condensed text-sm font-semibold uppercase tracking-[0.16em] bg-primary px-7 py-3.5 text-primary-foreground transition-opacity hover:opacity-90"
          >
            Agendar Horário
          </a>
          <a
            href="#servicos"
            className="font-condensed text-sm font-semibold uppercase tracking-[0.16em] border border-border px-7 py-3.5 text-foreground transition-colors hover:border-foreground"
          >
            Ver Serviços
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
            src={alemaoNow.url}
            alt="O Alemão, barbeiro fundador da Barbearia do Alemão"
            className="aspect-[4/5] w-full rounded-sm object-cover grayscale"
          />
          <span className="absolute -bottom-4 left-4 bg-primary px-4 py-2 font-condensed text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground">
            O Alemão
          </span>
        </div>
        <div>
          <p className="font-condensed text-sm font-medium uppercase tracking-[0.28em] text-primary">
            Sobre o Alemão
          </p>
          <h2 className="mt-3 text-4xl uppercase leading-tight sm:text-5xl">
            O cara por trás da caveira
          </h2>
          <p className="mt-6 font-body text-muted-foreground">
            Desde 2015 o Alemão segura a navalha como quem segura uma tradição.
            Barba grande, óculos de armação e nenhuma pressa quando o assunto é
            fazer bem feito. Não é só cortar cabelo — é receber amigo, trocar ideia
            e mandar embora todo mundo de cabeça erguida.
          </p>
          <p className="mt-4 font-body text-muted-foreground">
            A barbearia nasceu da paixão por rock, carro antigo e pelo ofício de
            barbeiro raiz. Aqui cada cliente vira história na parede.
          </p>
          <div className="mt-8 flex gap-10">
            <div>
              <p className="font-display text-4xl text-primary">10+</p>
              <p className="font-condensed text-xs uppercase tracking-[0.18em] text-muted-foreground">Anos de estrada</p>
            </div>
            <div>
              <p className="font-display text-4xl text-primary">100%</p>
              <p className="font-condensed text-xs uppercase tracking-[0.18em] text-muted-foreground">Atitude raiz</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Identidade() {
  return (
    <section id="identidade" className="relative overflow-hidden border-t border-border">
      <div className="absolute inset-0">
        <img src={rockWall.url} alt="Parede rock'n roll da barbearia com pôsteres e garrafas" className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-background/70" />
      </div>
      <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
        <p className="font-condensed text-sm font-medium uppercase tracking-[0.28em] text-primary">
          A identidade da barbearia
        </p>
        <h2 className="mt-3 max-w-2xl text-4xl uppercase leading-tight sm:text-5xl">
          Não é uma barbearia qualquer
        </h2>
        <p className="mt-5 max-w-xl font-body text-muted-foreground">
          É um templo do rock e do old school. Cada parede conta uma história, e
          a Caveira Gentleman é o símbolo de quem entra aqui.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {identidade.map((i) => (
            <div key={i.titulo} className="border border-border bg-card/80 p-6 backdrop-blur">
              <h3 className="text-xl uppercase">{i.titulo}</h3>
              <p className="mt-3 font-body text-sm text-muted-foreground">{i.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="group relative overflow-hidden border border-border">
            <img src={alemaoWorking.url} alt="Alemão cortando cabelo de uma criança em frente ao mural da caveira" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute bottom-4 left-4 bg-background/80 px-3 py-1.5 font-condensed text-xs uppercase tracking-[0.16em]">Mão na massa</span>
          </div>
          <div className="group relative overflow-hidden border border-border">
            <img src={tattoo.url} alt="Tatuagem caveira gentleman, símbolo da barbearia" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute bottom-4 left-4 bg-background/80 px-3 py-1.5 font-condensed text-xs uppercase tracking-[0.16em]">Personalidade na pele</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Trabalhos() {
  return (
    <section id="trabalhos" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-condensed text-sm font-medium uppercase tracking-[0.28em] text-primary">
              Trabalhos reais
            </p>
            <h2 className="mt-3 text-4xl uppercase leading-tight sm:text-5xl">
              Resultado de cadeira
            </h2>
          </div>
          <p className="max-w-sm font-body text-sm text-muted-foreground">
            Sem foto de banco de imagem. Tudo aqui é cliente de verdade, saído da
            cadeira do Alemão.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trabalhos.map((t) => (
            <figure key={t.label} className="group relative overflow-hidden border border-border">
              <img src={t.img.url} alt={t.label} className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-4 font-condensed text-xs uppercase tracking-[0.14em] text-foreground">
                {t.label}
              </figcaption>
            </figure>
          ))}
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
          O cardápio da casa
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {servicos.map((s) => (
            <div key={s.nome} className="bg-card p-7">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl uppercase leading-tight">{s.nome}</h3>
                <span className="shrink-0 font-display text-2xl text-primary">{s.preco}</span>
              </div>
              <p className="mt-3 font-body text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 font-body text-xs text-muted-foreground">
          * Valores de referência. Combos e tratamentos podem variar conforme o serviço.
        </p>
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
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="font-condensed text-sm font-medium uppercase tracking-[0.28em] text-primary">
            Horários
          </p>
          <h2 className="mt-3 text-4xl uppercase leading-tight sm:text-5xl">
            Quando a navalha tá afiada
          </h2>
          <p className="mt-6 font-body text-muted-foreground">
            Chega chegando, mas se quiser garantir o seu horário sem espera, é só
            agendar. A casa é raiz, mas o atendimento é organizado.
          </p>
          <a
            href="#cta"
            className="mt-8 inline-block font-condensed text-sm font-semibold uppercase tracking-[0.16em] bg-primary px-7 py-3.5 text-primary-foreground transition-opacity hover:opacity-90"
          >
            Agendar agora
          </a>
        </div>
        <div className="divide-y divide-border border border-border">
          {dias.map((d) => (
            <div key={d.d} className="flex items-center justify-between px-6 py-5">
              <span className="font-condensed text-sm uppercase tracking-[0.14em] text-foreground">{d.d}</span>
              <span className="font-condensed text-sm uppercase tracking-[0.14em] text-muted-foreground">{d.h}</span>
            </div>
          ))}
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
          Bora deixar a cara<br />no jeito?
        </h2>
        <p className="mx-auto mt-6 max-w-lg font-body text-muted-foreground">
          Senta na cadeira do Alemão e descobre por que desde 2015 a galera não
          troca a barbearia por nada.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noreferrer"
            className="font-condensed text-sm font-semibold uppercase tracking-[0.16em] bg-primary px-8 py-4 text-primary-foreground transition-opacity hover:opacity-90"
          >
            Chamar no WhatsApp
          </a>
          <a
            href="#servicos"
            className="font-condensed text-sm font-semibold uppercase tracking-[0.16em] border border-border px-8 py-4 text-foreground transition-colors hover:border-foreground"
          >
            Ver serviços
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
            <p className="font-body text-xs text-muted-foreground">Barba, Cabelo e Amigos · Desde 2015</p>
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
        © {new Date().getFullYear()} Barbearia do Alemão. Feito com navalha e rock'n roll.
      </div>
    </footer>
  );
}
