"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema, type QuoteInput } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/forms/field";
import { services } from "@/lib/services-data";
import { Loader2 } from "lucide-react";

const budgets = [
  "Under ₹50,000 / month",
  "₹50,000 – ₹1,50,000 / month",
  "₹1,50,000 – ₹4,00,000 / month",
  "₹4,00,000+ / month",
  "Project-based (one-time)",
];

const timelines = ["ASAP", "Within 30 days", "1–3 months", "3+ months / retainer"];

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput>({ resolver: zodResolver(quoteSchema) });

  async function onSubmit(data: QuoteInput) {
    setStatus("idle");
    setMsg("");
    const res = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      setStatus("err");
      setMsg(json.error ?? "Something went wrong");
      return;
    }
    setStatus("ok");
    setMsg(json.message ?? "Sent.");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" htmlFor="qname" error={errors.name?.message}>
          <input id="qname" className={inputClass(!!errors.name)} placeholder="Your name" {...register("name")} />
        </Field>
        <Field label="Email" htmlFor="qemail" error={errors.email?.message}>
          <input
            id="qemail"
            type="email"
            className={inputClass(!!errors.email)}
            placeholder="you@company.com"
            {...register("email")}
          />
        </Field>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Phone" htmlFor="qphone" error={errors.phone?.message}>
          <input id="qphone" className={inputClass(!!errors.phone)} placeholder="+91 …" {...register("phone")} />
        </Field>
        <Field label="Company" htmlFor="qcompany" error={errors.company?.message}>
          <input id="qcompany" className={inputClass(!!errors.company)} placeholder="Company name" {...register("company")} />
        </Field>
      </div>
      <Field label="Primary service" htmlFor="service" error={errors.service?.message}>
        <select id="service" className={inputClass(!!errors.service)} {...register("service")}>
          <option value="">Select a service</option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </Field>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Budget range" htmlFor="budget" error={errors.budget?.message}>
          <select id="budget" className={inputClass(!!errors.budget)} {...register("budget")}>
            <option value="">Select budget</option>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Timeline" htmlFor="timeline" error={errors.timeline?.message}>
          <select id="timeline" className={inputClass(!!errors.timeline)} {...register("timeline")}>
            <option value="">Select timeline</option>
            {timelines.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Project details" htmlFor="details" error={errors.details?.message}>
        <textarea
          id="details"
          rows={6}
          className={inputClass(!!errors.details) + " resize-y min-h-[140px]"}
          placeholder="Scope, markets, competitors, success metrics…"
          {...register("details")}
        />
      </Field>
      {status === "ok" ? (
        <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{msg}</p>
      ) : null}
      {status === "err" ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{msg}</p>
      ) : null}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending
          </>
        ) : (
          "Submit request"
        )}
      </Button>
    </form>
  );
}
