import { Instagram } from "lucide-react";

import { logo } from "@/assets/barbearia";
import {
  ADDRESS,
  INSTAGRAM_URL,
  mapsDirectionsUrl,
  NAME,
  nav,
  PHONE_DISPLAY,
  PHONE_E164,
} from "@/lib/site";

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
        <h2 className="t-title mt-8">Pronto para o próximo corte?</h2>
        <p className="mt-5 max-w-md text-muted-foreground">
          Chame no WhatsApp e agende seu horário diretamente com a Barbearia do Alemão.
        </p>
        <CtaWhatsApp className="mt-9" />
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface pb-24 md:pb-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:max-[899.98px]:grid-cols-[minmax(max-content,1fr)_auto_auto] md:max-[899.98px]:gap-x-[clamp(1.125rem,calc((100vw_-_768px)*0.4_+_1.125rem),2.5rem)]">
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
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            className="block space-y-1 underline-offset-4 hover:underline"
          >
            <span className="block text-foreground">{ADDRESS.street}</span>
            <span className="block">
              {ADDRESS.district} · {ADDRESS.city}/{ADDRESS.region}
            </span>
          </a>
          <p>
            <a
              href={`tel:+${PHONE_E164}`}
              className="relative underline-offset-4 after:absolute after:-bottom-[22.5px] after:-inset-x-2 after:-top-[6.5px] hover:underline"
            >
              {PHONE_DISPLAY}
            </a>
          </p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="label -mb-2 mt-5 inline-flex min-h-11 items-center gap-2 pb-4 text-foreground hover:text-brand"
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
