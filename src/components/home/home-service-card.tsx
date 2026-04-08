"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function HomeServiceCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="h-full"
    >
      <Link
        href={href}
        className="spotlight-card group glass relative block h-full overflow-hidden rounded-2xl border border-border p-7 transition-all duration-500"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-cyan-500/12 to-transparent opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />
        <div className="relative flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-cyan-500">
            {title}
          </h3>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface-hover text-muted/70 transition-all duration-400 group-hover:border-cyan-500/25 group-hover:bg-cyan-500/10 group-hover:text-cyan-500 group-hover:shadow-lg group-hover:shadow-cyan-500/10">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
        <p className="relative mt-3.5 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground/80">
          {description}
        </p>
      </Link>
    </motion.div>
  );
}
