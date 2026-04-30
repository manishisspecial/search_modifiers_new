"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ClipboardList, Compass, Rocket, Target } from "lucide-react";
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
    title: "Strategic Discovery Meeting",
    description:
      "Mission-alignment session focused on decoding your business model, growth objectives, operational friction points, and success metrics — establishing a precision roadmap from day one.",
    deliverables: [
      "Goal discovery & revenue-target mapping",
      "Business requirement intelligence gathering",
      "Target audience behavior analysis",
      "Initial growth-opportunity identification systems",
    ],
    icon: Compass,
    hue: "from-orange-400/30 via-orange-500/10 to-transparent text-orange-400",
  },
  {
    step: "02",
    title: "Project Intelligence Briefing",
    description:
      "Brand intelligence audit analyzing your products, services, market positioning, and current digital footprint — extracting the data required to engineer a high-performance growth strategy.",
    deliverables: [
      "Brand ecosystem & business model analysis",
      "Current performance diagnostics & channel review",
      "Product/service value architecture mapping",
      "Priority objective synchronization systems",
    ],
    icon: ClipboardList,
    hue: "from-amber-400/30 via-rose-500/10 to-transparent text-amber-400",
  },
  {
    step: "03",
    title: "Research & Strategy Engineering",
    description:
      "Competitive intelligence mapping, market-signal analysis, and strategic growth engineering — building a precision roadmap designed for measurable expansion and scalable performance.",
    deliverables: [
      "Competitor intelligence mapping & market-gap analysis",
      "Audience behavior research & intent profiling",
      "Multi-channel strategy architecture planning",
      "Timeline sequencing & execution roadmap systems",
    ],
    icon: Target,
    hue: "from-rose-400/30 via-orange-500/10 to-transparent text-rose-400",
  },
  {
    step: "04",
    title: "Launch & Execution Systems",
    description:
      "Precision deployment systems launch, manage, and continuously optimize every campaign layer — using real-time monitoring to maximize performance, efficiency, and measurable results.",
    deliverables: [
      "Campaign or website deployment protocols",
      "Performance tracking & analytics integration",
      "Continuous optimization & scaling systems",
      "Monthly intelligence reports & growth insights",
    ],
    icon: Rocket,
    hue: "from-emerald-400/30 via-orange-500/10 to-transparent text-emerald-400",
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

  // Translate the track so all 4 cards can be reached; tuned for card width + gaps.
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["0%", "-62%"]
  );
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative">
      <div className="gradient-line absolute inset-x-0 top-0" />

      <Container>
        <div className="pt-24 sm:pt-32">
          <AnimatedSectionHeading
            eyebrow="Our approach"
            title="Growth Systems Engineered for Consistent Results"
            description="A precision growth framework engineered to convert ideas into measurable momentum — generating qualified traffic, increasing brand value, and scaling brands with data-backed confidence."
          />
        </div>
      </Container>

      {/* Tall wrapper — its height defines how long the sideways pin lasts. */}
      <div ref={wrapRef} className="relative h-[340vh]">
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
              className="h-full bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400 shadow-[0_0_12px_rgba(251, 146, 60,0.45)]"
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
      className="step-card relative flex h-[min(82vh,700px)] w-[min(82vw,520px)] shrink-0 flex-col overflow-hidden rounded-[2rem] border border-border bg-card p-7 sm:p-10"
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
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {s.description}
        </p>
      </div>

      <div className="relative mt-auto pt-8">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted/70">
          Deliverables
        </p>
        <ul className="space-y-2.5">
          {s.deliverables.map((d) => (
            <li
              key={d}
              className="flex items-start gap-2.5 text-sm font-medium text-foreground/90 leading-snug"
            >
              <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Arrow connector to next card */}
      {!isLast ? (
        <svg
          aria-hidden
          viewBox="0 0 80 40"
          className="pointer-events-none absolute -right-16 top-1/2 h-10 w-20 -translate-y-1/2 text-orange-400/70"
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
