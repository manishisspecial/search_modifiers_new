"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * Cinematic word-by-word mask reveal for headings.
 * Splits the given `text` on whitespace, wraps each word in an
 * overflow-hidden mask, and rises each with a staggered delay when
 * the element enters the viewport.
 */
export function MaskReveal({
  text,
  className,
  as: Tag = "span",
  delay = 0,
  stagger = 0.06,
  accentIndex,
}: {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  /** Base delay in seconds before the first word rises */
  delay?: number;
  /** Extra delay per word */
  stagger?: number;
  /** If set, that word (0-based) gets the gradient-text accent */
  accentIndex?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-revealing");
            el.querySelectorAll<HTMLElement>(".mask-word").forEach((w) => {
              w.classList.add("is-in");
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "-40px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = text.split(/\s+/);
  const Comp = Tag as "span";

  return (
    <Comp ref={ref as never} className={cn(className)}>
      {words.map((w, i) => {
        const isAccent = i === accentIndex;
        return (
          <span
            key={`${w}-${i}`}
            className="mask-word mr-[0.28em] last:mr-0"
            style={{ animationDelay: `${delay + i * stagger}s` }}
          >
            <span
              style={{ animationDelay: `${delay + i * stagger}s` }}
              className={isAccent ? "gradient-text" : undefined}
            >
              {w}
            </span>
          </span>
        );
      })}
    </Comp>
  );
}
