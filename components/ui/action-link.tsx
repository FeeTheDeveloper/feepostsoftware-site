"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { useState } from "react";

type ActionLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  pulse?: boolean;
};

type Ripple = {
  id: number;
  x: number;
  y: number;
  size: number;
};

type InteractiveButtonStyle = CSSProperties & {
  "--pointer-x"?: string;
  "--pointer-y"?: string;
};

export function ActionLink({
  href,
  children,
  variant = "primary",
  className = "",
  pulse = false
}: ActionLinkProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [pointerStyle, setPointerStyle] = useState<InteractiveButtonStyle>({
    "--pointer-x": "50%",
    "--pointer-y": "50%"
  });

  const handleMove = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    setPointerStyle({
      "--pointer-x": `${(x / bounds.width) * 100}%`,
      "--pointer-y": `${(y / bounds.height) * 100}%`
    });

    if (reduceMotion) {
      return;
    }

    setOffset({
      x: (x - centerX) * 0.12,
      y: (y - centerY) * 0.12
    });
  };

  const resetOffset = () => {
    setOffset({ x: 0, y: 0 });
    setPointerStyle({
      "--pointer-x": "50%",
      "--pointer-y": "50%"
    });
  };

  const handleClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const size = Math.max(bounds.width, bounds.height) * 1.25;
    const ripple = {
      id: Date.now(),
      x: event.clientX - bounds.left - size / 2,
      y: event.clientY - bounds.top - size / 2,
      size
    };

    setRipples((prev) => [...prev, ripple]);

    window.setTimeout(() => {
      setRipples((prev) => prev.filter((item) => item.id !== ripple.id));
    }, 650);
  };

  const shared =
    "action-link motion-border-pulse motion-sweep-surface inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] transition-colors";
  const variants = {
    primary:
      "border border-cyan/40 bg-cyan/12 text-white shadow-cyan backdrop-blur hover:bg-cyan/18",
    secondary:
      "border border-white/12 bg-white/5 text-white/80 backdrop-blur hover:border-magenta/35 hover:text-white"
  };

  return (
    <motion.a
      className={`${shared} ${variants[variant]} ${pulse ? "cta-button-pulse" : ""} ${className}`}
      data-cursor="interactive"
      data-magnetic="true"
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={resetOffset}
      onBlur={resetOffset}
      onClick={handleClick}
      style={{
        ...pointerStyle,
        x: offset.x,
        y: offset.y
      }}
      whileHover={{ y: reduceMotion ? 0 : -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="action-link__glow" />
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="action-link__ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size
          }}
        />
      ))}
      <span className="relative z-10">{children}</span>
      <span aria-hidden="true" className="relative z-10 text-base leading-none text-cyan">
        {">"}
      </span>
    </motion.a>
  );
}
