"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";
import {
  createRevealVariants,
  createStaggerContainer
} from "@/components/motion/system";

type StaggerGroupProps = PropsWithChildren<{
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
}>;

type StaggerItemProps = PropsWithChildren<{
  className?: string;
  y?: number;
}>;

export function StaggerGroup({
  children,
  className,
  staggerChildren = 0.08,
  delayChildren = 0
}: StaggerGroupProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.18 }}
      variants={
        reduceMotion ? undefined : createStaggerContainer(staggerChildren, delayChildren)
      }
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 24
}: StaggerItemProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      className={className}
      variants={reduceMotion ? undefined : createRevealVariants(y)}
    >
      {children}
    </motion.div>
  );
}
