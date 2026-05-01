"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

export function HomeTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[i];

  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="glass gradient-border relative overflow-hidden rounded-3xl border border-border px-6 py-12 sm:px-12 sm:py-14">
        <div className="noise-overlay rounded-3xl opacity-[0.04]" />
        <Quote className="absolute left-4 top-4 h-16 w-16 text-orange-500/10 sm:left-8 sm:top-8 sm:h-20 sm:w-20" />
        <div className="relative flex min-h-[200px] flex-col justify-center sm:min-h-[220px]">
          <div className="mb-6 flex justify-center gap-1 sm:justify-start">
            {Array.from({ length: 5 }).map((_, si) => (
              <motion.span
                key={si}
                initial={reduce ? false : { opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: si * 0.06, type: "spring", stiffness: 400, damping: 18 }}
              >
                <Star className="h-5 w-5 fill-amber-400/90 text-amber-400/90" aria-hidden />
              </motion.span>
            ))}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.blockquote
              key={t.quote}
              initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduce ? undefined : { opacity: 0, y: -12, filter: "blur(4px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center sm:text-left"
            >
              <p className="text-lg font-medium leading-relaxed text-foreground sm:text-xl">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-8">
                <cite className="not-italic">
                  <span className="font-display text-base font-semibold text-foreground">{t.name}</span>
                  <span className="mt-1 block text-sm text-muted/70">
                    {t.role}, {t.company}
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="relative mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              aria-label="Previous testimonial"
              whileHover={reduce ? undefined : { scale: 1.08 }}
              whileTap={reduce ? undefined : { scale: 0.94 }}
              className="rounded-full border border-border bg-surface-hover p-2.5 text-muted transition-colors hover:border-orange-500/40 hover:text-foreground"
              onClick={() => setI((x) => (x - 1 + testimonials.length) % testimonials.length)}
            >
              <ChevronLeft className="h-5 w-5" />
            </motion.button>
            <div className="flex gap-1.5">
              {testimonials.map((_, j) => (
                <button
                  key={j}
                  type="button"
                  aria-label={`Go to testimonial ${j + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    j === i ? "w-9 bg-gradient-to-r from-orange-400 to-amber-400" : "w-2 bg-muted/60 hover:bg-muted"
                  )}
                  onClick={() => setI(j)}
                />
              ))}
            </div>
            <motion.button
              type="button"
              aria-label="Next testimonial"
              whileHover={reduce ? undefined : { scale: 1.08 }}
              whileTap={reduce ? undefined : { scale: 0.94 }}
              className="rounded-full border border-border bg-surface-hover p-2.5 text-muted transition-colors hover:border-orange-500/40 hover:text-foreground"
              onClick={() => setI((x) => (x + 1) % testimonials.length)}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </div>
          <Button href="/testimonials" variant="ghost" className="text-sm text-muted hover:text-foreground">
            All testimonials →
          </Button>
        </div>
      </div>
    </div>
  );
}
