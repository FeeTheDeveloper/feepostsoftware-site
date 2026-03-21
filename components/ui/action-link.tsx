"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ActionLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  pulse?: boolean;
};

export function ActionLink({
  href,
  children,
  variant = "primary",
  className = "",
  pulse = false
}: ActionLinkProps) {
  const shared =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-[0.22em] uppercase transition-colors";
  const variants = {
    primary:
      "border border-cyan/40 bg-cyan/12 text-white shadow-cyan backdrop-blur hover:bg-cyan/18",
    secondary:
      "border border-white/12 bg-white/5 text-white/80 backdrop-blur hover:border-magenta/35 hover:text-white"
  };

  return (
    <motion.a
      className={`${shared} ${variants[variant]} ${pulse ? "cta-button-pulse" : ""} ${className}`}
      href={href}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.a>
  );
}
