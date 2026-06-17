"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Container } from "@/components/ui/container";
import type { HomeContent } from "@/lib/home-content";

function parseMetricValue(value: string, prefix: string): { countTo: number; decimals: number } | null {
  let cleaned = value;
  if (prefix) cleaned = cleaned.replace(prefix, "");
  const match = cleaned.match(/^(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const num = parseFloat(match[1]);
  if (Number.isNaN(num)) return null;
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
  return { countTo: num, decimals };
}

export function HomeImpactRibbon({ content }: { content?: HomeContent["impactRibbon"] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const c = content ?? {
    eyebrow: "Impact at scale",
    title: "Numbers that move boardrooms — not vanity slides",
    description: "A snapshot across our 2022–2025 book of work. We track what compounds: margin, payback period, and retained attention.",
    metrics: [],
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);
  const gradientShift = useTransform(scrollYProgress, [0, 1], ["0% 50%", "100% 50%"]);

  return (
    <section ref={ref} className="relative py-20 sm:py-28">
      <div className="gradient-line absolute inset-x-0 top-0" />
      <Container>
        <motion.div
          style={{ y }}
          className="relative overflow-hidden rounded-[2rem] border border-border"
        >
          <motion.div
            aria-hidden
            style={{
              backgroundPosition: gradientShift,
            }}
            className="absolute inset-0 -z-10 bg-[length:220%_220%] bg-gradient-to-br from-orange-500/14 via-amber-500/10 to-rose-500/14"
          />
          <div className="glass absolute inset-0 -z-10" />
          <div className="noise-overlay" />

          <div className="relative px-6 py-12 sm:px-10 sm:py-16">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-400/90">
                {c.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl md:text-[2.6rem] md:leading-[1.1]">
                {c.title.includes("—") ? (
                  <>
                    {c.title.split("—")[0]}— <span className="gradient-text">{c.title.split("—").slice(1).join("—").trim()}</span>
                  </>
                ) : (
                  c.title
                )}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {c.description}
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {c.metrics.map((m, i) => {
                const parsed = parseMetricValue(m.value, m.prefix);
                return (
                  <motion.div
                    key={i}
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      delay: i * 0.08,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative"
                  >
                    <div className="flex items-baseline gap-1 font-display text-5xl font-extrabold tabular-nums leading-none tracking-[-0.02em] text-foreground sm:text-[3.4rem]">
                      {m.prefix ? (
                        <span className="text-orange-400/90">{m.prefix}</span>
                      ) : null}
                      {parsed ? (
                        <AnimatedCounter
                          value={m.value.replace(m.prefix ?? "", "")}
                          countTo={parsed.countTo}
                          suffix={m.suffix ?? ""}
                          decimals={parsed.decimals}
                        />
                      ) : (
                        <span>{m.value}</span>
                      )}
                    </div>
                    <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-foreground/90">
                      {m.label}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">
                      {m.caption}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
