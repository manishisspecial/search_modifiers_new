"use client";

import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { ctaFormSchema, type CtaFormInput } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/forms/field";

const interests = [
  "SEO & Organic Growth",
  "Paid Media (PPC/Social Ads)",
  "Reputation Management",
  "Web Development",
  "Content Marketing",
  "Full-Service Digital Marketing",
  "Other",
];

interface CtaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  source?: string;
}

export function CtaFormModal({
  isOpen,
  onClose,
  title = "Let's talk growth",
  subtitle = "Share your details and we'll get back to you within one business day.",
  source,
}: CtaFormModalProps) {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CtaFormInput>({
    resolver: zodResolver(ctaFormSchema),
    defaultValues: { source: source || "" },
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleClose = useCallback(() => {
    if (status === "ok") {
      reset();
      setStatus("idle");
      setMsg("");
    }
    onClose();
  }, [onClose, reset, status]);

  async function onSubmit(data: CtaFormInput) {
    setStatus("idle");
    setMsg("");
    try {
      const res = await fetch("/api/cta-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: source || data.source }),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("err");
        setMsg(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("ok");
      setMsg(json.message ?? "Thanks! We'll be in touch soon.");
    } catch {
      setStatus("err");
      setMsg("Network error. Please try again.");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative w-full max-w-lg overflow-hidden rounded-2xl border border-border shadow-2xl"
          >
            <div className="noise-overlay rounded-2xl" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-rose-500/5" />
            
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 z-10 rounded-lg p-2 text-muted/70 transition hover:bg-surface-hover hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative p-6 sm:p-8">
              {status === "ok" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                    Message sent!
                  </h3>
                  <p className="mt-2 text-muted">{msg}</p>
                  <Button onClick={handleClose} className="mt-6">
                    Close
                  </Button>
                </motion.div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{subtitle}</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Name" htmlFor="cta-name" error={errors.name?.message}>
                        <input
                          id="cta-name"
                          className={inputClass(!!errors.name)}
                          placeholder="Your name"
                          {...register("name")}
                        />
                      </Field>
                      <Field label="Email" htmlFor="cta-email" error={errors.email?.message}>
                        <input
                          id="cta-email"
                          type="email"
                          className={inputClass(!!errors.email)}
                          placeholder="you@company.com"
                          {...register("email")}
                        />
                      </Field>
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Phone" htmlFor="cta-phone" error={errors.phone?.message}>
                        <input
                          id="cta-phone"
                          className={inputClass(!!errors.phone)}
                          placeholder="+91 …"
                          {...register("phone")}
                        />
                      </Field>
                      <Field label="Company (optional)" htmlFor="cta-company" error={errors.company?.message}>
                        <input
                          id="cta-company"
                          className={inputClass(!!errors.company)}
                          placeholder="Company name"
                          {...register("company")}
                        />
                      </Field>
                    </div>

                    <Field label="I'm interested in" htmlFor="cta-interest" error={errors.interest?.message}>
                      <select
                        id="cta-interest"
                        className={inputClass(!!errors.interest)}
                        {...register("interest")}
                      >
                        <option value="">Select your interest</option>
                        {interests.map((interest) => (
                          <option key={interest} value={interest}>
                            {interest}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <input type="hidden" {...register("source")} />

                    {status === "err" && (
                      <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                        {msg}
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full justify-center py-3"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Get started
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>
                  </form>

                  <p className="mt-4 text-center text-xs text-muted/70">
                    We respect your privacy. No spam, ever.
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function useCtaModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<string | undefined>();

  const open = useCallback((sourceLabel?: string) => {
    setSource(sourceLabel);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, source, open, close };
}
