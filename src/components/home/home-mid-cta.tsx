"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { defaultHomeContent, type HomeContent } from "@/lib/home-content";

export function HomeMidCta({ content }: { content?: HomeContent["midCta"] }) {
  const c = content ?? defaultHomeContent.midCta;
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="spotlight-card relative overflow-hidden rounded-2xl border border-dashed border-orange-500/20 bg-gradient-to-r from-orange-500/[0.05] via-transparent to-rose-500/[0.05] px-6 py-12 sm:px-12"
    >
      <div className="noise-overlay rounded-2xl" />
      <div className="relative flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-start gap-5">
          <motion.span
            animate={reduce ? undefined : { rotate: [0, -6, 6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-rose-500/15 text-orange-500 shadow-lg shadow-orange-500/10"
          >
            <Calendar className="h-7 w-7" />
          </motion.span>
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">{c.title}</h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              {c.description}
            </p>
          </div>
        </div>
        <Button href={c.ctaHref} className="group shrink-0 px-8 py-3.5 text-base">
          {c.ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
}
