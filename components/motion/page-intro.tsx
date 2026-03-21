"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function PageIntro() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduceMotion) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(() => setVisible(false), 1450);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          animate={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[120] flex items-center justify-center bg-[#010106]"
          exit={{ opacity: 0 }}
          initial={{ opacity: 1 }}
          transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={{
              opacity: [0.42, 1, 0.4],
              scale: [0.88, 1.04, 1.12]
            }}
            className="h-52 w-52 rounded-full bg-cyan/20 blur-3xl"
            transition={{ duration: 1.35, ease: "easeInOut" }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
