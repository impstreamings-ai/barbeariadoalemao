import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { logo } from "@/assets/barbearia";
import { NAME, nav, whatsappUrl } from "@/lib/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(`#${hit.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          scrolled
            ? "border-border bg-surface/95 backdrop-blur-md"
            : "border-transparent bg-surface"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#topo" className="flex items-center gap-3" aria-label={`${NAME} — início`}>
            <img
              src={logo.src}
              width={36}
              height={36}
              alt=""
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="label text-foreground">{NAME}</span>
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                aria-current={active === n.href ? "true" : undefined}
                className={`label relative py-2 transition-colors hover:text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-brand after:transition-transform after:duration-300 ${
                  active === n.href
                    ? "text-foreground after:scale-x-100"
                    : "text-muted-foreground after:scale-x-0"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className="label hidden min-h-11 items-center bg-primary px-5 text-primary-foreground transition-colors hover:bg-primary/85 sm:inline-flex"
            >
              Agendar
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              className="inline-flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors hover:border-foreground/60 lg:hidden"
            >
              <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="right"
          className="w-[88%] max-w-sm border-l border-border bg-surface p-0"
        >
          <SheetHeader className="border-b border-border px-6 py-5 text-left">
            <SheetTitle className="label text-muted-foreground">Navegação</SheetTitle>
            <SheetDescription className="sr-only">Menu de navegação do site</SheetDescription>
          </SheetHeader>
          <nav aria-label="Menu" className="flex flex-1 flex-col justify-between px-6 pb-8 pt-4">
            <ul>
              {nav.map((n) => (
                <li key={n.href} className="border-b border-border/60">
                  <a
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active === n.href ? "true" : undefined}
                    className={`font-display flex min-h-14 items-center text-3xl transition-colors ${
                      active === n.href
                        ? "text-foreground"
                        : "text-foreground/75 hover:text-foreground"
                    }`}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
              className="label mt-8 flex min-h-14 items-center justify-center bg-primary text-primary-foreground"
            >
              Agendar pelo WhatsApp
            </a>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
