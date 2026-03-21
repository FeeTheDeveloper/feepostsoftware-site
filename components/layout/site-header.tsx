"use client";

import Image from "next/image";
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
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-white/5">
              <Image
                src="/logo.png"
                alt="Feepost Software logo"
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
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
