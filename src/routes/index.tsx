import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Scissors, User, Sparkles, Baby, Star, Check, X, Menu, MessageSquare } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import logo from "@/assets/barbearia/a2.png.asset.json";
import interior from "@/assets/barbearia/a1.png.asset.json";
import owner from "@/assets/barbearia/a12.png.asset.json";
import ownerWorking from "@/assets/barbearia/a11.png.asset.json";
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
  {
    nome: "Corte Masculino",
    desc: "Do clássico ao degradê, executado com atenção aos detalhes.",
    Icon: Scissors,
    destaque: false,
  },
  {
    nome: "Barba",
    desc: "Alinhamento, contorno e acabamento para manter o visual sempre em ordem.",
    Icon: User,
    destaque: false,
  },
  {
    nome: "Corte + Barba",
    desc: "Atendimento completo para cabelo e barba na mesma sessão.",
    Icon: Star,
    destaque: true,
  },
  {
    nome: "Acabamento",
    desc: "Manutenção rápida para manter o corte alinhado.",
    Icon: Sparkles,
    destaque: false,
  },
  {
    nome: "Corte Infantil",
    desc: "Atendimento pensado para crianças, com paciência e atenção.",
    Icon: Baby,
    destaque: false,
  },
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
        <Prova />
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

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/9QmcRTjmGaU3DDd37";

const destaques = [
  { valor: "5,0", Icon: Star, label: "Estrelas", desc: "Avaliação média dos clientes" },
  { valor: "134", Icon: MessageSquare, label: "Avaliações", desc: "Feedbacks reais no Google" },
  { valor: "2015", Icon: MapPin, label: "Desde", desc: "Mais de uma década atendendo Sorocaba" },
];

const avaliacoes = [
  {
    nome: "Walter Junior",
    texto:
      "Ambiente bacana, resenha boa e agradável. Corte rápido e bem feito, barba feita nos detalhes. Horário agendado e respeitado, não te deixando esperando para ser atendido. Atendimento muito bom, indico sem medo.",
  },
  {
    nome: "Wagner Galone",
    texto:
      "Belo corte, com agilidade e muito simpatia. Gente boa demais. Fora uma bela geladeira de Heineken.",
  },
  {
    nome: "Henrique Thiago",
    texto:
      "Excelente profissional e o ambiente é bem agradável e leve. Foi top minha experiência.",
  },
];

