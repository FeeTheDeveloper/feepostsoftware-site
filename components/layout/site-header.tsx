"use client";

import { useEffect, useState } from "react";
import { ActionLink } from "@/components/ui/action-link";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#government", label: "Government" },
  { href: "#why", label: "Why Feepost" },
  { href: "#credibility", label: "Credibility" }
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50">
      <div className="shell pt-5">
        <div
          className={`site-header__shell glass-panel flex items-center justify-between rounded-full px-4 py-3 sm:px-5 ${
            scrolled ? "site-header__shell--scrolled" : ""
          }`}
        >
          <a href="#top" className="flex items-center gap-3" data-cursor="interactive">
            <div
              aria-hidden="true"
              className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-[radial-gradient(circle_at_35%_30%,rgba(0,229,255,0.34),transparent_34%),radial-gradient(circle_at_70%_70%,rgba(255,0,127,0.26),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[0_0_28px_rgba(0,229,255,0.18)]"
            >
              <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.22),transparent)] opacity-40" />
              <span className="absolute inset-[8px] rounded-full border border-white/10 bg-black/20" />
              <span className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(184,251,255,0.8),rgba(0,229,255,0.14)_58%,transparent_72%)] blur-[1px]" />
            </div>
            <div>
              <div className="font-display text-sm uppercase tracking-[0.28em] text-white">
                Feepost
              </div>
              <div className="text-[0.65rem] uppercase tracking-[0.28em] text-white/48">
                Software &amp; Development
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-cursor="interactive"
                className="site-nav__link text-xs font-semibold uppercase tracking-[0.28em] text-white/60 transition-colors duration-200 hover:text-cyan"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden sm:block">
            <ActionLink href="#contact" className="px-5 py-2.5 text-xs">
              Engage
            </ActionLink>
          </div>
        </div>
      </div>
    </header>
  );
}
