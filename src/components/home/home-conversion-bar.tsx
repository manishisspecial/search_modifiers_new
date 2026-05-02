"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, FileSearch, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";

const items = [
  { icon: FileSearch, text: "Free ORM + SEO Audit Report" },
  { icon: Calendar, text: "Strategy call in 48 hours" },
  { icon: Phone, text: "Connect Experts - Not Sales Team" },
];

export function HomeConversionBar() {
  const reduce = useReducedMotion();

  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/8 to-rose-500/10 blur-xl" />
      <div className="glass gradient-border relative overflow-hidden rounded-3xl border border-orange-500/[0.12] px-6 py-10 sm:px-12 sm:py-12">
        <div className="noise-overlay rounded-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-400/90">Start with clarity</p>
            <h2 className="mt-4 max-w-xl font-display text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl">
              Get a prioritized growth roadmap — before you sign anything
            </h2>
            <ul className="mt-8 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-4">
              {items.map(({ icon: Icon, text }) => (
                <li key={text} className="group flex items-center gap-3 text-sm text-foreground/80">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-hover text-orange-400 transition-all duration-300 group-hover:bg-orange-500/15 group-hover:shadow-lg group-hover:shadow-orange-500/10">
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3.5 sm:flex-row lg:flex-col lg:items-stretch">
            <Button href="/free-website-audit" className="group justify-center px-8 py-3.5 text-base shadow-xl shadow-orange-500/20">
              Get free website audit
              <ArrowRight className="cta-arrow-nudge h-4 w-4 shrink-0" />
            </Button>
            <Button href="/request-quote" variant="secondary" className="justify-center px-8 py-3.5 text-base">
              Request a quote
            </Button>
            <Link
              href={`tel:${site.phoneTel}`}
              className="text-center text-sm text-muted/70 transition-colors duration-300 hover:text-orange-400 lg:text-left"
            >
              Or call <span className="font-medium text-muted">{site.phone}</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
