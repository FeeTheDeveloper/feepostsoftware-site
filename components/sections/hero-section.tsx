"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/ui/brand-mark";
import { ActionLink } from "@/components/ui/action-link";

const ParticleField = dynamic(
  () => import("@/components/graphics/particle-field").then((mod) => mod.ParticleField),
  {
    ssr: false
  }
);

export function HeroSection() {
  const reduceMotion = useReducedMotion() ?? false;
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [particlesReady, setParticlesReady] = useState(reduceMotion);
  const [logoReady, setLogoReady] = useState(reduceMotion);
  const [glowReady, setGlowReady] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      setPointer({ x, y });
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const particleTimer = window.setTimeout(() => setParticlesReady(true), 260);
    const logoTimer = window.setTimeout(() => setLogoReady(true), 900);
    const glowTimer = window.setTimeout(() => setGlowReady(true), 1550);

    return () => {
      window.clearTimeout(particleTimer);
      window.clearTimeout(logoTimer);
      window.clearTimeout(glowTimer);
    };
  }, [reduceMotion]);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0">
        <motion.div
          animate={{ opacity: particlesReady ? 1 : 0 }}
          className="absolute inset-0 bg-hero-aurora"
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          animate={{ opacity: particlesReady ? 1 : 0 }}
          className="absolute inset-0"
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="grid-floor absolute inset-x-[-12%] bottom-[-28%] h-[56vh] opacity-35"
            style={
              reduceMotion
                ? undefined
                : {
                    transform: `perspective(900px) rotateX(82deg) scale(1.72) translate3d(${pointer.x * 16}px, ${pointer.y * -10}px, 0)`
                  }
            }
          />
          <motion.div
            animate={{
              opacity: particlesReady ? 0.95 : 0,
              scale: particlesReady ? 1 : 1.04
            }}
            className="absolute inset-0"
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <ParticleField intensity={1.1} parallaxX={pointer.x} parallaxY={pointer.y} />
          </motion.div>
          <div
            className="absolute inset-y-[8%] left-[-12%] w-[38vw] rounded-full bg-cyan/12 blur-3xl"
            style={
              reduceMotion
                ? undefined
                : { transform: `translate3d(${pointer.x * -26}px, ${pointer.y * -12}px, 0)` }
            }
          />
          <div
            className="absolute right-[-10%] top-[8%] h-[20rem] w-[20rem] rounded-full bg-magenta/14 blur-3xl sm:h-[28rem] sm:w-[28rem]"
            style={
              reduceMotion
                ? undefined
                : { transform: `translate3d(${pointer.x * 24}px, ${pointer.y * 14}px, 0)` }
            }
          />
          <div
            className="absolute inset-x-[12%] top-[18%] h-[26%] rounded-full bg-violet/10 blur-3xl"
            style={
              reduceMotion
                ? undefined
                : { transform: `translate3d(${pointer.x * 10}px, ${pointer.y * -8}px, 0)` }
            }
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.96),rgba(4,1,12,0.42)_18%,rgba(4,1,12,0.68)_72%,rgba(2,1,8,0.95)_100%)]" />
        <div className="absolute inset-x-[8%] top-[12%] h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent opacity-70" />
        <div className="absolute inset-x-[14%] bottom-[16%] h-[1px] bg-gradient-to-r from-transparent via-magenta/40 to-transparent opacity-60" />
      </div>

      <div className="shell relative z-10 flex flex-col items-center justify-center py-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: logoReady ? 1 : 0, y: logoReady ? 0 : 24 }}
          transition={{ duration: 0.9, delay: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow mx-auto">Classified Mission Technology Interface</span>
        </motion.div>

        <motion.div
          animate={{
            opacity: logoReady ? 1 : 0,
            scale: logoReady ? 1 : 0.9
          }}
          className="relative mt-8"
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.15, delay: reduceMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="absolute inset-[-10%] rounded-[2.8rem] bg-[radial-gradient(circle,rgba(0,229,255,0.22),transparent_52%)] blur-3xl"
            style={{ animation: glowReady ? "soft-pulse 5s ease-in-out infinite" : undefined }}
          />
          <div className="hero-logo-shell">
            <BrandMark glowActive={glowReady} />
          </div>
        </motion.div>

        <motion.h1
          className="mt-10 max-w-5xl text-balance text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: logoReady ? 1 : 0, y: logoReady ? 0 : 30 }}
          transition={{ duration: 0.9, delay: reduceMotion ? 0 : 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          Enter a classified technology environment engineered for secure, high-performance
          mission execution.
        </motion.h1>

        <motion.p
          className="mt-6 max-w-3xl text-pretty text-base leading-8 text-white/72 sm:text-lg"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: logoReady ? 1 : 0, y: logoReady ? 0 : 24 }}
          transition={{ duration: 0.9, delay: reduceMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          Feepost Software & Development Corporation delivers scalable software engineering,
          systems development, and digital infrastructure solutions for agencies and enterprises
          that expect precision, resilience, secure-by-design execution, and mission-first
          accountability.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: logoReady ? 1 : 0, y: logoReady ? 0 : 20 }}
          transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}
        >
          <ActionLink href="#contact">Initiate Engagement</ActionLink>
          <ActionLink href="#services" variant="secondary">
            Explore Services
          </ActionLink>
        </motion.div>

        <motion.div
          className="mt-14 grid w-full max-w-5xl gap-4 sm:grid-cols-3"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: glowReady ? 1 : 0, y: glowReady ? 0 : 24 }}
          transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          {[
            ["Mission-First", "Veteran-owned leadership anchored in operational clarity."],
            ["Secure Delivery", "Systems and workflows shaped for dependable execution."],
            ["Enterprise Scale", "Built to support modernization, integration, and growth."]
          ].map(([title, copy]) => (
            <div
              key={title}
              className="glass-panel rounded-[1.35rem] border border-white/10 px-5 py-5 text-left"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan/80">
                {title}
              </div>
              <div className="mt-3 text-sm leading-7 text-white/66">{copy}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
