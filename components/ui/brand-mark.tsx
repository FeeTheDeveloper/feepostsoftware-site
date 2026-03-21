"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type BrandMarkProps = {
  glowActive?: boolean;
};

export function BrandMark({ glowActive = true }: BrandMarkProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={
        reduceMotion
          ? { opacity: 1 }
          : {
              opacity: [0.86, 1, 0.88],
              scale: [1, 1.015, 1]
            }
      }
      className="relative isolate inline-flex flex-col items-center justify-center overflow-hidden rounded-[2.2rem] border border-white/12 bg-white/5 px-4 py-4 shadow-[0_0_80px_rgba(0,229,255,0.1)] backdrop-blur-xl sm:px-6 sm:py-6"
      transition={{ duration: 4.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.16),transparent_44%),radial-gradient(circle_at_70%_20%,rgba(255,0,170,0.14),transparent_26%)]" />
      <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      <div className="absolute inset-x-[6%] bottom-[6%] h-[18%] rounded-full bg-white/10 blur-2xl opacity-55" />
      <motion.div
        animate={
          reduceMotion || !glowActive
            ? { opacity: glowActive ? 0.72 : 0.2 }
            : { opacity: [0.28, 1, 0.34] }
        }
        className="absolute inset-0 rounded-[inherit] border border-cyan/20"
        transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        animate={
          reduceMotion || !glowActive
            ? { opacity: glowActive ? 0.5 : 0 }
            : { opacity: [0.14, 0.55, 0.18], scale: [0.98, 1.04, 1] }
        }
        className="absolute inset-[7%] rounded-[1.8rem] bg-[radial-gradient(circle,rgba(0,229,255,0.22),transparent_62%)] blur-3xl"
        transition={{ duration: 3.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="absolute inset-y-0 left-[-18%] w-[14%] bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-80 mix-blend-screen blur-md" />
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : glowActive
              ? { x: ["-24%", "520%"] }
              : { x: "-24%" }
        }
        className="absolute inset-y-0 left-[-18%] w-[14%] bg-gradient-to-r from-transparent via-cyan/80 to-transparent opacity-90 mix-blend-screen blur-md"
        transition={{
          duration: 1.25,
          ease: [0.16, 1, 0.3, 1],
          repeat: glowActive ? Number.POSITIVE_INFINITY : 0,
          repeatDelay: 2.75
        }}
      />

      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        className="relative z-10 w-full max-w-[72rem]"
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        <Image
          src="/logo.png"
          alt="Feepost Software logo"
          width={1024}
          height={1024}
          priority
          className={`h-auto w-full max-w-[40rem] transition-[filter,opacity] duration-700 ${
            glowActive
              ? "opacity-100 drop-shadow-[0_0_60px_rgba(0,229,255,0.28)]"
              : "opacity-92 drop-shadow-[0_0_18px_rgba(0,229,255,0.12)]"
          }`}
        />
      </motion.div>
    </motion.div>
  );
}
