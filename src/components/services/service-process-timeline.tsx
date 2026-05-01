"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { useHasMounted } from "@/lib/use-has-mounted";

type Step = { step: string; title: string; description: string };

/**
 * Process timeline. Each step is a 3D-tilt card with a magnetic accent dot.
 * Cards are linked together by an animated dashed SVG path that draws-in
 * as the section enters the viewport. Every card lifts on hover.
 */
export function ServiceProcessTimeline({
  steps,
  eyebrow = "Process",
  title = "How we work with your team",
  description = "Transparent phases, clear owners, and weekly momentum — whether you're in Delhi NCR or fully remote.",
}: {
  steps: Step[];
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll-progress driven path-draw for the connector line.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 30%"],
  });
  const lineLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="relative py-20 sm:py-24">
      <div className="gradient-line absolute inset-x-0 top-0" />
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div ref={sectionRef} className="relative mt-14">
          {/* Animated dashed connector — visible from md+ only. */}
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
            preserveAspectRatio="none"
            viewBox="0 0 1000 800"
            aria-hidden
          >
            <defs>
              <linearGradient id="proc-line" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="50%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#fb7185" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 60 60 C 280 60, 280 240, 500 240 S 720 420, 940 420 S 720 600, 500 600 S 280 760, 60 760"
              fill="none"
              stroke="url(#proc-line)"
              strokeOpacity="0.45"
              strokeWidth={1.6}
              strokeDasharray="6 8"
              strokeLinecap="round"
              style={{ pathLength: reduce ? 1 : lineLength }}
            />
          </svg>

          <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <ProcessCard key={`${step.step}-${step.title}`} step={step} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProcessCard({ step, index }: { step: Step; index: number }) {
  const reduce = useReducedMotion();
  const mounted = useHasMounted();

  return (
    <motion.div
      initial={reduce || !mounted ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -6 }}
      className="spotlight-card group relative h-full rounded-2xl border border-border bg-card p-6 transition-all duration-500"
    >
      {/* Numbered orb */}
      <div className="relative">
        <span className="absolute -inset-2 rounded-full bg-gradient-to-br from-orange-500/30 to-rose-500/15 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
        <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/25 to-rose-500/15 font-mono text-xs font-bold text-orange-500 ring-1 ring-orange-500/20 transition-transform duration-500 group-hover:scale-110">
          {step.step}
        </span>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
        {step.title}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground/80">
        {step.description}
      </p>

      {/* Subtle bottom-right accent on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-3 right-3 h-1.5 w-1.5 rounded-full bg-orange-400/0 transition-all duration-500 group-hover:scale-150 group-hover:bg-orange-400/80"
      />
    </motion.div>
  );
}
