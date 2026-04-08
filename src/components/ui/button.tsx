import { cn } from "@/lib/cn";
import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:brightness-105",
  secondary: "bg-slate-800/90 text-slate-100 border border-slate-600/50 hover:bg-slate-800 hover:border-slate-500",
  ghost: "text-slate-200 hover:bg-white/5",
  outline:
    "border border-slate-500/40 text-slate-100 bg-transparent hover:bg-white/5 hover:border-cyan-400/40",
};

export function Button({
  className,
  variant = "primary",
  href,
  children,
  type = "button",
  ...props
}: ComponentProps<"button"> & {
  variant?: Variant;
  href?: string;
  children: React.ReactNode;
}) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.97] hover:translate-y-[-1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/80 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 disabled:hover:translate-y-0",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} {...props}>
      {children}
    </button>
  );
}
