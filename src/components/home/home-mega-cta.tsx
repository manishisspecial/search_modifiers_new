"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Clock, MessageSquare, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Magnetic } from "@/components/motion/magnetic";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/site";

/**
 * Signature closer: a giant kinetic CTA with a magnetic orb, orbiting
 * accent dots, scroll-linked parallax on the wordmark, and a big
 * gradient-pan "inevitable" word that echoes the hero headline —
 * narratively closing the loop.
 */
export function HomeMegaCta() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yHeadline = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const yTagline = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30]);

  return (
    <section ref={ref} className="relative overflow-hidden pb-24 pt-28 sm:pb-32 sm:pt-36">
      <div className="gradient-line absolute inset-x-0 top-0" />

      {/* Ambient gradient + orbital background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2">
          <div className="conic-ring absolute inset-0 rounded-full opacity-20 blur-2xl" />
        </div>
        <div className="aurora-a absolute -left-20 top-10 h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px]" />
        <div className="aurora-b absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-violet-500/15 blur-[100px]" />
        <div className="grid-overlay absolute inset-0 opacity-[0.2]" />
      </div>

      <Container className="relative">
        {/* ── Orb with magnetic button at center ── */}
        <div className="relative mx-auto w-full max-w-5xl text-center">
          <motion.div
            style={{ y: yHeadline }}
            className="font-display leading-[0.88] tracking-[-0.04em]"
          >
            <span className="block text-balance text-foreground/95">
              <MaskReveal
                as="span"
                text="Let's make your growth"
                className="mega-text block"
              />
            </span>
            <span className="mt-2 block">
              <span className="mega-text gradient-pan inline-block">
                inevitable.
              </span>
            </span>
          </motion.div>

          <motion.p
            style={{ y: yTagline }}
            className="mx-auto mt-8 max-w-xl text-base text-muted sm:text-lg"
          >
            Send us your site — we&apos;ll come back with prioritised opportunities,
            owners, and effort estimates in two business days. No decks.
          </motion.p>

          {/* Magnetic orb CTA */}
          <div className="relative mx-auto mt-12 flex justify-center">
            {/* Orbiting dots */}
            {!reduce ? (
              <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="absolute block h-[440px] w-[440px] rounded-full border border-dashed border-cyan-500/15" />
                <span className="absolute block h-[560px] w-[560px] rounded-full border border-dashed border-violet-500/10" />
                <span className="orbit-a absolute h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.8)]" />
                <span className="orbit-b absolute h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(192,132,252,0.8)]" />
                <span className="orbit-c absolute h-2.5 w-2.5 rounded-full bg-indigo-400 shadow-[0_0_14px_rgba(129,140,248,0.8)]" />
              </div>
            ) : null}

            <Magnetic strength={0.45} radius={220}>
              <Link
                href="/contact"
                data-cursor="view"
                data-cursor-label="Let's talk"
                className="group relative flex h-44 w-44 items-center justify-center rounded-full border border-cyan-400/30 bg-gradient-to-br from-cyan-400 via-indigo-500 to-violet-500 text-white shadow-[0_20px_60px_-15px_rgba(34,211,238,0.55)] transition-transform duration-500 hover:scale-[1.04] sm:h-52 sm:w-52"
              >
                {/* Pulsing ring */}
                <span
                  aria-hidden
                  className="pulse-ring absolute inset-0 rounded-full"
                />
                <span className="relative flex flex-col items-center gap-2">
                  <Sparkles className="h-5 w-5" aria-hidden />
                  <span className="text-base font-semibold leading-tight">
                    Start a<br />project
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 transition-transform duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-45"
                  />
                </span>
              </Link>
            </Magnetic>
          </div>

          {/* Supporting touchpoints */}
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            <ContactTile
              icon={<MessageSquare className="h-4 w-4" />}
              label="Email us"
              value={site.email}
              href={`mailto:${site.email}`}
            />
            <ContactTile
              icon={<Clock className="h-4 w-4" />}
              label="Response SLA"
              value="< 24 hours"
            />
            <ContactTile
              icon={<Sparkles className="h-4 w-4" />}
              label="Free intro call"
              value="20 minutes · no pitch"
              href="/contact"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactTile({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const body = (
    <div className="holo glass group flex items-center gap-3 rounded-2xl border border-border px-5 py-4 text-left transition-all duration-400 hover:-translate-y-0.5 hover:border-cyan-400/30">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/15 text-cyan-400">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted/70">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm font-medium text-foreground">
          {value}
        </p>
      </div>
      {href ? (
        <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted/70 transition-transform duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-400" />
      ) : null}
    </div>
  );
  return href ? <Link href={href}>{body}</Link> : body;
}
