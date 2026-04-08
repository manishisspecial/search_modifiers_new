"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section className={cn("relative overflow-hidden pb-20 pt-12 sm:pb-24 sm:pt-16", className)}>
      <div className="pointer-events-none absolute inset-0">
        <div className="grid-overlay absolute inset-0 opacity-30" />
        <div className="noise-overlay" />
        <div className="absolute left-1/4 top-0 h-[300px] w-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute right-1/4 top-1/3 h-[250px] w-[350px] rounded-full bg-violet-500/8 blur-[90px]" />
      </div>
      <Container className="relative">
        {eyebrow ? (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/90"
          >
            {eyebrow}
          </motion.p>
        ) : null}
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-display text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl md:text-6xl md:leading-[1.05]"
        >
          {title}
        </motion.h1>
        {description ? (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
          >
            {description}
          </motion.p>
        ) : null}
        {children ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            {children}
          </motion.div>
        ) : null}
      </Container>
      <div className="gradient-line absolute inset-x-0 bottom-0" />
    </section>
  );
}
