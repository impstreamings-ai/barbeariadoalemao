import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

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
  { href: "#localizacao", label: "Localização" },
];

const servicos = [
  { nome: "Corte Masculino", desc: "Corte realizado na tesoura ou máquina, do clássico ao degradê." },
  { nome: "Barba", desc: "Alinhamento, contorno e acabamento da barba." },
  { nome: "Corte + Barba", desc: "Atendimento completo para cabelo e barba na mesma sessão." },
  { nome: "Acabamento", desc: "Manutenção rápida para manter o corte alinhado." },
  { nome: "Corte Infantil", desc: "Atendimento pensado para crianças, com paciência e atenção." },
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

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

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
        <Localizacao />
        <CtaFinal />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

const WHATSAPP_URL =
  "https://wa.me/5515988030574?text=" +
  encodeURIComponent(
    "Olá! Vim pelo site da Barbearia do Alemão e gostaria de agendar um horário.",
  );

function FloatingWhatsApp() {
  const [firstVisit, setFirstVisit] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("ba_wpp_seen")) {
        setFirstVisit(true);
        localStorage.setItem("ba_wpp_seen", "1");
      }
    } catch {
      /* localStorage indisponível — ignora animação */
    }
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Agendar pelo WhatsApp"
      className={`fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
        firstVisit ? "motion-safe:animate-[wpp-in_0.6s_ease-out]" : ""
      }`}
      style={{
        right: "max(1.25rem, env(safe-area-inset-right))",
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
      }}
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.044zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>
    </a>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-surface/70 backdrop-blur-xl"
          : "border-b border-transparent bg-surface/30 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#topo" className="flex items-center gap-3">
          <img src={logo.url} alt="Logo Barbearia do Alemão" className="h-11 w-11 rounded-full object-cover transition-transform duration-300 hover:scale-105" />
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
          className="font-condensed text-xs font-semibold uppercase tracking-[0.16em] border border-primary bg-primary px-4 py-2 text-primary-foreground transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
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
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-28 md:min-h-[88vh] md:grid-cols-2 md:gap-12 md:pb-20">
        <div className="order-2 md:order-1">
          <p className="font-condensed text-sm font-medium uppercase tracking-[0.3em] text-primary motion-safe:animate-[fade-in_0.6s_ease-out_both]">
            Barbearia do Alemão • Júlio de Mesquita Filho, Sorocaba/SP
          </p>
          <h1 className="mt-6 text-4xl uppercase leading-[1.08] sm:text-5xl md:text-6xl motion-safe:animate-[fade-in_0.7s_ease-out_0.08s_both]">
            Corte no capricho.
            <br />
            Barba alinhada.
            <br />
            <span className="text-primary">Atendimento sem pressa.</span>
          </h1>
          <p className="mt-7 max-w-md font-body text-base leading-relaxed text-muted-foreground sm:text-lg motion-safe:animate-[fade-in_0.7s_ease-out_0.16s_both]">
            Barbearia no Júlio de Mesquita Filho para quem valoriza atendimento
            tranquilo, atenção aos detalhes e resultado bem feito.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap motion-safe:animate-[fade-in_0.7s_ease-out_0.24s_both]">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="text-center font-condensed text-sm font-semibold uppercase tracking-[0.16em] bg-primary px-7 py-3.5 text-primary-foreground transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
            >
              Agendar no WhatsApp
            </a>
            <a
              href="#galeria"
              className="text-center font-condensed text-sm font-semibold uppercase tracking-[0.16em] border border-border px-7 py-3.5 text-foreground transition-all duration-300 hover:border-foreground hover:-translate-y-0.5"
            >
              Ver trabalhos
            </a>
          </div>
        </div>
        <div className="relative order-1 overflow-hidden rounded-sm md:order-2 motion-safe:animate-[scale-in_0.8s_ease-out_both]">
          <img
            src={ownerWorking.url}
            alt="O Alemão atendendo um cliente na cadeira da Barbearia do Alemão"
            className="aspect-[4/5] w-full rounded-sm object-cover md:aspect-[3/4] motion-safe:animate-ken-burns"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}

