import { cn } from "@/lib/cn";
import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400 text-white font-semibold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 hover:brightness-105",
  secondary: "bg-surface text-foreground border border-border hover:bg-surface-hover",
  ghost: "text-muted hover:bg-surface-hover hover:text-foreground",
  outline:
    "border border-border text-foreground bg-transparent hover:bg-surface-hover hover:border-orange-400/40",
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
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm transition-[box-shadow,filter,opacity,background-color,border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400/80 disabled:opacity-50 disabled:pointer-events-none active:opacity-[0.94]",
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
