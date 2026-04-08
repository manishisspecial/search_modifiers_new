"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "framer-motion";

type Props = {
  /** Full display when not animating, e.g. "14+", "4.9", "24h" */
  value: string;
  className?: string;
  /** If set, counts from 0 to this number (decimals as number e.g. 4.9) */
  countTo?: number;
  suffix?: string;
  decimals?: number;
};

export function AnimatedCounter({ value, className, countTo, suffix = "", decimals = 0 }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [mounted, setMounted] = useState(false);
  const [text, setText] = useState(value);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!mounted || !inView || countTo === undefined || reduce) return;
    const controls = animate(0, countTo, {
      duration: 1.35,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        const d = decimals > 0 ? v.toFixed(decimals) : String(Math.round(v));
        setText(`${d}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [mounted, inView, countTo, suffix, decimals, reduce]);

  if (!mounted || countTo === undefined || reduce) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {inView ? text : value}
    </span>
  );
}
