"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  Phone,
  Sparkles,
  TrendingUp,
  Search,
  Target,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { MaskReveal } from "@/components/motion/mask-reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { ScrollHint } from "@/components/motion/scroll-hint";
import { Tilt3D } from "@/components/motion/tilt-3d";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { useSite } from "@/lib/site-context";
import { CtaFormModal, useCtaModal } from "@/components/forms/cta-form-modal";

type HeroStat =
  | { value: string; label: string; countTo: number; suffix?: string; decimals?: number }
  | { value: string; label: string };

const stats: HeroStat[] = [
  { value: "14+", countTo: 14, suffix: "+", label: "Years collective exp." },
  { value: "320+", countTo: 320, suffix: "+", label: "Campaigns shipped" },
  { value: "4.9", countTo: 4.9, suffix: "", label: "Avg. client rating", decimals: 1 },
  { value: "24h", label: "First response SLA" },
];

/**
 * Next-level hero. Layered motion system:
 *  1. Aurora orbs with independent float loops + cursor parallax.
 *  2. Animated grid overlay that fades with scroll (scroll-linked).
 *  3. Mask-reveal kinetic headline with gradient accent.
 *  4. 3D tilt dashboard mockup on the right with holo sheen + SVG chart.
 *  5. Magnetic CTAs that pull toward the cursor.
 */
export function HomeHero() {
  const site = useSite();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);
  const { isOpen, source, open, close } = useCtaModal();

  // Scroll-linked parallax — fade/translate content as hero leaves viewport.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.6, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  // Cursor-parallax for orbs (pure DOM writes via rAF for cheapness).
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

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden pb-20 pt-6 sm:pb-28 sm:pt-10 lg:min-h-[min(96vh,920px)]"
    >
      {/* ── Background layers ── */}
      <motion.div
        ref={orbsRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: heroOpacity,
        }}
      >
        <div
          className="aurora-a absolute left-[8%] top-[8%] h-[440px] w-[440px] rounded-full bg-orange-500/18 blur-[110px]"
          style={{ transform: "translate3d(var(--px,0),var(--py,0),0)" }}
        />
        <div
          className="aurora-b absolute right-[0%] top-[14%] h-[380px] w-[380px] rounded-full bg-rose-500/16 blur-[100px]"
          style={{ transform: "translate3d(calc(var(--px,0) * -0.6), calc(var(--py,0) * -0.6), 0)" }}
        />
        <div
          className="aurora-c absolute bottom-[-6%] left-1/2 h-[320px] w-[min(90%,700px)] -translate-x-1/2 rounded-full bg-amber-500/14 blur-[90px]"
          style={{ transform: "translate(-50%, 0) translate3d(calc(var(--px,0) * 0.4), calc(var(--py,0) * 0.4), 0)" }}
        />
        <div className="grid-overlay absolute inset-0 opacity-[0.22]" />
        <div className="noise-overlay" />
      </motion.div>

      <Container className="relative flex min-h-[inherit] flex-col justify-center">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="grid gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-center lg:gap-10 xl:gap-16"
        >
          {/* ─────────── Left: copy ─────────── */}
          <div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="shimmer-border badge-gradient inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-foreground/85 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="dot-pulse absolute inline-flex h-full w-full rounded-full bg-orange-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
              </span>
              <Sparkles className="h-3.5 w-3.5 text-orange-500" />
              <span className="tracking-wide">
                Delhi NCR · Remote-first · Global campaigns
              </span>
            </motion.div>

            <h1 className="mt-8 max-w-[920px] font-display text-[2.4rem] font-bold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.3rem]">
              <MaskReveal
                as="span"
                className="block"
                text="Growth marketing that feels"
              />
              <span className="mt-1 block">
                <MaskReveal
                  as="span"
                  className="inline"
                  text="inevitable"
                  delay={0.3}
                  accentIndex={0}
                />{" "}
                <MaskReveal
                  as="span"
                  className="inline text-foreground"
                  text="— not improvised"
                  delay={0.42}
                />
              </span>
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
            >
              {site.description}
            </motion.p>

            <motion.ul
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.45 }}
              className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-2.5"
            >
              {[
                "Dedicated marketing strategist for every account",
                "Fast response times with clear communication",
                "ROI-focused campaigns across SEO, Ads & Social",
                "Transparent monthly reporting & insights",
              ].map((line, i) => (
                <motion.li
                  key={line}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.06, duration: 0.45 }}
                  className="flex items-center gap-2 text-sm text-muted"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500/90" />
                  {line}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Magnetic strength={0.3}>
                <Button
                  onClick={() => open("Homepage - Hero CTA")}
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
              <div className="inline-flex max-w-full flex-col gap-2 text-sm font-medium text-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2">
                <a
                  href={`tel:${site.phoneTel}`}
                  className="inline-flex items-center gap-2 transition hover:text-orange-500"
                >
                  <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface-hover">
                    <Phone className="h-4 w-4 text-orange-400" aria-hidden />
                  </span>
                  <span className="text-foreground">{site.phone}</span>
                </a>
                <span className="hidden px-0.5 text-muted/45 sm:inline" aria-hidden>
                  –
                </span>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 transition hover:text-orange-500"
                >
                  <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface-hover">
                    <Mail className="h-4 w-4 text-orange-400" aria-hidden />
                  </span>
                  <span className="min-w-0 break-all text-foreground sm:break-normal">{site.email}</span>
                </a>
              </div>
            </motion.div>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15, duration: 0.5 }}
              className="mt-3 text-xs text-muted/60"
            >
              Typical first response within one business day. Audit deliverables in ~2 business
              days after kickoff.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.18 + i * 0.06, duration: 0.5 }}
                  className="glass group relative overflow-hidden rounded-2xl px-4 py-5 text-center transition-shadow duration-500 hover:shadow-lg hover:shadow-orange-500/10 sm:text-left"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 opacity-0 transition-opacity duration-500 group-hover:from-orange-500/[0.08] group-hover:to-transparent group-hover:opacity-100" />
                  <p className="relative font-display text-2xl font-bold tabular-nums text-foreground sm:text-[1.75rem]">
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
                  <p className="relative mt-1.5 text-[11px] leading-snug text-muted/70 sm:text-xs">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ─────────── Right: 3D floating dashboard mockup ─────────── */}
          <HeroDashboard />
        </motion.div>
      </Container>
      <ScrollHint />

      <CtaFormModal
        isOpen={isOpen}
        onClose={close}
        title="Get a custom proposal"
        subtitle="Share your goals and we'll craft a tailored strategy for your business."
        source={source}
      />
    </section>
  );
}

