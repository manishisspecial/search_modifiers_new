"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Compass,
  FlaskConical,
  Rocket,
  LineChart as LineChartIcon,
  Repeat,
} from "lucide-react";
import { useRef } from "react";
import { AnimatedSectionHeading } from "@/components/home/animated-section-heading";
import { Container } from "@/components/ui/container";

type Step = {
  step: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: React.ComponentType<{ className?: string }>;
  hue: string;
};

const STEPS: Step[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "Commercial audit, analytics cleanup, and competitive teardown — so decisions rest on evidence, not lore.",
    deliverables: ["Attribution gap map", "SERP + paid landscape", "CRO opportunity list"],
    icon: Compass,
    hue: "from-cyan-400/30 via-cyan-500/10 to-transparent text-cyan-400",
  },
  {
    step: "02",
    title: "Architect",
    description:
      "We design the engine — channel mix, measurement stack, content architecture, and experimentation cadence.",
    deliverables: ["90-day growth plan", "MMM + test design", "Content & keyword blueprint"],
    icon: FlaskConical,
    hue: "from-indigo-400/30 via-violet-500/10 to-transparent text-indigo-400",
  },
  {
    step: "03",
    title: "Ship",
    description:
      "Embedded squads build, launch, and QA — paid media, SEO tickets, content, and landing experiences going live weekly.",
    deliverables: ["Weekly releases", "Embedded creative + media pod", "Edge-fast landing system"],
    icon: Rocket,
    hue: "from-violet-400/30 via-fuchsia-500/10 to-transparent text-violet-400",
  },
  {
    step: "04",
    title: "Measure",
    description:
      "Instrumented dashboards, server-side tracking, and weekly reviews focused on margin, payback, and incrementality.",
    deliverables: ["Executive dashboard", "Incrementality tests", "Cohort & LTV views"],
    icon: LineChartIcon,
    hue: "from-emerald-400/30 via-cyan-500/10 to-transparent text-emerald-400",
  },
  {
    step: "05",
    title: "Compound",
    description:
      "Every learning becomes a lever. We retire losers ruthlessly, re-invest in what works, and keep the curve bending up.",
    deliverables: ["Quarterly re-plans", "Learning library", "Margin-led reallocation"],
    icon: Repeat,
    hue: "from-amber-400/30 via-rose-500/10 to-transparent text-amber-400",
  },
];

/**
 * Horizontally-pinned approach section. As the user scrolls through the
 * tall wrapper, the inner track translates sideways — creating a pinned
 * horizontal journey through each stage of the process.
 */
export function HomeApproach() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // Translate the track by roughly (100 - viewport) percent. We animate 0 → -72%
  // which nicely shows all 5 cards across common viewport widths. Reduce-motion
  // skips the horizontal animation.
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["0%", "-72%"]
  );
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative">
      <div className="gradient-line absolute inset-x-0 top-0" />

      <Container>
        <div className="pt-24 sm:pt-32">
          <AnimatedSectionHeading
            eyebrow="Our approach"
            title="A repeatable engine, not a one-off campaign"
            description="Five disciplined stages that compound learnings into durable advantage — same rigour whether you spend ₹5L or ₹5Cr per month."
          />
        </div>
      </Container>

      {/* Tall wrapper — its height defines how long the sideways pin lasts. */}
      <div ref={wrapRef} className="relative h-[400vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="h-scroll-track px-[6vw]">
            {STEPS.map((s, i) => (
              <StageCard key={s.step} s={s} isLast={i === STEPS.length - 1} />
            ))}
          </motion.div>

          {/* Progress bar at bottom of the pinned viewport */}
          <div className="pointer-events-none absolute inset-x-0 bottom-10 z-10 mx-auto h-px w-[80%] max-w-3xl overflow-hidden rounded-full bg-border sm:bottom-12">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 shadow-[0_0_12px_rgba(34,211,238,0.45)]"
            />
          </div>

          <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.32em] text-muted/70 sm:bottom-6">
            scroll to navigate approach
          </div>
        </div>
      </div>
    </section>
  );
}

function StageCard({ s, isLast }: { s: Step; isLast: boolean }) {
  const Icon = s.icon;
  return (
    <div
      data-cursor="view"
      data-cursor-label="Focus"
      className="step-card relative flex h-[min(72vh,600px)] w-[min(82vw,520px)] shrink-0 flex-col overflow-hidden rounded-[2rem] border border-border bg-card p-7 sm:p-10"
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.hue}`}
      />
      <div className="noise-overlay" />

      <div className="relative flex items-center justify-between">
        <span className="num-stamp text-[3.5rem] leading-none sm:text-[4.5rem]">
          {s.step}
        </span>
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <div className="relative mt-6">
        <h3 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {s.title}
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">
          {s.description}
        </p>
      </div>

      <div className="relative mt-auto pt-8">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted/70">
          Deliverables
        </p>
        <ul className="space-y-2">
          {s.deliverables.map((d) => (
            <li
              key={d}
              className="flex items-center gap-2 text-sm font-medium text-foreground/90"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400" />
              {d}
            </li>
          ))}
        </ul>
      </div>

      {/* Arrow connector to next card */}
      {!isLast ? (
        <svg
          aria-hidden
          viewBox="0 0 80 40"
          className="pointer-events-none absolute -right-16 top-1/2 h-10 w-20 -translate-y-1/2 text-cyan-400/70"
        >
          <path
            className="connector"
            d="M2 20 H70"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M65 14 L74 20 L65 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </div>
  );
}
