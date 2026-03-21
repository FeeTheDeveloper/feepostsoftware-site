import type { Transition, Variants } from "framer-motion";

export const premiumEase = [0.22, 1, 0.36, 1] as const;
export const premiumEaseSoft = [0.16, 1, 0.3, 1] as const;

export const sectionRevealTransition: Transition = {
  duration: 0.9,
  ease: premiumEase
};

export function createRevealVariants(y = 30): Variants {
  return {
    hidden: {
      opacity: 0,
      y,
      scale: 0.975,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: sectionRevealTransition
    }
  };
}

export function createStaggerContainer(
  staggerChildren = 0.08,
  delayChildren = 0
): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren,
        ease: premiumEase
      }
    }
  };
}

export function createFloatTransition(
  duration = 6.8,
  repeatDelay = 0
): Transition {
  return {
    duration,
    repeat: Number.POSITIVE_INFINITY,
    repeatDelay,
    ease: premiumEaseSoft
  };
}
