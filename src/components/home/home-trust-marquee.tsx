"use client";

import { motion, useReducedMotion } from "framer-motion";

const brands = [
  "Northwind Pay",
  "Lattice Analytics",
  "Maison Lumen",
  "UrbanFuel",
  "Helix Hospitals",
  "Vertex Labs",
  "Indus SaaS",
  "Clearwater Retail",
];

export function HomeTrustMarquee() {
  const reduce = useReducedMotion();

  return (
    <div className="relative overflow-hidden border-y border-border bg-background/80 py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#030712] to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#030712] to-transparent sm:w-32" />
      <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-muted/70">
        Trusted by growth teams at
      </p>
      <div className="overflow-hidden">
        <motion.div
          className="flex w-max"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={reduce ? undefined : { duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 gap-12 px-6 sm:gap-20 sm:px-10">
              {brands.map((name) => (
                <span
                  key={`${dup}-${name}`}
                  className="whitespace-nowrap font-display text-sm font-medium text-muted/70 transition-colors duration-300 hover:text-foreground/80 sm:text-base"
                >
                  {name}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
