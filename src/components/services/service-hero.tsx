"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/motion/magnetic";
import { MaskReveal } from "@/components/motion/mask-reveal";
import type { ServiceBlock } from "@/lib/services-data";
import type { ServiceMeta } from "@/lib/services-meta";
import { ServiceDashboard } from "@/components/services/service-dashboard";

export function ServiceHero({
  service,
  meta,
}: {
  service: ServiceBlock;
  meta: ServiceMeta;
}) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const orbs = orbsRef.current;
    if (!section || !orbs) return;
    if (reduce) return;

    let raf: number | null = null;
    let tx = 0;
    let ty = 0;

    const apply = () => {
      orbs.style.setProperty("--px", `${tx.toFixed(2)}px`);
      orbs.style.setProperty("--py", `${ty.toFixed(2)}px`);
      raf = null;
    };

    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      tx = nx * 40;
      ty = ny * 40;
      if (raf == null) raf = requestAnimationFrame(apply);
    };
    section.addEventListener("pointermove", onMove);
    return () => {
      section.removeEventListener("pointermove", onMove);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const headline = service.heroTitle ?? service.title;
  const bullets = service.benefits.slice(0, 4).map((b) => b.title);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden pb-14 pt-8 sm:pb-20 sm:pt-12"
    >
      {/* Aurora orbs — decorative, hidden from SSR layout */}
      <div
        ref={orbsRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="aurora-a absolute left-[6%] top-[8%] h-[440px] w-[440px] rounded-full bg-orange-500/18 blur-[110px]"
          style={{ transform: "translate3d(var(--px,0),var(--py,0),0)" }}
        />
        <div
          className="aurora-b absolute right-[0%] top-[12%] h-[380px] w-[380px] rounded-full bg-rose-500/16 blur-[100px]"
          style={{
            transform:
              "translate3d(calc(var(--px,0) * -0.6), calc(var(--py,0) * -0.6), 0)",
          }}
        />
        <div
          className="aurora-c absolute bottom-[-6%] left-1/2 h-[320px] w-[min(90%,700px)] -translate-x-1/2 rounded-full bg-amber-500/14 blur-[90px]"
          style={{
            transform:
              "translate(-50%, 0) translate3d(calc(var(--px,0) * 0.4), calc(var(--py,0) * 0.4), 0)",
          }}
        />
        <div className="grid-overlay absolute inset-0 opacity-[0.22]" />
        <div className="noise-overlay" />
      </div>

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center lg:gap-10 xl:gap-16">
          {/* Left: copy — always visible; animations enhance but never hide */}
          <div className="service-hero-enter">
            <div className="shimmer-border badge-gradient inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-foreground/85 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="dot-pulse absolute inline-flex h-full w-full rounded-full bg-orange-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
              </span>
              <Sparkles className="h-3.5 w-3.5 text-orange-500" />
              <span className="tracking-wide">{meta.pill}</span>
            </div>

            <h1 className="mt-7 max-w-[920px] font-display text-[2.1rem] font-bold leading-[1.06] tracking-[-0.02em] text-foreground sm:text-[2.6rem] md:text-5xl lg:text-[3.4rem] xl:text-[3.7rem]">
              <MaskReveal as="span" className="block" text={headline} />
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {service.shortDescription}
            </p>

            {bullets.length ? (
              <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-2.5">
                {bullets.map((line) => (
                  <li
                    key={line}
                    className="flex items-center gap-2 text-sm text-muted"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500/90" />
                    {line}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Magnetic strength={0.3}>
                <Button
                  href="/request-quote"
                  className="group min-h-[50px] px-8 py-3 text-base shadow-xl shadow-orange-500/25"
                >
                  Get a custom proposal
                  <ArrowRight className="cta-arrow-nudge h-4 w-4 shrink-0" />
                </Button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Button
                  href="/free-website-audit"
                  variant="outline"
                  className="min-h-[50px] px-8 py-3 text-base"
                >
                  Free website audit
                </Button>
              </Magnetic>
            </div>
          </div>

          {/* Right: 3D dashboard */}
          <ServiceDashboard meta={meta} />
        </div>
      </Container>
    </section>
  );
}
