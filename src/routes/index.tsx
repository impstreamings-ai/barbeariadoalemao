import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/site/About";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { FinalCta, Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Hours } from "@/components/site/Hours";
import { Location } from "@/components/site/Location";
import { Results } from "@/components/site/Results";
import { Reviews } from "@/components/site/Reviews";
import { Services } from "@/components/site/Services";
import { jsonLd, SITE_URL } from "@/lib/site";

const TITLE = "Barbearia do Alemão — Corte e barba em Sorocaba/SP";
const DESCRIPTION =
  "Barbearia do Alemão em Sorocaba: corte masculino, barba e acabamento desde 2015, com atendimento sem pressa. Agende seu horário pelo WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}/og.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "O Alemão atendendo um cliente na Barbearia do Alemão" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: `${SITE_URL}/og.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd()) }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="label sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-primary focus:px-4 focus:py-3 focus:text-primary-foreground"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Results />
        <Services />
        <Reviews />
        <Hours />
        <Location />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
