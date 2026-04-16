"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { X, Sparkles } from "lucide-react";

const STORAGE_KEY = "sm-sticky-cta-dismissed";

export function HomeStickyCta() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      try {
        if (sessionStorage.getItem(STORAGE_KEY)) setDismissed(true);
      } catch {
        /* ignore */
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (dismissed) return;
      setVisible(window.scrollY > 520);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  const close = () => {
    setDismissed(true);
    setVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <AnimatePresence>
      {visible && !dismissed ? (
        <motion.div
          initial={reduce ? false : { y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : { y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="fixed bottom-20 left-4 right-4 z-30 sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-md"
        >
          <div className="glass gradient-border relative flex items-center gap-4 rounded-2xl border border-orange-500/20 p-4 pr-10 shadow-2xl shadow-black/10">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/30 to-rose-500/20 text-orange-500">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">Free site audit — 2-day turnaround</p>
              <p className="mt-0.5 text-xs text-muted">Technical SEO, speed &amp; CRO notes you can ship.</p>
              <Link
                href="/free-website-audit"
                className="mt-2 inline-flex text-xs font-semibold uppercase tracking-wider text-orange-400 hover:text-orange-500"
              >
                Claim yours →
              </Link>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Dismiss"
              className="absolute right-3 top-3 rounded-lg p-1 text-muted/70 transition hover:bg-surface-hover hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
