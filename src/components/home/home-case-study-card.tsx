"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/case-studies";

export function HomeCaseStudyCard({ c }: { c: CaseStudy }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="glass group relative h-full overflow-hidden rounded-2xl border border-border p-8 transition-shadow duration-500 hover:border-cyan-500/15 hover:shadow-xl hover:shadow-cyan-500/5"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      <p className="relative text-xs font-semibold uppercase tracking-wider text-cyan-400/90">{c.industry}</p>
      <h3 className="relative mt-3 font-display text-xl font-semibold text-foreground sm:text-2xl">{c.title}</h3>
      <p className="relative mt-3 text-sm leading-relaxed text-muted">{c.summary}</p>
      <p className="relative mt-4 text-lg font-semibold text-emerald-400">{c.result}</p>
      <ul className="relative mt-6 flex flex-wrap gap-3">
        {c.metrics.map((m) => (
          <li
            key={m.label}
            className="rounded-lg border border-border bg-card px-3 py-2 text-xs backdrop-blur-sm transition-colors duration-300 group-hover:border-white/15"
          >
            <span className="text-muted/70">{m.label}</span>{" "}
            <span className="font-semibold text-foreground">{m.value}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/case-studies"
        className="relative mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 transition hover:gap-2 hover:text-cyan-500"
      >
        See how we did it <ArrowUpRight className="h-4 w-4" />
      </Link>
    </motion.article>
  );
}
