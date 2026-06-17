"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Clock, MessageSquare, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Magnetic } from "@/components/motion/magnetic";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { Container } from "@/components/ui/container";
import { useSite } from "@/lib/site-context";
import type { HomeContent } from "@/lib/home-content";

const TILE_ICONS = [
  <MessageSquare key="msg" className="h-4 w-4" />,
  <Clock key="clk" className="h-4 w-4" />,
  <Sparkles key="spk" className="h-4 w-4" />,
];

export function HomeMegaCta({ content }: { content?: HomeContent["megaCta"] }) {
  const site = useSite();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const c = content ?? {
    headlineTop: "Let's make your growth",
    headlineAccent: "inevitable.",
    subtitle:
      "Send us your site — we'll come back with prioritised opportunities, owners, and effort estimates in two business days. No decks.",
    orbLabel: "Start a project",
    orbHref: "/contact",
    contactTiles: [
      { label: "Email us", value: "", href: "" },
      { label: "Response SLA", value: "< 24 hours", href: "" },
      { label: "Free intro call", value: "20 minutes · no pitch", href: "/contact" },
    ],
  };

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yHeadline = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const yTagline = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30]);

  const orbLines = c.orbLabel.includes(" ")
    ? [c.orbLabel.split(" ").slice(0, Math.ceil(c.orbLabel.split(" ").length / 2)).join(" "), c.orbLabel.split(" ").slice(Math.ceil(c.orbLabel.split(" ").length / 2)).join(" ")]
    : [c.orbLabel];

  return (
    <section ref={ref} className="relative overflow-hidden pb-24 pt-28 sm:pb-32 sm:pt-36">
      <div className="gradient-line absolute inset-x-0 top-0" />

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2">
          <div className="conic-ring absolute inset-0 rounded-full opacity-20 blur-2xl" />
        </div>
        <div className="aurora-a absolute -left-20 top-10 h-80 w-80 rounded-full bg-orange-500/15 blur-[100px]" />
        <div className="aurora-b absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-rose-500/15 blur-[100px]" />
        <div className="grid-overlay absolute inset-0 opacity-[0.2]" />
      </div>

      <Container className="relative">
        <div className="relative mx-auto w-full max-w-5xl text-center">
          <motion.div
            style={{ y: yHeadline }}
            className="font-display leading-[0.88] tracking-[-0.04em]"
          >
            <span className="block text-balance text-foreground/95">
              <MaskReveal
                as="span"
                text={c.headlineTop}
                className="mega-text block"
              />
            </span>
            <span className="mt-2 block">
              <span className="mega-text gradient-pan inline-block">
                {c.headlineAccent}
              </span>
            </span>
          </motion.div>

          <motion.p
            style={{ y: yTagline }}
            className="mx-auto mt-8 max-w-xl text-base text-muted sm:text-lg"
          >
            {c.subtitle}
          </motion.p>

          <div className="relative mx-auto mt-12 flex justify-center">
            {!reduce ? (
              <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="absolute block h-[440px] w-[440px] rounded-full border border-dashed border-orange-500/15" />
                <span className="absolute block h-[560px] w-[560px] rounded-full border border-dashed border-rose-500/10" />
                <span className="orbit-a absolute h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_14px_rgba(251, 146, 60,0.8)]" />
                <span className="orbit-b absolute h-1.5 w-1.5 rounded-full bg-rose-400 shadow-[0_0_12px_rgba(251, 113, 133,0.8)]" />
                <span className="orbit-c absolute h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_14px_rgba(251, 191, 36,0.8)]" />
              </div>
            ) : null}

            <Magnetic strength={0.45} radius={220}>
              <Link
                href={c.orbHref}
                data-cursor="view"
                data-cursor-label="Let's talk"
                className="group relative flex h-44 w-44 items-center justify-center rounded-full border border-orange-400/30 bg-gradient-to-br from-orange-400 via-amber-500 to-rose-500 text-white shadow-[0_20px_60px_-15px_rgba(251, 146, 60,0.55)] transition-transform duration-500 hover:scale-[1.04] sm:h-52 sm:w-52"
              >
                <span
                  aria-hidden
                  className="pulse-ring absolute inset-0 rounded-full"
                />
                <span className="relative flex flex-col items-center gap-2">
                  <Sparkles className="h-5 w-5" aria-hidden />
                  <span className="text-base font-semibold leading-tight">
                    {orbLines.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < orbLines.length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 transition-transform duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-45"
                  />
                </span>
              </Link>
            </Magnetic>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {c.contactTiles.map((tile, i) => {
              const displayValue = tile.value || (i === 0 ? site.email : tile.value);
              const tileHref = tile.href || (i === 0 ? `mailto:${site.email}` : undefined);
              return (
                <ContactTile
                  key={i}
                  icon={TILE_ICONS[i % TILE_ICONS.length]}
                  label={tile.label}
                  value={displayValue}
                  href={tileHref}
                />
              );
            })}
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
    <div className="holo glass group flex items-center gap-3 rounded-2xl border border-border px-5 py-4 text-left transition-all duration-400 hover:-translate-y-0.5 hover:border-orange-400/30">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-rose-500/15 text-orange-400">
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
        <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted/70 transition-transform duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-400" />
      ) : null}
    </div>
  );
  return href ? <Link href={href}>{body}</Link> : body;
}
