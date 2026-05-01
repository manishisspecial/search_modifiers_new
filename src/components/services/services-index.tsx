"use client";

import { useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/motion/magnetic";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { Stagger, StaggerItem } from "@/components/motion/fade-in";
import { Tilt3D } from "@/components/motion/tilt-3d";
import { ServiceBenefitIcon } from "@/components/services/service-benefit-icon";
import type { ServiceBlock } from "@/lib/services-data";
import type { ServiceMeta } from "@/lib/services-meta";

const FEATURED_SLUGS = [
  "seo-services",
  "ppc-services",
  "social-media-marketing",
  "brand-management",
  "website-development",
  "answer-engine-optimization",
];

export function ServicesIndex({ services, metas }: {
  services: ServiceBlock[];
  metas: Record<string, ServiceMeta>;
}) {
  function iconFor(slug: string): string {
    const s = services.find((x) => x.slug === slug);
    return s?.benefits[0]?.icon ?? "sparkles";
  }
  function getServiceMeta(slug: string): ServiceMeta {
    return metas[slug] ?? { pill: "", visual: "metrics", dashTitle: "", kpis: [], headlineLabel: "", headlineValue: "", headlineDelta: "", channels: [], callouts: [], proof: [{ value: "—", label: "" }, { value: "—", label: "" }, { value: "—", label: "" }, { value: "—", label: "" }], related: [] };
  }
  const reduce = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = heroRef.current;
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
      tx = nx * 32;
      ty = ny * 32;
      if (raf == null) raf = requestAnimationFrame(apply);
    };
    section.addEventListener("pointermove", onMove);
    return () => {
      section.removeEventListener("pointermove", onMove);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative isolate overflow-hidden pb-16 pt-12 sm:pb-20 sm:pt-16"
      >
        <div
          ref={orbsRef}
          aria-hidden
          className="pointer-events-none absolute inset-0"
        >
          <div
            className="aurora-a absolute left-[8%] top-[8%] h-[440px] w-[440px] rounded-full bg-orange-500/16 blur-[110px]"
            style={{ transform: "translate3d(var(--px,0),var(--py,0),0)" }}
          />
          <div
            className="aurora-b absolute right-[0%] top-[14%] h-[380px] w-[380px] rounded-full bg-rose-500/14 blur-[100px]"
            style={{
              transform:
                "translate3d(calc(var(--px,0) * -0.6), calc(var(--py,0) * -0.6), 0)",
            }}
          />
          <div className="grid-overlay absolute inset-0 opacity-[0.22]" />
          <div className="noise-overlay" />
        </div>

        <Container className="relative">
          <div className="service-hero-enter max-w-4xl">
            <div className="shimmer-border badge-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-foreground/85 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="dot-pulse absolute inline-flex h-full w-full rounded-full bg-orange-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
              </span>
              <Sparkles className="h-3.5 w-3.5 text-orange-500" />
              <span className="tracking-wide">Services</span>
            </div>

            <h1 className="mt-7 font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl lg:text-[4rem]">
              <MaskReveal as="span" className="block" text="Everything growth —" />
              <span className="mt-1 block">
                <MaskReveal
                  as="span"
                  className="inline"
                  text="one accountable partner"
                  delay={0.3}
                  accentIndex={2}
                />
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
              Pick a lane to explore playbooks, process, and FAQs. Every engagement ships
              with clear metrics, weekly momentum, and reporting your leadership will trust.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Magnetic strength={0.3}>
                <Button
                  href="/request-quote"
                  className="group min-h-[50px] px-8 py-3 text-base shadow-xl shadow-orange-500/25"
                >
                  Request a quote
                  <ArrowRight className="cta-arrow-nudge h-4 w-4" />
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
        </Container>
        <div className="gradient-line absolute inset-x-0 bottom-0" />
      </section>

      {/* ── Featured services strip ── */}
      <section className="relative pt-12 sm:pt-16">
        <Container>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400/90">
            Featured this quarter
          </p>
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Most-requested motions
          </h2>
        </Container>

        <Container className="mt-8">
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_SLUGS.map((slug) => {
              const s = services.find((x) => x.slug === slug);
              if (!s) return null;
              const meta = getServiceMeta(s.slug);
              return (
                <StaggerItem key={s.slug}>
                  <Tilt3D max={6} scale={1.012}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="spotlight-card glass holo group relative flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-border p-6 transition-colors duration-500 hover:border-orange-400/30 sm:p-7"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-orange-400/0 blur-3xl transition-colors duration-500 group-hover:bg-orange-400/10"
                      />
                      <div className="tilt-layer relative">
                        <div className="flex items-start justify-between gap-2">
                          <div className="relative inline-flex h-12 w-12 items-center justify-center">
                            <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-orange-500/25 to-rose-500/15 transition-transform duration-500 group-hover:scale-110" />
                            <span className="absolute inset-0 rounded-xl border border-orange-500/15" />
                            <ServiceBenefitIcon
                              name={iconFor(s.slug)}
                              className="relative h-5 w-5 text-orange-500 transition-transform duration-500 group-hover:rotate-6"
                            />
                          </div>
                          <span className="rounded-full border border-orange-500/20 bg-orange-500/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-orange-400/90">
                            {meta.pill}
                          </span>
                        </div>

                        <h3 className="mt-5 font-display text-xl font-semibold text-foreground group-hover:text-orange-500">
                          {s.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          {s.shortDescription}
                        </p>

                        <div className="mt-6 flex items-center justify-between">
                          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-400/90">
                            View service
                            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                          <span className="text-[11px] font-medium text-muted/70">
                            <span className="gradient-text font-bold">{meta.proof[0].value}</span>{" "}
                            {meta.proof[0].label.toLowerCase()}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </Tilt3D>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* ── Full grid ── */}
      <section className="pb-20 pt-20 sm:pb-28 sm:pt-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400/90">
                All services
              </p>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Browse the full lineup
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted">
              {services.length} service playbooks — each with discovery, build, scale, and
              measurement baked in.
            </p>
          </div>

          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const meta = getServiceMeta(s.slug);
              return (
                <StaggerItem key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="spotlight-card glass gradient-border group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-colors duration-500 hover:border-orange-400/30"
                  >
                    <div className="relative flex items-start justify-between gap-2">
                      <div className="relative inline-flex h-10 w-10 items-center justify-center">
                        <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-orange-500/20 to-rose-500/10 transition-transform duration-500 group-hover:scale-110" />
                        <ServiceBenefitIcon
                          name={iconFor(s.slug)}
                          className="relative h-4 w-4 text-orange-500"
                        />
                      </div>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-muted/70 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange-400" />
                    </div>

                    <h3 className="mt-4 font-display text-lg font-semibold text-foreground group-hover:text-orange-500">
                      {s.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {s.shortDescription}
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange-400/80">
                        {meta.pill}
                      </span>
                      <span className="text-[11px] text-muted/70">
                        <span className="gradient-text font-bold">{meta.proof[0].value}</span>
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
