"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

const logos: { name: string; svg: React.ReactNode }[] = [
  {
    name: "Northwind Pay",
    svg: (
      <svg viewBox="0 0 140 32" fill="none" className="h-7 w-auto"><path d="M4 26V6l12 20V6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><text x="24" y="22" fill="currentColor" fontSize="13" fontWeight="600" fontFamily="system-ui">Northwind</text></svg>
    ),
  },
  {
    name: "Lattice Analytics",
    svg: (
      <svg viewBox="0 0 160 32" fill="none" className="h-7 w-auto"><rect x="2" y="8" width="6" height="18" rx="1.5" fill="currentColor" opacity=".5"/><rect x="10" y="4" width="6" height="22" rx="1.5" fill="currentColor" opacity=".7"/><rect x="18" y="12" width="6" height="14" rx="1.5" fill="currentColor" opacity=".9"/><text x="30" y="22" fill="currentColor" fontSize="13" fontWeight="600" fontFamily="system-ui">Lattice</text></svg>
    ),
  },
  {
    name: "Maison Lumen",
    svg: (
      <svg viewBox="0 0 150 32" fill="none" className="h-7 w-auto"><circle cx="12" cy="16" r="9" stroke="currentColor" strokeWidth="2"/><path d="M12 10v6l4 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><text x="28" y="22" fill="currentColor" fontSize="13" fontWeight="600" fontFamily="system-ui">Maison</text></svg>
    ),
  },
  {
    name: "UrbanFuel",
    svg: (
      <svg viewBox="0 0 140 32" fill="none" className="h-7 w-auto"><path d="M6 6v14a6 6 0 0012 0V6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><text x="26" y="22" fill="currentColor" fontSize="13" fontWeight="600" fontFamily="system-ui">UrbanFuel</text></svg>
    ),
  },
  {
    name: "Helix Hospitals",
    svg: (
      <svg viewBox="0 0 160 32" fill="none" className="h-7 w-auto"><path d="M4 8c4 0 4 8 8 8s4-8 8-8 4 8 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M4 16c4 0 4 8 8 8s4-8 8-8 4 8 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".5"/><text x="36" y="22" fill="currentColor" fontSize="13" fontWeight="600" fontFamily="system-ui">Helix</text></svg>
    ),
  },
  {
    name: "Vertex Labs",
    svg: (
      <svg viewBox="0 0 140 32" fill="none" className="h-7 w-auto"><path d="M4 6l8 20L20 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><text x="26" y="22" fill="currentColor" fontSize="13" fontWeight="600" fontFamily="system-ui">Vertex</text></svg>
    ),
  },
  {
    name: "Indus SaaS",
    svg: (
      <svg viewBox="0 0 140 32" fill="none" className="h-7 w-auto"><rect x="3" y="6" width="18" height="20" rx="4" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="16" r="3" fill="currentColor"/><text x="28" y="22" fill="currentColor" fontSize="13" fontWeight="600" fontFamily="system-ui">Indus</text></svg>
    ),
  },
  {
    name: "Clearwater",
    svg: (
      <svg viewBox="0 0 150 32" fill="none" className="h-7 w-auto"><path d="M6 20c3-8 6-8 9 0s6 0 9-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/><text x="30" y="22" fill="currentColor" fontSize="13" fontWeight="600" fontFamily="system-ui">Clearwater</text></svg>
    ),
  },
];

export function HomeLogoWall() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : 0.06 },
    },
  };

  const item = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <section className="relative overflow-hidden border-y border-border bg-background/70 py-14 sm:py-16">
      <div className="noise-overlay" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#030712] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#030712] to-transparent sm:w-24" />

      <p className="relative mb-10 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-muted/70">
        Trusted by growth teams at
      </p>

      <motion.div
        className="relative mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-8 px-6 sm:grid-cols-4 sm:gap-x-10 sm:gap-y-10 sm:px-10"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
      >
        {logos.map((logo) => (
          <motion.div
            key={logo.name}
            variants={item}
            className={cn(
              "group relative flex items-center justify-center rounded-xl px-4 py-5 transition-all duration-500",
              "text-muted/60 hover:text-foreground/90"
            )}
          >
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/0 to-violet-500/0 opacity-0 transition-opacity duration-500 group-hover:from-cyan-500/[0.08] group-hover:to-violet-500/[0.04] group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-0 rounded-xl border border-white/0 transition-all duration-500 group-hover:border-white/[0.08] group-hover:shadow-[0_0_24px_-8px_rgba(34,211,238,0.15)]" />
            <div className="relative transition-transform duration-500 group-hover:scale-105">
              {logo.svg}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
