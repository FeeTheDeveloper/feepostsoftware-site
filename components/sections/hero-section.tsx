"use client";

import dynamic from "next/dynamic";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  createFloatTransition,
  premiumEase,
  premiumEaseSoft
} from "@/components/motion/system";
import { ActionLink } from "@/components/ui/action-link";
import { companyStatement } from "@/lib/content";

const NetworkScene = dynamic(
  () => import("@/components/graphics/network-scene").then((mod) => mod.NetworkScene),
  { ssr: false }
);

const tagline = "Veteran-Owned Software Engineering & Digital Infrastructure Solutions";

export function HeroSection() {
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroInView = useInView(sectionRef, { amount: 0.45 });
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [backgroundReady, setBackgroundReady] = useState(reduceMotion);
  const [logoReady, setLogoReady] = useState(reduceMotion);
  const [taglineReady, setTaglineReady] = useState(reduceMotion);
  const [typedTagline, setTypedTagline] = useState(reduceMotion ? tagline : "");

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

    const backgroundTimer = window.setTimeout(() => setBackgroundReady(true), 280);
    const logoTimer = window.setTimeout(() => setLogoReady(true), 1180);
    const taglineTimer = window.setTimeout(() => setTaglineReady(true), 1780);

    return () => {
      window.clearTimeout(backgroundTimer);
      window.clearTimeout(logoTimer);
      window.clearTimeout(taglineTimer);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!taglineReady) {
      return;
    }

    if (reduceMotion) {
      setTypedTagline(tagline);
      return;
    }

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setTypedTagline(tagline.slice(0, index));

      if (index >= tagline.length) {
        window.clearInterval(interval);
      }
    }, 28);

    return () => window.clearInterval(interval);
  }, [reduceMotion, taglineReady]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 z-30 bg-black"
        animate={{ opacity: backgroundReady ? 0 : 1 }}
        transition={{ duration: 1.1, ease: premiumEaseSoft }}
      />

      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-hero-aurora"
          animate={{ opacity: backgroundReady ? 1 : 0 }}
          transition={{ duration: 1.25, ease: premiumEaseSoft }}
        />
        <div
          className="absolute inset-y-[-10%] left-[-12%] w-[42vw] rounded-full bg-cyan/10 blur-3xl"
          style={
            reduceMotion
              ? undefined
              : { transform: `translate3d(${pointer.x * -18}px, ${pointer.y * -10}px, 0)` }
          }
        />
        <div
          className="absolute right-[-10%] top-[8%] h-[24rem] w-[24rem] rounded-full bg-magenta/12 blur-3xl"
          style={
            reduceMotion
              ? undefined
              : { transform: `translate3d(${pointer.x * 20}px, ${pointer.y * 12}px, 0)` }
          }
        />
        <div
          className="absolute inset-x-[12%] top-[14%] h-[24%] rounded-full bg-violet/10 blur-3xl"
          style={
            reduceMotion
              ? undefined
              : { transform: `translate3d(${pointer.x * 8}px, ${pointer.y * -6}px, 0)` }
          }
        />
        <div className="scanlines" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.82),rgba(3,1,8,0.18)_20%,rgba(4,1,12,0.38)_55%,rgba(1,1,7,0.94)_100%)]" />
      </div>

      <motion.div
        className="absolute inset-0"
        animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
        transition={{
          ...createFloatTransition(8)
        }}
      >
        <NetworkScene
          pointerX={pointer.x}
          pointerY={pointer.y}
          backgroundReveal={backgroundReady ? 1 : 0}
          logoReveal={logoReady ? 1 : 0}
          logoGlowBoost={heroInView ? 1 : 0.42}
        />
      </motion.div>

      <div className="shell relative z-20 flex min-h-screen items-center justify-center py-28">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: backgroundReady ? 1 : 0, y: backgroundReady ? 0 : 18 }}
            transition={{
              duration: 0.75,
              delay: reduceMotion ? 0 : 0.5,
              ease: premiumEase
            }}
          >
            <span className="eyebrow motion-border-pulse mx-auto">
              Feepost Software &amp; Development Corporation
            </span>
          </motion.div>

          <motion.div
            className="relative mx-auto mt-8 max-w-4xl"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{
              opacity: taglineReady ? 1 : 0,
              scale: taglineReady ? 1 : 0.96
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 18,
              delay: reduceMotion ? 0 : 0.12
            }}
          >
            <motion.div
              className="hero-light-sweep pointer-events-none absolute inset-y-[-16%] left-[-20%] w-[18%]"
              animate={
                logoReady
                  ? { x: ["0%", "700%"], opacity: [0, 0.9, 0] }
                  : { x: "0%", opacity: 0 }
              }
              transition={{
                duration: 1.2,
                ease: premiumEaseSoft,
                delay: reduceMotion ? 0 : 0.08
              }}
            />
            <h1 className="hero-tagline text-balance text-4xl font-medium leading-[1.02] text-white sm:text-5xl lg:text-[5rem]">
              <span className="hero-neon-text motion-sweep-text">{typedTagline}</span>
              {typedTagline.length < tagline.length ? (
                <span className="hero-type-caret" aria-hidden="true">
                  |
                </span>
              ) : null}
            </h1>
          </motion.div>

          <motion.p
            className="mx-auto mt-7 max-w-3xl text-pretty text-base leading-8 text-white/70 sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: taglineReady ? 1 : 0, y: taglineReady ? 0 : 18 }}
            transition={{
              duration: 0.8,
              delay: reduceMotion ? 0 : 0.28,
              ease: premiumEase
            }}
          >
            {companyStatement} Mission-driven delivery across custom software, systems
            integration, cloud infrastructure, secure workflows, and modernization programs.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: taglineReady ? 1 : 0, y: taglineReady ? 0 : 16 }}
            transition={{
              duration: 0.8,
              delay: reduceMotion ? 0 : 0.42,
              ease: premiumEase
            }}
          >
            <ActionLink href="#contact">Start A Capability Brief</ActionLink>
            <ActionLink href="#services" variant="secondary">
              View Service Stack
            </ActionLink>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        className="hero-scroll-cue absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-white/68"
        animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{
          duration: 2.2,
          ...createFloatTransition(2.2)
        }}
      >
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-cyan/78">
          Scroll
        </span>
        <span className="flex flex-col items-center">
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              d="M6 8.5 12 14.5 18 8.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg viewBox="0 0 24 24" className="-mt-2 h-5 w-5 opacity-70" aria-hidden="true">
            <path
              d="M6 8.5 12 14.5 18 8.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </motion.a>
    </section>
  );
}
