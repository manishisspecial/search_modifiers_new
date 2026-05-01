"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Eye,
  Search,
  Share2,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import type { ServiceKpi, ServiceMeta } from "@/lib/services-meta";
import { Tilt3D } from "@/components/motion/tilt-3d";

export function ServiceDashboard({ meta }: { meta: ServiceMeta }) {
  const reduce = useReducedMotion();

  return (
    <div className="service-hero-enter relative mx-auto w-full max-w-[520px] lg:ml-auto">
    
      {/* Conic glow ring behind the panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] opacity-60 blur-3xl"
      >
        <div className="conic-ring absolute inset-0 rounded-full opacity-25" />
      </div>

      <Tilt3D max={9} scale={1.015}>
        <div className="holo float-shadow glass relative overflow-hidden rounded-3xl border border-white/10 p-5 sm:p-6">
          {/* Top window bar */}
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
              <span className="ml-3 text-[11px] font-medium tracking-wide text-muted/80">
                searchmodifiers / {meta.dashTitle}
              </span>
            </div>
            <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
              LIVE
            </span>
          </div>

          {/* KPI tiles */}
          <div className="tilt-layer relative mt-5 grid grid-cols-3 gap-3">
            {meta.kpis.map((k, i) => (
              <KpiTile key={k.label} kpi={k} index={i} />
            ))}
          </div>

          {/* Headline / sparkline */}
          <div className="tilt-layer relative mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted/70">
                  {meta.headlineLabel}
                </p>
                <p className="mt-1 font-display text-xl font-bold tracking-tight text-foreground">
                  {meta.headlineValue}{" "}
                  <span className="ml-1 text-xs font-semibold text-emerald-400">
                    {meta.headlineDelta}
                  </span>
                </p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted/60" />
            </div>
            <TrendSparkline variant={meta.visual} />
          </div>

          {/* Channel rows */}
          <div className="tilt-layer relative mt-4 space-y-2.5">
            {meta.channels.map((row, i) => (
              <div key={row.label} className="flex items-center gap-3">
                <span className="w-28 shrink-0 truncate text-[11px] font-medium text-muted/80">
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
      <div className="glass absolute -left-3 top-12 hidden items-center gap-2 rounded-full border border-emerald-500/20 py-1.5 pl-2 pr-3 text-[11px] font-medium text-foreground/90 shadow-xl sm:-left-10 sm:flex">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
          <TrendingUp className="h-3.5 w-3.5" />
        </span>
        {meta.callouts[0]}
      </div>

      <div className="glass absolute -right-2 bottom-16 hidden items-center gap-2 rounded-full border border-orange-500/20 py-1.5 pl-2 pr-3 text-[11px] font-medium text-foreground/90 shadow-xl sm:-right-8 sm:flex">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/15 text-orange-400">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
        {meta.callouts[1]}
      </div>
    </div>
  );
}

function KpiTile({ kpi, index }: { kpi: ServiceKpi; index: number }) {
  const tint =
    index === 0
      ? "from-orange-400/25 to-orange-400/0 text-orange-400"
      : index === 1
        ? "from-rose-400/25 to-rose-400/0 text-rose-400"
        : "from-amber-400/25 to-amber-400/0 text-amber-400";
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent p-3">
      <div className="flex items-center gap-1.5">
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br ${tint}`}
        >
          <KpiIcon icon={kpi.icon} />
        </span>
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted/70">
          {kpi.label}
        </span>
      </div>
      <p className="mt-1.5 font-display text-lg font-bold tracking-tight text-foreground">
        {kpi.value}
        {kpi.delta ? (
          <span className="ml-1 text-[10px] font-semibold text-emerald-400">{kpi.delta}</span>
        ) : null}
      </p>
    </div>
  );
}

function KpiIcon({ icon }: { icon?: ServiceKpi["icon"] }) {
  const cls = "h-3.5 w-3.5";
  switch (icon) {
    case "search":
      return <Search className={cls} />;
    case "target":
      return <Target className={cls} />;
    case "trending-up":
      return <TrendingUp className={cls} />;
    case "users":
      return <Users className={cls} />;
    case "star":
      return <Star className={cls} />;
    case "zap":
      return <Zap className={cls} />;
    case "eye":
      return <Eye className={cls} />;
    case "share":
      return <Share2 className={cls} />;
    case "shield":
      return <Shield className={cls} />;
    default:
      return <TrendingUp className={cls} />;
  }
}

function TrendSparkline({
  variant,
}: {
  variant: ServiceMeta["visual"];
}) {
  const valuesByVariant: Record<ServiceMeta["visual"], number[]> = {
    metrics: [28, 32, 30, 36, 34, 40, 38, 46, 50, 54, 51, 62, 68, 74, 82],
    ranking: [62, 58, 50, 46, 40, 38, 34, 28, 22, 18, 14, 11, 8, 5, 3], // ranking position (lower = better)
    social: [22, 30, 28, 38, 34, 46, 52, 48, 60, 66, 70, 76, 72, 84, 92],
    reputation: [40, 44, 41, 50, 56, 60, 68, 64, 72, 78, 80, 86, 88, 91, 94],
    press: [12, 18, 16, 28, 22, 36, 30, 44, 50, 48, 62, 70, 66, 78, 86],
    ai: [4, 8, 14, 12, 24, 28, 36, 42, 48, 56, 62, 68, 70, 78, 88],
    code: [38, 46, 44, 56, 62, 70, 74, 78, 82, 86, 88, 92, 94, 96, 98],
  };

  const values = valuesByVariant[variant];
  const w = 440;
  const h = 88;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const stepX = w / (values.length - 1);
  const range = max - min || 1;

  // For ranking variant, lower is better — invert y axis so the line still slopes up.
  const yOf =
    variant === "ranking"
      ? (v: number) => ((v - min) / range) * (h - 10) + 4
      : (v: number) => h - ((v - min) / range) * (h - 10) - 4;

  let d = `M0 ${yOf(values[0]).toFixed(1)}`;
  for (let i = 1; i < values.length; i++) {
    const x1 = (i - 0.5) * stepX;
    const y1 = yOf(values[i - 1]);
    const x2 = (i - 0.5) * stepX;
    const y2 = yOf(values[i]);
    d += ` C ${x1.toFixed(1)} ${y1.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}, ${(i * stepX).toFixed(1)} ${yOf(values[i]).toFixed(1)}`;
  }

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="mt-3 h-[80px] w-full"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id={`spark-line-${variant}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="55%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#fb7185" />
        </linearGradient>
        <linearGradient id={`spark-fill-${variant}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#fb923c" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L ${w} ${h} L 0 ${h} Z`} fill={`url(#spark-fill-${variant})`} />
      <motion.path
        d={d}
        fill="none"
        stroke={`url(#spark-line-${variant})`}
        strokeWidth={2.2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.7, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.circle
        cx={w}
        cy={yOf(values[values.length - 1])}
        r={4}
        fill="#fb923c"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.4 }}
      />
    </svg>
  );
}
