import { MapPin, Phone } from "lucide-react";

import { ADDRESS, mapsDirectionsUrl, mapsEmbedUrl, PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";

import { CtaLink, CtaWhatsApp, Reveal, SectionHead } from "./ui";

export function Location() {
  return (
    <section id="localizacao" className="border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2 md:items-start md:gap-16 md:py-28">
        <Reveal>
          <SectionHead eyebrow="Localização" title="Onde estamos">
            No bairro {ADDRESS.district}, em {ADDRESS.city}/{ADDRESS.region}. Chame no WhatsApp ou
            venha conhecer o espaço.
          </SectionHead>

          <address className="mt-10 space-y-5 not-italic">
            <p className="flex gap-4">
              <MapPin
                size={20}
                strokeWidth={1.5}
                aria-hidden="true"
                className="mt-1 shrink-0 text-brand"
              />
              <span>
                <span className="block text-lg">{ADDRESS.street}</span>
                <span className="block text-muted-foreground">
                  {ADDRESS.district} · {ADDRESS.city} - {ADDRESS.region}
                </span>
                <span className="block text-muted-foreground">CEP {ADDRESS.zip}</span>
              </span>
            </p>
            <p className="flex items-center gap-4">
              <Phone
                size={20}
                strokeWidth={1.5}
                aria-hidden="true"
                className="shrink-0 text-brand"
              />
              <a
                href={`tel:+${PHONE_E164}`}
                className="inline-flex min-h-11 items-center text-lg underline-offset-4 hover:underline"
              >
                {PHONE_DISPLAY}
              </a>
              <span className="label text-muted-foreground">WhatsApp</span>
            </p>
          </address>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CtaLink href={mapsDirectionsUrl} external>
              Como chegar
            </CtaLink>
            <CtaWhatsApp />
          </div>
        </Reveal>

        <Reveal delay={100} className="overflow-hidden border border-border">
          <iframe
            title="Mapa da Barbearia do Alemão"
            src={mapsEmbedUrl}
            className="h-[320px] w-full [filter:grayscale(0.7)_contrast(0.95)] md:h-[460px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </div>
    </section>
  );
}
