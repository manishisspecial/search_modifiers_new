"use client";

import { useEffect, useRef } from "react";

/**
 * Premium "lens" cursor.
 *
 *  • Desktop only — auto-disabled on touch, coarse pointers, and
 *    when the user prefers reduced motion.
 *  • Smooth lerped follow for that fluid, inertial feel.
 *  • Morphs state based on what the cursor is over:
 *      - default: small cyan dot
 *      - over a link/button: expanding outlined disc
 *      - over a `data-cursor="view"` card: large glass disc with "VIEW" label
 *      - over text inputs: I-beam
 */
export function LensCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouch =
      window.matchMedia?.("(hover: none)").matches ||
      window.matchMedia?.("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isTouch || reduceMotion) return;

    const root = document.documentElement;
    root.classList.add("has-lens-cursor");

    const cursor = ref.current;
    const label = labelRef.current;
    if (!cursor || !label) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let x = mouseX;
    let y = mouseY;
    let raf: number | null = null;

    const loop = () => {
      // Lerp for inertial feel
      x += (mouseX - x) * 0.22;
      y += (mouseY - y) * 0.22;
      cursor.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.classList.remove("is-hidden");
    };

    const onLeave = () => cursor.classList.add("is-hidden");
    const onEnter = () => cursor.classList.remove("is-hidden");

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      // Reset all state classes
      cursor.classList.remove("is-link", "is-text", "is-view");
      label.textContent = "";

      const viewEl = t.closest<HTMLElement>("[data-cursor='view']");
      if (viewEl) {
        cursor.classList.add("is-view");
        const override = viewEl.getAttribute("data-cursor-label");
        label.textContent = override ?? "View";
        return;
      }
      const linkEl = t.closest<HTMLElement>(
        "a, button, [role='button'], [data-cursor='link']"
      );
      if (linkEl) {
        cursor.classList.add("is-link");
        return;
      }
      const textEl = t.closest<HTMLElement>(
        "input[type='text'], input[type='email'], input[type='tel'], input[type='search'], textarea, [contenteditable='true']"
      );
      if (textEl) {
        cursor.classList.add("is-text");
        return;
      }
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      if (raf != null) cancelAnimationFrame(raf);
      root.classList.remove("has-lens-cursor");
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="lens-cursor is-hidden"
    >
      <span ref={labelRef} className="lens-label" />
      <span className="lens-dot" />
    </div>
  );
}
