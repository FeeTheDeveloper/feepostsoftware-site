"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { premiumEase, premiumEaseSoft } from "@/components/motion/system";

export function PageIntro() {
  const reduceMotion = useReducedMotion() ?? false;
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const particles = useMemo(
    () =>
      Array.from({ length: 42 }, (_, index) => ({
        id: index,
        x: (Math.random() - 0.5) * 280,
        y: (Math.random() - 0.5) * 220,
        delay: index * 0.018
      })),
    []
  );

  useEffect(() => {
    if (reduceMotion) {
      setProgress(100);
      setVisible(false);
      return;
    }

    let frame = 0;
    const start = window.performance.now();
    const duration = 1650;

    const tick = (time: number) => {
      const elapsed = time - start;
      const next = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(next);

      if (elapsed < duration) {
        frame = window.requestAnimationFrame(tick);
      } else {
        setVisible(false);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          animate={{ opacity: progress >= 100 ? 0 : 1 }}
          className="page-intro pointer-events-none fixed inset-0 z-[120] flex items-center justify-center overflow-hidden bg-[#010106]"
          exit={{ opacity: 0 }}
          initial={{ opacity: 1 }}
          transition={{ duration: 0.55, ease: premiumEaseSoft }}
        >
          <div className="page-intro__mesh" />
          <div className="page-intro__mesh page-intro__mesh--secondary" />

          <div className="relative flex flex-col items-center px-6">
            <div className="page-intro__logo-shell">
              {particles.map((particle) => (
                <motion.span
                  key={particle.id}
                  className="page-intro__particle"
                  initial={{
                    opacity: 0,
                    x: particle.x,
                    y: particle.y,
                    scale: 0.3
                  }}
                  animate={{
                    opacity: [0, 0.9, 0.18],
                    x: [particle.x, particle.x * 0.22, 0],
                    y: [particle.y, particle.y * 0.18, 0],
                    scale: [0.2, 1, 0.55]
                  }}
                  transition={{
                    duration: 1.55,
                    delay: particle.delay,
                    ease: premiumEaseSoft
                  }}
                />
              ))}

              <motion.div
                className="page-intro__logo-glow"
                animate={{ opacity: [0.24, 0.7, 0.28], scale: [0.88, 1.06, 1.12] }}
                transition={{ duration: 1.65, ease: premiumEaseSoft }}
              />

              <motion.div
                className="page-intro__logo-mark"
                initial={{ opacity: 0, scale: 0.78, filter: "blur(12px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.95, delay: 0.28, ease: premiumEase }}
              >
                <Image
                  src="/fs-mark.svg"
                  alt="Feepost FS mark"
                  width={320}
                  height={220}
                  priority
                  className="h-auto w-[10rem] sm:w-[12rem]"
                />
              </motion.div>
            </div>

            <motion.div
              className="page-intro__meta"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34, ease: premiumEase }}
            >
              <div className="page-intro__eyebrow">Initializing Feepost Interface</div>
              <div
                className="page-intro__progress"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                aria-label="Loading progress"
              >
                <motion.div
                  className="page-intro__progress-fill"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.22, ease: premiumEase }}
                />
              </div>
              <div className="page-intro__progress-label">
                <span>Digital infrastructure boot sequence</span>
                <span>{progress}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
