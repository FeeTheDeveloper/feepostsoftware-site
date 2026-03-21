"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { MouseEvent as ReactMouseEvent } from "react";
import { useState } from "react";
import { useInteractiveGlow } from "@/components/ui/use-interactive-glow";

type ServiceIcon =
  | "code"
  | "shield-grid"
  | "nodes"
  | "cloud"
  | "lock-data"
  | "refresh";

type ServiceCardProps = {
  id: string;
  icon: ServiceIcon;
  title: string;
  description: string;
  detailLabel: string;
  details: readonly string[];
};

const iconMap: Record<ServiceIcon, string> = {
  code: "M34 24 24 34l10 10M58 24l10 10-10 10M44 18 34 50",
  "shield-grid":
    "M46 14c7 6 14 8 22 9v16c0 13-8 24-22 29-14-5-22-16-22-29V23c8-1 15-3 22-9Zm-10 21h8m8 0h8M36 45h8m8 0h8",
  nodes:
    "M20 26h14l12 10h10m-36 18h14l12-10h10M20 40h12m-16-18a4 4 0 1 0 0 .01M16 58a4 4 0 1 0 0 .01M60 40a4 4 0 1 0 0 .01",
  cloud:
    "M26 56h30c8 0 14-5 14-13 0-7-5-12-12-13-2-10-10-16-20-16-10 0-18 7-20 18-7 1-12 6-12 12 0 7 6 12 14 12Z",
  "lock-data":
    "M24 34h44v28H24zm10 0v-8c0-8 5-14 12-14s12 6 12 14v8M34 46h24M34 54h16",
  refresh: "M60 28V16l-8 8a22 22 0 1 0 8 20m-44 4v12l8-8"
};

export function ServiceCard({
  id,
  icon,
  title,
  description,
  detailLabel,
  details
}: ServiceCardProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const { interactiveStyle, glowHandlers } = useInteractiveGlow(1.2);
  const [isActive, setIsActive] = useState(false);

  const handleMove = (event: ReactMouseEvent<HTMLElement>) => {
    setIsActive(true);
    glowHandlers.onMouseMove(event);
  };

  const resetRotation = () => {
    setIsActive(false);
    glowHandlers.onMouseLeave();
  };

  return (
    <motion.article
      className={`service-card interactive-card group relative h-[24.5rem] overflow-hidden rounded-[1.7rem] p-6 sm:h-[25rem] sm:p-7 ${
        isActive ? "interactive-card--active" : ""
      }`}
      data-cursor="interactive"
      onMouseMove={handleMove}
      onMouseLeave={resetRotation}
      onBlur={resetRotation}
      style={{ ...interactiveStyle, transformStyle: "preserve-3d" }}
      animate={{ y: reduceMotion ? 0 : -2, scale: 1 }}
      whileHover={
        reduceMotion
          ? { y: -4 }
          : {
              y: -10,
              scale: 1.015
            }
      }
      whileTap={{ scale: 0.995 }}
      transition={{ type: "spring", stiffness: 180, damping: 20, mass: 0.8 }}
    >
      <div className="service-card__border absolute inset-0 rounded-[inherit]" />
      <div className="service-card__glow absolute inset-0 rounded-[inherit]" />
      <div className="service-card__highlight absolute inset-0 rounded-[inherit]" />
      <div className="service-card__mesh absolute right-[-12%] top-[-10%] h-36 w-36 rounded-full" />

      <div
        className="relative z-10 flex h-full flex-col"
        style={{ transform: reduceMotion ? undefined : "translateZ(24px)" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="service-card__icon relative flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.35rem] border border-cyan/25 bg-cyan/10 text-cyan shadow-[0_0_24px_rgba(0,229,255,0.14)]">
            <div className="absolute inset-[18%] rounded-[1rem] border border-white/10 bg-white/[0.03]" />
            <svg viewBox="0 0 80 80" fill="none" className="relative z-10 h-8 w-8" aria-hidden="true">
              <path
                d={iconMap[icon]}
                stroke="currentColor"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-cyan/70">
            {id}
          </div>
        </div>

        <h3 className="mt-6 max-w-[15rem] text-xl font-semibold leading-tight text-white sm:text-2xl">
          {title}
        </h3>
        <p className="mt-4 max-w-[17rem] text-sm leading-7 text-white/68 sm:text-[0.98rem]">
          {description}
        </p>

        <div className="mt-auto pt-6">
          <div className="text-[0.66rem] font-semibold uppercase tracking-[0.32em] text-white/34">
            Hover For More
          </div>
        </div>
      </div>

      <div className="service-card__overlay absolute inset-x-3 bottom-3 z-20 rounded-[1.35rem] p-5 sm:inset-x-4 sm:bottom-4">
        <div className="text-[0.66rem] font-semibold uppercase tracking-[0.32em] text-cyan/78">
          {detailLabel}
        </div>
        <div className="mt-4 grid gap-3">
          {details.map((detail) => (
            <div
              key={detail}
              className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-3 text-sm leading-6 text-white/74"
            >
              {detail}
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