function Prova() {
  return (
    <section id="prova" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
          <p className="font-condensed text-sm font-medium uppercase tracking-[0.28em] text-primary">
            Prova social
          </p>
          <h2 className="mt-3 text-4xl uppercase leading-tight sm:text-5xl">
            Confiança construída ao longo dos anos
          </h2>
          <p className="mt-4 max-w-xl font-body text-muted-foreground">
            Desde 2015 atendendo clientes em Sorocaba com avaliação máxima no Google.
          </p>
        </Reveal>

        <Reveal className="mt-12 grid gap-4 sm:grid-cols-3" delay={80}>
          {destaques.map((d) => (
            <div
              key={d.label}
              className="flex items-center gap-4 border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/50"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-sm bg-secondary text-primary">
                <d.Icon size={22} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="font-condensed text-2xl font-semibold leading-none text-foreground">
                  {d.valor}
                  <span className="ml-1 text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    {d.label}
                  </span>
                </p>
                <p className="mt-1.5 font-body text-xs leading-relaxed text-muted-foreground">
                  {d.desc}
                </p>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-6 grid gap-4 md:grid-cols-3" delay={120}>
          {avaliacoes.map((a) => (
            <figure
              key={a.nome}
              className="flex flex-col border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/50"
            >
              <div className="flex gap-0.5 text-primary" aria-label="5 de 5 estrelas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-current" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 font-body text-sm leading-relaxed text-muted-foreground">
                {a.texto}
              </blockquote>
              <figcaption className="mt-4 border-t border-border pt-4 font-condensed text-sm font-semibold uppercase tracking-[0.12em] text-foreground">
                {a.nome}
              </figcaption>
            </figure>
          ))}
        </Reveal>

        <Reveal className="mt-10" delay={160}>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-border px-7 py-3.5 font-condensed text-sm font-semibold uppercase tracking-[0.16em] text-foreground transition-all duration-300 hover:border-foreground hover:-translate-y-0.5"
          >
            <Star size={16} className="fill-current text-primary" aria-hidden="true" />
            Ver mais avaliações no Google
          </a>
        </Reveal>
      </div>
    </section>
  );
}

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
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    const ids = nav.map((n) => n.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
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
              aria-current={active === n.href ? "true" : undefined}
              className={`relative font-condensed text-xs font-medium uppercase tracking-[0.18em] transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-primary after:transition-all after:duration-300 hover:text-foreground ${
                active === n.href
                  ? "text-foreground after:w-full"
                  : "text-muted-foreground after:w-0"
              }`}
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
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="ml-2 inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:border-primary/60 md:hidden"
        >
          <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
    </header>
    <MobileMenu
      open={menuOpen}
      active={active}
      onClose={() => setMenuOpen(false)}
    />
    </>
  );
}

function MobileMenu({
  open,
  active,
  onClose,
}: {
  open: boolean;
  active: string;
  onClose: () => void;
}) {
  const items = [...nav, { href: "#cta", label: "Agendar" }];
  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu de navegação"
      aria-hidden={!open}
      className={`fixed inset-0 z-[60] md:hidden ${open ? "" : "pointer-events-none"}`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <nav
        className={`absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col border-l border-border bg-surface shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="font-condensed text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Navegação
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:border-primary/60"
          >
            <X size={20} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
        <ul className="flex flex-1 flex-col gap-1 px-3 py-6">
          {items.map((n, i) => {
            const isActive = active === n.href;
            const isCta = n.href === "#cta";
            return (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={onClose}
                  aria-current={isActive ? "true" : undefined}
                  style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
                  className={`flex items-center justify-between rounded-sm px-4 py-3.5 font-condensed text-sm font-medium uppercase tracking-[0.16em] transition-all duration-300 ${
                    open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                  } ${
                    isCta
                      ? "mt-3 justify-center border border-primary bg-primary text-primary-foreground"
                      : isActive
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-card hover:text-foreground"
                  }`}
                >
                  {n.label}
                  {!isCta && isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function Hero() {
  return (
    <section id="topo" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-6 px-5 pb-12 pt-24 md:min-h-[88vh] md:grid-cols-2 md:gap-12 md:pb-20 md:pt-28">
        <div className="md:order-1">
          <p className="font-condensed text-xs font-medium uppercase tracking-[0.28em] text-primary sm:text-sm sm:tracking-[0.3em] motion-safe:animate-[fade-in_0.6s_ease-out_both]">
            Barbearia do Alemão • Júlio de Mesquita Filho, Sorocaba/SP
          </p>
          <h1 className="mt-4 text-[2rem] uppercase leading-[1.05] sm:mt-6 sm:text-5xl md:text-6xl motion-safe:animate-[fade-in_0.7s_ease-out_0.08s_both]">
            Corte no capricho.
            <br />
            Barba alinhada.
            <br />
            <span className="text-primary">Atendimento sem pressa.</span>
          </h1>
          <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-condensed text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-sm motion-safe:animate-[fade-in_0.7s_ease-out_0.12s_both]">
            <Star size={15} className="fill-current text-primary" aria-hidden="true" />
            <span className="text-foreground">5,0 no Google</span>
            <span aria-hidden="true" className="text-border">•</span>
            <span>134 avaliações</span>
            <span aria-hidden="true" className="text-border">•</span>
            <span>Desde 2015</span>
          </p>
          <p className="mt-4 max-w-md font-body text-base leading-relaxed text-muted-foreground sm:mt-7 sm:text-lg motion-safe:animate-[fade-in_0.7s_ease-out_0.16s_both]">
            Barbearia no Júlio de Mesquita Filho para quem valoriza atendimento
            tranquilo, atenção aos detalhes e resultado bem feito.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap motion-safe:animate-[fade-in_0.7s_ease-out_0.24s_both]">
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
        <div className="relative overflow-hidden rounded-sm md:order-2 motion-safe:animate-[scale-in_0.8s_ease-out_both]">
          <img
            src={ownerWorking.url}
            alt="O Alemão atendendo um cliente na cadeira da Barbearia do Alemão"
            className="aspect-[16/10] w-full rounded-sm object-cover object-[50%_25%] sm:aspect-[4/5] md:aspect-[3/4] motion-safe:animate-ken-burns"
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
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-sm border border-border text-primary">
              <Scissors size={20} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <p className="min-w-0 font-body text-xs leading-relaxed text-muted-foreground">
              Atendimento sem pressa, capricho em cada corte e um ambiente onde o
              cliente se sente à vontade pra voltar sempre.
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
        <p className="mt-4 max-w-xl font-body text-muted-foreground">
          Conheça o espaço e os resultados de quem já passou pela cadeira do Alemão.
        </p>
        </Reveal>

        <Reveal className="mt-16" delay={80}>
          <p className="font-condensed text-xs font-medium uppercase tracking-[0.28em] text-primary">
            01 — O espaço
          </p>
          <h3 className="mt-2 text-2xl uppercase leading-tight sm:text-3xl">
            O Espaço
          </h3>
          <p className="mt-3 max-w-xl font-body text-muted-foreground">
            Um ambiente organizado, confortável e preparado para receber cada
            cliente com tranquilidade.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <figure className="overflow-hidden border border-border transition-colors duration-300 hover:border-primary/50">
              <img
                src={interior.url}
                alt="Ambiente interno da Barbearia do Alemão"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </figure>
            <figure className="overflow-hidden border border-border transition-colors duration-300 hover:border-primary/50">
              <img
                src={ownerWorking.url}
                alt="O Alemão atendendo um cliente no espaço da barbearia"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </figure>
          </div>
        </Reveal>

        <Reveal className="mt-16" delay={80}>
          <p className="font-condensed text-xs font-medium uppercase tracking-[0.28em] text-primary">
            02 — Resultados reais
          </p>
          <h3 className="mt-2 text-2xl uppercase leading-tight sm:text-3xl">
            Resultados Reais
          </h3>
          <p className="mt-3 max-w-xl font-body text-muted-foreground">
            Clientes reais. Resultados reais.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {resultados.map((t) => (
              <figure key={t.titulo} className="border border-border bg-card p-4 transition-colors duration-300 hover:border-primary/50">
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative overflow-hidden">
                    <img src={t.antes.url} alt={`${t.titulo} — antes`} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out hover:scale-105" />
                    <span className="absolute left-2 top-2 bg-background/85 px-2.5 py-1 font-condensed text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">Antes</span>
                  </div>
                  <div className="relative overflow-hidden">
                    <img src={t.depois.url} alt={`${t.titulo} — depois`} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out hover:scale-105" />
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
        <p className="mt-4 max-w-xl font-body text-muted-foreground">
          Atendimento completo de cabelo e barba, feito com calma e capricho.
        </p>
        </Reveal>
        <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" delay={80}>
          {servicos.map((s) => (
            <article
              key={s.nome}
              className={`group relative flex flex-col gap-4 border p-7 transition-all duration-300 hover:-translate-y-1 ${
                s.destaque
                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              {s.destaque && (
                <span className="absolute right-4 top-4 bg-primary px-2.5 py-1 font-condensed text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-primary-foreground">
                  Mais pedido
                </span>
              )}
              <span
                className={`grid h-12 w-12 place-items-center rounded-sm ${
                  s.destaque
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-primary"
                }`}
              >
                <s.Icon size={22} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-xl uppercase leading-tight">{s.nome}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </div>
              {s.destaque && (
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block self-start font-condensed text-xs font-semibold uppercase tracking-[0.16em] bg-primary px-5 py-2.5 text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Agendar
                </a>
              )}
            </article>
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
        <ul className="divide-y divide-border overflow-hidden border border-border bg-card">
          {dias.map((d) => (
            <li
              key={d.d}
              className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-4 transition-colors duration-300 sm:px-6 ${
                d.fechado ? "bg-background/30" : "hover:bg-secondary/60"
              }`}
            >
              <span
                className={`min-w-0 truncate font-condensed text-base uppercase tracking-[0.14em] ${
                  d.fechado ? "text-muted-foreground" : "text-foreground"
                }`}
              >
                {d.d}
              </span>
              {d.fechado ? (
                <span className="inline-flex shrink-0 items-center gap-1.5 border border-destructive/40 bg-destructive/10 px-3 py-1 font-condensed text-xs font-semibold uppercase tracking-[0.16em] text-destructive">
                  <X size={13} strokeWidth={2.5} aria-hidden="true" />
                  Fechado
                </span>
              ) : (
                <span className="flex shrink-0 items-center gap-3">
                  <span className="font-body text-sm text-foreground tabular-nums sm:text-base">
                    {d.h}
                  </span>
                  <span className="inline-flex items-center gap-1.5 border border-primary/40 bg-primary/10 px-3 py-1 font-condensed text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-primary">
                    <Check size={13} strokeWidth={2.5} aria-hidden="true" />
                    Aberto
                  </span>
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
            href={WHATSAPP_URL}
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
    <section id="cta" className="relative overflow-hidden border-t border-border bg-surface">
      <div className="absolute inset-0 grain opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center px-5 py-28 text-center md:py-36">
        <img
          src={logo.url}
          alt="Logo Barbearia do Alemão"
          className="h-20 w-20 rounded-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <h2 className="mt-8 text-4xl uppercase leading-[0.98] sm:text-5xl md:text-6xl">
          Pronto pra dar um grau?
        </h2>
        <p className="mx-auto mt-6 max-w-md font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
          Chame no WhatsApp e agende seu horário diretamente com a Barbearia do
          Alemão.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-block font-condensed text-sm font-semibold uppercase tracking-[0.16em] bg-primary px-9 py-4 text-primary-foreground transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
        >
          Agendar no WhatsApp
        </a>
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
