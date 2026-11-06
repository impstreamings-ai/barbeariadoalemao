import { useEffect, useState } from "react";

import { whatsappUrl } from "@/lib/site";

import { WhatsAppIcon } from "./ui";

/** Aparece depois da primeira dobra (o Hero já tem o CTA principal). */
export function FloatingWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Agendar pelo WhatsApp"
      tabIndex={show ? 0 : -1}
      className={`fixed z-50 flex h-14 items-center justify-center gap-2.5 rounded-full bg-[#1fa855] px-4 text-white shadow-lg shadow-black/50 transition-all duration-300 hover:bg-[#1b9a4d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-6 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-3 opacity-0"
      }`}
      style={{
        right: "max(1.25rem, env(safe-area-inset-right))",
        bottom: "max(1.25rem, env(safe-area-inset-bottom))",
      }}
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="label hidden sm:inline">Agendar</span>
    </a>
  );
}
