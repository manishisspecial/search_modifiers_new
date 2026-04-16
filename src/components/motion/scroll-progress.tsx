"use client";

import { useEffect, useRef } from "react";

/**
 * Razor-thin gradient bar fixed to the top of the viewport that tracks
 * the user's vertical scroll progress. Uses rAF + a CSS variable to stay
 * cheap at 60fps.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const max =
        (document.documentElement.scrollHeight || 1) - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;
      el.style.setProperty("--scroll-progress", String(p));
      frame.current = null;
    };

    const onScroll = () => {
      if (frame.current != null) return;
      frame.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame.current != null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return <div ref={ref} aria-hidden className="scroll-progress" />;
}
