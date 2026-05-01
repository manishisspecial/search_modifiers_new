"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { CtaFormModal, useCtaModal } from "@/components/forms/cta-form-modal";
import { useHasMounted } from "@/lib/use-has-mounted";

const bullets = ["No obligation on first call", "Clear scope & pricing after discovery", "Work with senior strategists only"];

export function HomeFinalCta() {
  const reduce = useReducedMotion();
  const mounted = useHasMounted();
  const { isOpen, source, open, close } = useCtaModal();

  return (
    <>
      <motion.section
        initial={reduce || !mounted ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <motion.div
          animate={reduce ? undefined : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 -z-10 rounded-[2rem] bg-[length:200%_200%] bg-gradient-to-r from-orange-500/15 via-amber-500/12 to-rose-500/15 opacity-80 blur-2xl"
        />
        <div className="glass gradient-border relative overflow-hidden rounded-[2rem] border border-border px-6 py-14 text-center sm:px-14 sm:py-16">
          <div className="noise-overlay rounded-[2rem]" />
          <motion.div
            className="absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-orange-500/20 blur-3xl"
            animate={reduce ? undefined : { scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-rose-500/20 blur-3xl"
            animate={reduce ? undefined : { scale: [1.1, 1, 1.1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl md:text-[2.75rem] md:leading-tight">
              Stop guessing — get a roadmap you can execute
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg">
              Book a strategy call or send your site for audit. We return prioritized recommendations within two business days — with
              owners and effort estimates.
            </p>
            <ul className="mx-auto mt-8 flex max-w-lg flex-col gap-2.5 text-left sm:mx-auto sm:max-w-md">
              {bullets.map((b) => (
                <li key={b} className="flex items-center justify-center gap-2 text-sm text-muted sm:justify-start">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500/90" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.div whileHover={reduce ? undefined : { scale: 1.03 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
                <Button
                  onClick={() => open("Homepage - Strategy Call")}
                  className="min-h-[52px] min-w-[200px] px-10 py-3.5 text-base shadow-xl shadow-orange-500/25"
                >
                  Schedule a strategy call
                </Button>
              </motion.div>
              <motion.div whileHover={reduce ? undefined : { scale: 1.03 }} whileTap={reduce ? undefined : { scale: 0.98 }}>
                <Button
                  onClick={() => open("Homepage - Quote Request")}
                  variant="secondary"
                  className="min-h-[52px] min-w-[200px] px-10 py-3.5 text-base"
                >
                  Request a formal quote
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <CtaFormModal
        isOpen={isOpen}
        onClose={close}
        title="Let's talk growth"
        subtitle="Share your details and we'll get back to you within one business day."
        source={source}
      />
    </>
  );
}
