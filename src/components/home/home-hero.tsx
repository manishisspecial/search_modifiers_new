"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Phone, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { site } from "@/lib/site";

const headline = ["Growth", "marketing", "that", "feels"];
const headlineAccent = "inevitable";
const headlineEnd = ["—", "not", "improvised"];

type HeroStat =
  | { value: string; label: string; countTo: number; suffix?: string; decimals?: number }
  | { value: string; label: string };

const stats: HeroStat[] = [
  { value: "14+", countTo: 14, suffix: "+", label: "Years collective exp." },
  { value: "320+", countTo: 320, suffix: "+", label: "Campaigns shipped" },
  { value: "4.9", countTo: 4.9, suffix: "", label: "Avg. client rating", decimals: 1 },
  { value: "24h", label: "First response SLA" },
];

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[min(92vh,880px)] overflow-hidden pb-16 pt-6 sm:pb-24 sm:pt-10">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-[15%] top-[12%] h-[380px] w-[380px] rounded-full bg-cyan-500/12 blur-[100px]"
          initial={{ opacity: 0 }}
          animate={reduce ? { opacity: 0.35 } : { scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
          transition={reduce ? { duration: 0.6 } : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[5%] top-[20%] h-[320px] w-[320px] rounded-full bg-violet-500/10 blur-[90px]"
          initial={{ opacity: 0 }}
          animate={reduce ? { opacity: 0.3 } : { scale: [1.05, 1, 1.05], opacity: [0.3, 0.45, 0.3] }}
          transition={reduce ? { duration: 0.6 } : { duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[5%] left-1/2 h-[280px] w-[min(90%,600px)] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[80px]"
          initial={{ opacity: 0 }}
          animate={reduce ? { opacity: 0.3 } : { y: [0, -20, 0], opacity: [0.3, 0.4, 0.3] }}
          transition={reduce ? { duration: 0.6 } : { duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="grid-overlay absolute inset-0 opacity-[0.22]" />
        <div className="noise-overlay" />
      </div>

      <Container className="relative flex min-h-[inherit] flex-col justify-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="shimmer-border inline-flex w-fit items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/[0.08] px-4 py-2 text-xs font-medium text-foreground/80 shadow-lg shadow-cyan-500/5 backdrop-blur-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
          <span className="tracking-wide">Delhi NCR · Remote-first · Global campaigns</span>
        </motion.div>

        <h1 className="mt-8 max-w-[900px] font-display text-[2.35rem] font-bold leading-[1.06] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl lg:text-[3.65rem]">
          <span className="flex flex-wrap gap-x-2.5 gap-y-1 sm:gap-x-3">
            {headline.map((word, i) => (
              <motion.span
                key={word}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 + i * 0.045, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.32, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="gradient-text inline-block"
            >
              {headlineAccent}
            </motion.span>
            {headlineEnd.map((word, i) => (
              <motion.span
                key={word + i}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 + i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block text-foreground"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
        >
          {site.description}
        </motion.p>

        <motion.ul
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.45 }}
          className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-x-8"
        >
          {["No long-term lock-ins on pilots", "Named strategists on every account", "SLA-backed response times"].map(
            (line, i) => (
              <motion.li
                key={line}
                initial={reduce ? false : { opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.58 + i * 0.06, duration: 0.45 }}
                className="flex items-center gap-2 text-sm text-muted"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500/90" />
                {line}
              </motion.li>
            )
          )}
        </motion.ul>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <motion.div whileHover={reduce ? undefined : { scale: 1.02 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
            <Button href="/request-quote" className="group min-h-[48px] px-8 py-3 text-base shadow-xl shadow-cyan-500/20">
              Get a custom proposal
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>
          <motion.div whileHover={reduce ? undefined : { scale: 1.02 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
            <Button href="/free-website-audit" variant="outline" className="min-h-[48px] px-8 py-3 text-base">
              Free website audit
            </Button>
          </motion.div>
          <Link
            href={`tel:${site.phoneTel}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-cyan-500"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-hover">
              <Phone className="h-4 w-4 text-cyan-400" />
            </span>
            {site.phone}
            <span className="text-xs font-normal text-muted/60">· 24h callback</span>
          </Link>
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="mt-3 text-xs text-muted/60"
        >
          Typical first response within one business day. Audit deliverables in ~2 business days after kickoff.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.78 + i * 0.06, duration: 0.5 }}
              className="glass group relative overflow-hidden rounded-2xl px-4 py-5 text-center transition-shadow duration-500 hover:shadow-lg hover:shadow-cyan-500/5 sm:text-left"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 opacity-0 transition-opacity duration-500 group-hover:from-cyan-500/[0.06] group-hover:to-transparent group-hover:opacity-100" />
              <p className="relative font-display text-2xl font-bold tabular-nums text-foreground sm:text-3xl">
                {"countTo" in s ? (
                  <AnimatedCounter
                    value={s.value}
                    countTo={s.countTo}
                    suffix={s.suffix ?? ""}
                    decimals={s.decimals ?? 0}
                  />
                ) : (
                  s.value
                )}
              </p>
              <p className="relative mt-1.5 text-[11px] leading-snug text-muted/70 sm:text-xs">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
