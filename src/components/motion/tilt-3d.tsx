"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * 3D tilt card. On pointer-move over the element, rotates around X/Y
 * based on cursor offset. Also publishes --mouse-x / --mouse-y for
 * the holographic sheen. Fully CSS-driven for smoothness.
 */
export function Tilt3D({
  children,
  className,
  max = 10,
  scale = 1.02,
}: {
  children: React.ReactNode;
  className?: string;
  /** Max degree of tilt on either axis */
  max?: number;
  /** Hover scale multiplier */
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    )
      return;

    let raf: number | null = null;
    let rx = 0;
    let ry = 0;
    let s = 1;

    const paint = () => {
      el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`;
      raf = null;
    };
    const schedule = () => {
      if (raf == null) raf = requestAnimationFrame(paint);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mouse-x", `${(e.clientX - r.left).toFixed(0)}px`);
      el.style.setProperty("--mouse-y", `${(e.clientY - r.top).toFixed(0)}px`);
      ry = (px - 0.5) * max * 2;
      rx = -(py - 0.5) * max * 2;
      s = scale;
      schedule();
    };

    const onLeave = () => {
      rx = 0;
      ry = 0;
      s = 1;
      schedule();
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [max, scale]);

  return (
    <div ref={ref} className={cn("tilt-3d", className)}>
      {children}
    </div>
  );
}
