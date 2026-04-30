"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Magnetic pointer wrapper. Tracks the pointer inside an expanded
 * hit-area and gently pulls the inner element toward the cursor
 * via CSS vars (--mx / --my). Respects prefers-reduced-motion.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
  radius = 160,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** 0..1 — how much the element follows the cursor */
  strength?: number;
  /** Hit-area radius in px beyond the element's bounding box */
  radius?: number;
  as?: "div" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    )
      return;

    let raf: number | null = null;
    let tx = 0;
    let ty = 0;

    const apply = (x: number, y: number) => {
      tx = x;
      ty = y;
      if (raf != null) return;
      raf = requestAnimationFrame(() => {
        node.style.setProperty("--mx", `${tx.toFixed(2)}px`);
        node.style.setProperty("--my", `${ty.toFixed(2)}px`);
        raf = null;
      });
    };

    const onMove = (e: PointerEvent) => {
      // Touch drags fire pointermove on a coarse pointer — avoid shifting CTAs and CLS/jank.
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") {
        apply(0, 0);
        return;
      }
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const field = Math.max(rect.width, rect.height) / 2 + radius;
      if (dist > field) {
        apply(0, 0);
        return;
      }
      apply(dx * strength, dy * strength);
    };

    const onLeave = () => apply(0, 0);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [strength, radius]);

  const Comp = Tag as "div";
  return (
    <Comp ref={ref} className={cn("magnetic-anchor inline-flex", className)}>
      {children}
    </Comp>
  );
}
