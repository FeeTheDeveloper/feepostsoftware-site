"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type GlowCardProps = {
  kicker?: string;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
};

export function GlowCard({
  kicker,
  title,
  description,
  children,
  className = ""
}: GlowCardProps) {
  return (
    <motion.article
      className={`glass-panel group relative overflow-hidden rounded-[1.6rem] p-6 sm:p-7 ${className}`}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,229,255,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(255,0,127,0.16),transparent_34%)]" />
      </div>
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />

      {kicker ? (
        <div className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-cyan/80">
          {kicker}
        </div>
      ) : null}

      <h3 className="relative text-xl font-semibold text-white sm:text-2xl">{title}</h3>
      <p className="relative mt-4 max-w-xl text-sm leading-7 text-white/68 sm:text-[0.98rem]">
        {description}
      </p>

      {children ? <div className="relative mt-6">{children}</div> : null}
    </motion.article>
  );
}
