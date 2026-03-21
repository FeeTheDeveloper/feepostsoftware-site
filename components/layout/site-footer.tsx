import { contactEmail } from "@/lib/content";

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#government", label: "Government" },
  { href: "#contact", label: "Contact" }
] as const;

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/8 py-10">
      <div className="shell flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="font-display text-sm uppercase tracking-[0.36em] text-white">
            Feepost Software &amp; Development Corporation
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/56">
            Veteran-owned technology delivery across software engineering, systems development,
            digital infrastructure, and secure modernization programs.
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 lg:items-end">
          <div className="flex flex-wrap gap-4">
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href} className="footer-link">
                {link.label}
              </a>
            ))}
          </div>
          <a
            href={`mailto:${contactEmail}`}
            className="text-sm uppercase tracking-[0.24em] text-cyan/72 transition-colors duration-200 hover:text-cyan"
          >
            {contactEmail}
          </a>
          <div className="text-xs uppercase tracking-[0.24em] text-white/38">
            {"©"} {new Date().getFullYear()} Feepost. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