/**
 * A product-looking analytics panel that tilts with the cursor.
 * Everything is rendered in SVG + CSS so it stays crisp and themeable.
 */
function HeroDashboard() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.45, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[520px] lg:ml-auto"
    >
      {/* Ambient conic glow behind the dashboard */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] opacity-60 blur-3xl"
      >
        <div className="conic-ring absolute inset-0 rounded-full opacity-25" />
      </div>

      <Tilt3D max={8} scale={1.015}>
        <div className="holo float-shadow glass relative overflow-hidden rounded-3xl border border-white/10 p-5 sm:p-6">
          {/* top bar */}
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-3 text-[11px] font-medium tracking-wide text-muted/80">
                searchmodifiers / growth.dash
              </span>
            </div>
            <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
              LIVE
            </span>
          </div>

          {/* KPI tiles */}
          <div className="tilt-layer relative mt-5 grid grid-cols-3 gap-3">
            <KpiTile
              label="Organic growth"
              value="+148%"
              accent="cyan"
              icon={<TrendingUp className="h-3.5 w-3.5" />}
            />
            <KpiTile
              label="Paid ROAS"
              value="6.4×"
              accent="violet"
              icon={<Target className="h-3.5 w-3.5" />}
            />
            <KpiTile
              label="SERP wins"
              value="312"
              accent="indigo"
              icon={<Search className="h-3.5 w-3.5" />}
            />
          </div>

          {/* Trend chart */}
          <div className="tilt-layer relative mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted/70">
                  Weekly sessions
                </p>
                <p className="mt-1 font-display text-xl font-bold tracking-tight text-foreground">
                  84,921{" "}
                  <span className="ml-1 text-xs font-semibold text-emerald-400">
                    ▲ 23.4%
                  </span>
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted/60" />
            </div>
            <TrendSparkline />
          </div>

          {/* Channel breakdown */}
          <div className="tilt-layer relative mt-4 space-y-2.5">
            {[
              { label: "Organic search", pct: 78, tint: "from-orange-400 to-orange-500" },
              { label: "Paid media", pct: 62, tint: "from-amber-400 to-rose-500" },
              { label: "Direct / brand", pct: 45, tint: "from-rose-400 to-rose-500" },
            ].map((row, i) => (
              <div key={row.label} className="flex items-center gap-3">
                <span className="w-28 shrink-0 text-[11px] font-medium text-muted/80">
                  {row.label}
                </span>
                <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={reduce ? false : { width: 0 }}
                    animate={{ width: `${row.pct}%` }}
                    transition={{
                      delay: 0.9 + i * 0.15,
                      duration: 1.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`h-full rounded-full bg-gradient-to-r ${row.tint}`}
                  />
                </div>
                <span className="w-10 shrink-0 text-right text-[11px] font-semibold tabular-nums text-foreground/90">
                  {row.pct}%
                </span>
              </div>
            ))}
          </div>

          {/* glow hotspot */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-orange-400/20 blur-3xl"
          />
        </div>
      </Tilt3D>

      {/* Floating callouts */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14, x: -10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 1.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass absolute -left-3 top-12 hidden items-center gap-2 rounded-full border border-emerald-500/20 py-1.5 pl-2 pr-3 text-[11px] font-medium text-foreground/90 shadow-xl sm:-left-10 sm:flex"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
          <TrendingUp className="h-3.5 w-3.5" />
        </span>
        CVR up 37% MoM
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: -14, x: 10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 1.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass absolute -right-2 bottom-16 hidden items-center gap-2 rounded-full border border-orange-500/20 py-1.5 pl-2 pr-3 text-[11px] font-medium text-foreground/90 shadow-xl sm:-right-8 sm:flex"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/15 text-orange-400">
          <Search className="h-3.5 w-3.5" />
        </span>
        #1 for 42 new keywords
      </motion.div>
    </motion.div>
  );
}

function KpiTile({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  accent: "cyan" | "violet" | "indigo";
}) {
  const tint =
    accent === "cyan"
      ? "from-orange-400/25 to-orange-400/0 text-orange-400"
      : accent === "violet"
        ? "from-rose-400/25 to-rose-400/0 text-rose-400"
        : "from-amber-400/25 to-amber-400/0 text-amber-400";
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent p-3">
      <div className="flex items-center gap-1.5">
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br ${tint}`}
        >
          {icon}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted/70">
          {label}
        </span>
      </div>
      <p className="mt-1.5 font-display text-lg font-bold tracking-tight text-foreground">
        {value}
      </p>
    </div>
  );
}

function TrendSparkline() {
  // Hand-picked "pleasing uptrend" values, then rendered as a smooth SVG path
  // with an animated draw-in on mount.
  const values = [28, 32, 30, 36, 34, 40, 38, 46, 50, 54, 51, 62, 68, 74, 82];
  const w = 440;
  const h = 88;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const stepX = w / (values.length - 1);
  const y = (v: number) => h - ((v - min) / (max - min)) * (h - 10) - 4;

  // build a smooth cubic path
  let d = `M0 ${y(values[0]).toFixed(1)}`;
  for (let i = 1; i < values.length; i++) {
    const x1 = (i - 0.5) * stepX;
    const y1 = y(values[i - 1]);
    const x2 = (i - 0.5) * stepX;
    const y2 = y(values[i]);
    d += ` C ${x1.toFixed(1)} ${y1.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}, ${(i * stepX).toFixed(1)} ${y(values[i]).toFixed(1)}`;
  }

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="mt-3 h-[80px] w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="spark-line" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="55%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#fb7185" />
        </linearGradient>
        <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fb923c" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L ${w} ${h} L 0 ${h} Z`} fill="url(#spark-fill)" />
      <motion.path
        d={d}
        fill="none"
        stroke="url(#spark-line)"
        strokeWidth={2.2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.circle
        cx={w}
        cy={y(values[values.length - 1])}
        r={4}
        fill="#fb923c"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.4 }}
      />
    </svg>
  );
}
