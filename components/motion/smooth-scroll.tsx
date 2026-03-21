"use client";

import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { useEffect } from "react";

export function SmoothScroll() {
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false
    });

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return null;
}
