"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import type { ServiceProof } from "@/lib/services-meta";
import { useHasMounted } from "@/lib/use-has-mounted";

export function ServiceStatRibbon({ proof }: { proof: ServiceProof[] }) {
  const reduce = useReducedMotion();
  const mounted = useHasMounted();

  return (
    <section className="relative -mt-8 pb-2 sm:-mt-12">
      <Container>
        <div className="glass gradient-border relative overflow-hidden rounded-3xl px-4 py-4 sm:px-8 sm:py-6">
          <div className="noise-overlay rounded-3xl" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-500/10 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-rose-500/10 blur-[70px]" />
          <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {proof.map((p, i) => (
              <motion.div
                key={p.label}
                initial={reduce || !mounted ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group relative text-center sm:text-left"
              >
                <p className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-[1.7rem]">
                  <span className="gradient-text">{p.value}</span>
                </p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted/70 sm:text-xs">
                  {p.label}
                </p>
                {i < proof.length - 1 ? (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-border to-transparent sm:block"
                  />
                ) : null}
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
