"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { useHasMounted } from "@/lib/use-has-mounted";

type Faq = { q: string; a: string };

export function ServiceFaq({
  faqs,
  eyebrow = "FAQ",
  title = "Questions clients ask first",
  description = "Don't see yours? Drop us a line — we usually reply within one business day.",
}: {
  faqs: Faq[];
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  const reduce = useReducedMotion();
  const mounted = useHasMounted();
  const [open, setOpen] = useState<number | null>(0);

  if (!faqs.length) return null;

  return (
    <section className="relative bg-background/80 py-20 sm:py-24">
      <div className="gradient-line absolute inset-x-0 top-0" />
      <div className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-orange-500/5 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-1/4 h-72 w-72 rounded-full bg-rose-500/5 blur-[100px]" />
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={reduce || !mounted ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={`group rounded-2xl border bg-card transition-all duration-500 ${
                  isOpen
                    ? "border-orange-400/40 shadow-lg shadow-orange-500/5"
                    : "border-border hover:border-orange-400/25"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left sm:px-8 sm:py-6"
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                      isOpen
                        ? "border-orange-400/50 bg-orange-500/10 text-orange-400"
                        : "border-border text-muted group-hover:border-orange-400/30 group-hover:text-orange-400"
                    }`}
                  >
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="flex"
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </span>
                  <span className="flex-1 font-display text-base font-medium text-foreground sm:text-lg">
                    {f.q}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pl-[4.5rem] pr-6 text-sm leading-relaxed text-muted sm:px-8 sm:pb-7 sm:pl-[5.25rem]">
                        {f.a}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
