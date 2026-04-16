"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Infinite, scroll-velocity reactive marquee.
 * The base duration is controlled by `duration`. When the user scrolls
 * quickly, we temporarily shorten the CSS animation duration to make
 * the text physically "respond" to page motion (like Doors Studio's
 * kinetic banners, but cleaner).
 */
export function KineticMarquee({
  children,
  className,
  rowClassName,
  duration = 40,
  direction = "normal",
  /** How aggressive the scroll-velocity response is (0 disables it). */
  reactivity = 0.6,
}: {
  children: React.ReactNode;
  className?: string;
  rowClassName?: string;
  duration?: number;
  direction?: "normal" | "reverse";
  reactivity?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce || reactivity <= 0) return;

    let lastY = window.scrollY;
    let lastT = performance.now();
    let raf: number | null = null;
    let current = duration;
    let target = duration;

    const tick = () => {
      current += (target - current) * 0.08;
      track.style.setProperty("--marquee-duration", `${current.toFixed(2)}s`);
      if (Math.abs(current - duration) < 0.05) {
        target = duration;
        raf = null;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const now = performance.now();
      const dy = Math.abs(window.scrollY - lastY);
      const dt = Math.max(1, now - lastT);
      const velocity = dy / dt; // px per ms
      lastY = window.scrollY;
      lastT = now;
      // Faster scroll → shorter duration, capped.
      const factor = 1 - Math.min(0.75, velocity * reactivity);
      target = Math.max(duration * 0.3, duration * factor);
      if (raf == null) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [duration, reactivity]);

  return (
    <div
      className={cn("relative flex w-full overflow-hidden", className)}
      aria-hidden
    >
      <div
        ref={trackRef}
        className={cn("marquee-track", rowClassName)}
        style={
          {
            ["--marquee-duration" as string]: `${duration}s`,
            ["--marquee-direction" as string]: direction,
          } as React.CSSProperties
        }
      >
        {/* duplicated twice for seamless -50% loop */}
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
