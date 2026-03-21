"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";
import {
  createRevealVariants,
  sectionRevealTransition
} from "@/components/motion/system";

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  y?: number;
}>;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 30
}: RevealProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const variants = createRevealVariants(y);

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1 } : "hidden"}
      variants={reduceMotion ? undefined : variants}
      transition={{ ...sectionRevealTransition, delay }}
      viewport={{ once: true, amount: 0.2 }}
      whileInView={reduceMotion ? { opacity: 1 } : "visible"}
    >
      {children}
    </motion.div>
  );
}
