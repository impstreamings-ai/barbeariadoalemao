import { Instagram } from "lucide-react";

import { logo } from "@/assets/barbearia";
import { ADDRESS, INSTAGRAM_URL, NAME, nav, PHONE_DISPLAY } from "@/lib/site";

import { CtaWhatsApp, Reveal } from "./ui";

export function FinalCta() {
  return (
    <section id="agendar" className="border-t border-border bg-surface">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center px-5 py-24 text-center md:py-32">
        <img
          src={logo.src}
          width={64}
          height={64}
          alt=""
          loading="lazy"
          className="h-16 w-16 rounded-full object-cover"
        />
        <h2 className="mt-8 text-4xl sm:text-6xl">Pronto para o próximo corte?</h2>
        <p className="mt-5 max-w-md text-base text-muted-foreground">
          Chame no WhatsApp e agende seu horário diretamente com a Barbearia do Alemão.
        </p>
        <CtaWhatsApp className="mt-9" />
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface pb-24 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-3">
            <img
              src={logo.src}
              width={36}
              height={36}
              alt=""
              loading="lazy"
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="label text-foreground">{NAME}</span>
          </p>
          <p className="mt-4 text-sm text-muted-foreground">Corte · Barba · Acabamento</p>
        </div>
        <nav aria-label="Rodapé">
          <ul className="grid grid-cols-2 gap-x-6">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="label inline-flex min-h-11 items-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-1 text-sm text-muted-foreground">
          <p className="text-foreground">{ADDRESS.street}</p>
          <p>
            {ADDRESS.district} · {ADDRESS.city}/{ADDRESS.region}
          </p>
          <p>{PHONE_DISPLAY}</p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="label mt-3 inline-flex min-h-11 items-center gap-2 text-foreground hover:text-brand"
          >
            <Instagram size={16} strokeWidth={1.5} aria-hidden="true" />
            Instagram
          </a>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {NAME}.
      </div>
    </footer>
  );
}
