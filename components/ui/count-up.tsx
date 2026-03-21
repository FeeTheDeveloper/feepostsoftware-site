"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
};

export function CountUp({
  value,
  suffix = "",
  durationMs = 1400,
  className = ""
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion() ?? false;
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    if (reduceMotion) {
      setDisplayValue(value);
      return;
    }

    const startedAt = performance.now();

    const update = (timestamp: number) => {
      const progress = Math.min((timestamp - startedAt) / durationMs, 1);
      setDisplayValue(Math.round(value * progress));

      if (progress < 1) {
        window.requestAnimationFrame(update);
      }
    };

    const frame = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(frame);
  }, [durationMs, isInView, reduceMotion, value]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
      {suffix}
    </span>
  );
}