function Sobre() {
  return (
    <section id="sobre" className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
        <Reveal className="relative">
          <div className="overflow-hidden rounded-sm">
            <img
              src={owner.url}
              alt="O Alemão, barbeiro da Barbearia do Alemão"
              className="aspect-[4/5] w-full rounded-sm object-cover transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>
          <span className="absolute -bottom-4 left-4 bg-primary px-4 py-2 font-condensed text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground">
            O Alemão
          </span>
        </Reveal>
        <Reveal delay={120}>
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
          <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
            <img
              src={tattoo.url}
              alt="Tatuagem do Alemão"
              className="h-14 w-14 shrink-0 rounded-sm object-cover opacity-90"
            />
            <p className="min-w-0 font-body text-xs leading-relaxed text-muted-foreground">
              Toda barbearia tem uma história. Algumas aparecem nas paredes,
              outras nos pequenos detalhes de quem faz parte dela todos os dias.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Galeria() {
  return (
    <section id="galeria" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
        <p className="font-condensed text-sm font-medium uppercase tracking-[0.28em] text-primary">
          Galeria
        </p>
        <h2 className="mt-3 text-4xl uppercase leading-tight sm:text-5xl">
          A barbearia por dentro
        </h2>
        </Reveal>

        <Reveal className="mt-14" delay={80}>
          <h3 className="font-condensed text-lg font-semibold uppercase tracking-[0.18em]">
            Ambiente
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden border border-border">
              <img src={interior.url} alt="Ambiente da Barbearia do Alemão" className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out hover:scale-105" />
            </div>
            <div className="overflow-hidden border border-border">
              <img src={rockWall.url} alt="Parede decorada da barbearia" className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out hover:scale-105" />
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-14" delay={80}>
          <h3 className="font-condensed text-lg font-semibold uppercase tracking-[0.18em]">
            Resultados
          </h3>
          <div className="mt-5 grid gap-8 md:grid-cols-2">
            {resultados.map((t) => (
              <figure key={t.titulo} className="border border-border bg-card p-4 transition-colors duration-300 hover:border-primary/50">
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative overflow-hidden">
                    <img src={t.antes.url} alt={`${t.titulo} — antes`} className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out hover:scale-105" />
                    <span className="absolute left-2 top-2 bg-background/85 px-2.5 py-1 font-condensed text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">Antes</span>
                  </div>
                  <div className="relative overflow-hidden">
                    <img src={t.depois.url} alt={`${t.titulo} — depois`} className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out hover:scale-105" />
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
        </Reveal>
      </div>
    </section>
  );
}

function Servicos() {
  return (
    <section id="servicos" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
        <p className="font-condensed text-sm font-medium uppercase tracking-[0.28em] text-primary">
          Serviços
        </p>
        <h2 className="mt-3 text-4xl uppercase leading-tight sm:text-5xl">
          Serviços
        </h2>
        </Reveal>
        <Reveal className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3" delay={80}>
          {servicos.map((s) => (
            <div key={s.nome} className="bg-card p-7 transition-colors duration-300 hover:bg-secondary">
              <h3 className="text-xl uppercase leading-tight">{s.nome}</h3>
              <p className="mt-3 font-body text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Horarios() {
  const dias = [
    { d: "Terça-feira", h: "09:00 às 21:00", fechado: false },
    { d: "Quarta-feira", h: "07:30 às 20:00", fechado: false },
    { d: "Quinta-feira", h: "07:30 às 21:00", fechado: false },
    { d: "Sexta-feira", h: "07:30 às 21:00", fechado: false },
    { d: "Sábado", h: "07:30 às 20:00", fechado: false },
    { d: "Domingo", h: "Fechado", fechado: true },
    { d: "Segunda-feira", h: "Fechado", fechado: true },
  ];
  return (
    <section id="horarios" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-3xl px-5 py-20 md:py-28">
        <Reveal>
        <p className="font-condensed text-sm font-medium uppercase tracking-[0.28em] text-primary">
          Horários
        </p>
        <h2 className="mt-3 text-4xl uppercase leading-tight sm:text-5xl">
          Horários de Atendimento
        </h2>
        <p className="mt-4 max-w-xl font-body text-muted-foreground">
          Confira os dias e horários de funcionamento da Barbearia do Alemão.
        </p>
        </Reveal>

        <Reveal className="mt-10" delay={80}>
        <ul className="flex flex-col gap-3">
          {dias.map((d) => (
            <li
              key={d.d}
              className={`flex items-center justify-between gap-4 border px-5 py-4 transition-colors duration-300 sm:px-6 ${
                d.fechado
                  ? "border-border/60 bg-background/40"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <span
                className={`font-condensed text-base uppercase tracking-[0.14em] ${
                  d.fechado ? "text-muted-foreground" : "text-foreground"
                }`}
              >
                {d.d}
              </span>
              {d.fechado ? (
                <span className="font-condensed text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground border border-border/60 px-3 py-1">
                  Fechado
                </span>
              ) : (
                <span className="font-body text-base text-muted-foreground tabular-nums">
                  {d.h}
                </span>
              )}
            </li>
          ))}
        </ul>
        </Reveal>

        <div className="mt-10 border-t border-border pt-8 text-center sm:text-left">
          <p className="font-body text-sm text-muted-foreground">
            Para garantir disponibilidade, entre em contato pelo WhatsApp antes
            da visita.
          </p>
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block font-condensed text-sm font-semibold uppercase tracking-[0.16em] bg-primary px-7 py-3.5 text-primary-foreground transition-opacity hover:opacity-90"
          >
            Agendar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Localizacao() {
  const endereco = "R. Maria Germani, 826 - Júlio de Mesquita Filho, Sorocaba - SP, 18053-030";
  const mapsQuery = encodeURIComponent(endereco);
  return (
    <section id="localizacao" className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2 md:items-start md:gap-12 md:py-28">
        <Reveal>
          <p className="font-condensed text-sm font-medium uppercase tracking-[0.28em] text-primary">
            Localização
          </p>
          <h2 className="mt-3 text-4xl uppercase leading-tight sm:text-5xl">
            Onde Estamos
          </h2>
          <p className="mt-6 max-w-md font-body text-muted-foreground">
            A Barbearia do Alemão está localizada no bairro Júlio de Mesquita
            Filho, em Sorocaba/SP. Entre em contato pelo WhatsApp ou venha
            conhecer o espaço pessoalmente.
          </p>

          <ul className="mt-8 flex flex-col gap-4">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 shrink-0 text-primary" />
              <div className="font-body text-sm text-muted-foreground">
                <p className="font-condensed text-base uppercase tracking-[0.12em] text-foreground">
                  R. Maria Germani, 826
                </p>
                <p className="mt-1">Júlio de Mesquita Filho</p>
                <p>Sorocaba - SP</p>
                <p>CEP 18053-030</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="shrink-0 text-primary" />
              <span className="font-body text-sm text-muted-foreground">
                (15) 98803-0574 · WhatsApp
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="shrink-0 text-primary" />
              <span className="font-body text-sm text-muted-foreground">
                Terça a sábado · Domingo e segunda fechado
              </span>
            </li>
          </ul>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
              target="_blank"
              rel="noreferrer"
              className="text-center font-condensed text-sm font-semibold uppercase tracking-[0.16em] bg-primary px-7 py-3.5 text-primary-foreground transition-opacity hover:opacity-90"
            >
              Como chegar
            </a>
            <a
              href="https://wa.me/5515988030574"
              target="_blank"
              rel="noreferrer"
              className="text-center font-condensed text-sm font-semibold uppercase tracking-[0.16em] border border-border px-7 py-3.5 text-foreground transition-colors hover:border-foreground"
            >
              Agendar no WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal className="overflow-hidden border border-border" delay={120}>
          <iframe
            title="Mapa da Barbearia do Alemão"
            src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
            className="h-[320px] w-full md:h-[460px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </section>
  );
}

function CtaFinal() {
  return (
    <section id="cta" className="relative overflow-hidden border-t border-border">
      <div className="absolute inset-0 grain opacity-60" />
      <Reveal className="relative mx-auto max-w-4xl px-5 py-24 text-center md:py-32">
        <img src={logo.url} alt="Logo Barbearia do Alemão" className="mx-auto h-20 w-20 rounded-full object-cover transition-transform duration-500 hover:scale-105" />
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
            className="font-condensed text-sm font-semibold uppercase tracking-[0.16em] bg-primary px-8 py-4 text-primary-foreground transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
          >
            Agendar no WhatsApp
          </a>
        </div>
      </Reveal>
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
