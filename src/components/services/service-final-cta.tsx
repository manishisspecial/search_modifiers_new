"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { CtaFormModal, useCtaModal } from "@/components/forms/cta-form-modal";
import { useHasMounted } from "@/lib/use-has-mounted";

export function ServiceFinalCta({
  serviceTitle,
}: {
  serviceTitle: string;
}) {
  const reduce = useReducedMotion();
  const mounted = useHasMounted();
  const { isOpen, source, open, close } = useCtaModal();

  return (
    <section className="relative py-20 sm:py-28">
      <Container>
        <motion.div
          initial={reduce || !mounted ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass gradient-border relative overflow-hidden rounded-[2rem] px-8 py-16 text-center sm:px-14 sm:py-20"
        >
          <div className="noise-overlay rounded-[2rem]" />

          {/* Conic spin behind content */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-px -z-10 opacity-50 blur-[60px]"
          >
            <div className="conic-ring absolute inset-0 rounded-full opacity-30" />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-orange-500/8 via-transparent to-rose-500/8" />

          {/* Floating orbital dots */}
          {!reduce ? (
            <>
              <span className="orbit-a pointer-events-none absolute left-1/2 top-1/2 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/70 shadow-[0_0_20px_rgba(251,146,60,0.6)] sm:block" />
              <span className="orbit-b pointer-events-none absolute left-1/2 top-1/2 hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/70 shadow-[0_0_18px_rgba(252,211,77,0.5)] sm:block" />
              <span className="orbit-c pointer-events-none absolute left-1/2 top-1/2 hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-400/70 shadow-[0_0_20px_rgba(251,113,133,0.5)] sm:block" />
            </>
          ) : null}

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-400/90">
              Let&apos;s build it together
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl font-bold leading-tight text-foreground text-balance sm:text-4xl md:text-5xl">
              Ready to ship outcomes with{" "}
              <span className="gradient-text">{serviceTitle}</span>?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Tell us your goals — we&apos;ll respond with a clear scope, timeline, and success
              definition. First response usually within one business day.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Magnetic strength={0.3}>
                <Button
                  onClick={() => open(`Service: ${serviceTitle} - Quote`)}
                  className="group min-h-[50px] px-8 py-3 text-base shadow-xl shadow-orange-500/25"
                >
                  Request a quote
                  <ArrowRight className="cta-arrow-nudge h-4 w-4" />
                </Button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Button
                  onClick={() => open(`Service: ${serviceTitle} - Talk`)}
                  variant="secondary"
                  className="min-h-[50px] gap-2 px-8 py-3 text-base"
                >
                  <PhoneCall className="h-4 w-4" />
                  Talk to us
                </Button>
              </Magnetic>
            </div>
          </div>
        </motion.div>
      </Container>

      <CtaFormModal
        isOpen={isOpen}
        onClose={close}
        title={`Get started with ${serviceTitle}`}
        subtitle="Share your details and we'll send you a custom proposal."
        source={source}
      />
    </section>
  );
}
