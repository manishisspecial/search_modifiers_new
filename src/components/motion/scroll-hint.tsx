"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Minimalist "Scroll" indicator for the bottom of the hero.
 * Vertical ghost-line with a traveling cyan dot + a small label.
 */
export function ScrollHint({ label = "Scroll" }: { label?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 select-none flex-col items-center gap-3 lg:flex"
      aria-hidden
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted/70">
        {label}
      </span>
      <span className="relative block h-14 w-px overflow-hidden bg-gradient-to-b from-transparent via-muted/50 to-transparent">
        <motion.span
          animate={reduce ? undefined : { y: [-20, 56] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-1/2 h-3 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-orange-300 to-orange-500 shadow-[0_0_10px_rgba(251, 146, 60,0.6)]"
        />
      </span>
    </motion.div>
  );
}
