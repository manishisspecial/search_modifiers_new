"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auditSchema, type AuditInput } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/forms/field";
import { Loader2 } from "lucide-react";

export function AuditForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AuditInput>({ resolver: zodResolver(auditSchema) });

  async function onSubmit(data: AuditInput) {
    setStatus("idle");
    setMsg("");
    const res = await fetch("/api/audit", {
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
        <Field label="Name" htmlFor="aname" error={errors.name?.message}>
          <input id="aname" className={inputClass(!!errors.name)} placeholder="Your name" {...register("name")} />
        </Field>
        <Field label="Email" htmlFor="aemail" error={errors.email?.message}>
          <input
            id="aemail"
            type="email"
            className={inputClass(!!errors.email)}
            placeholder="you@company.com"
            {...register("email")}
          />
        </Field>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Phone" htmlFor="aphone" error={errors.phone?.message}>
          <input id="aphone" className={inputClass(!!errors.phone)} placeholder="+91 …" {...register("phone")} />
        </Field>
        <Field label="Website URL" htmlFor="website" error={errors.website?.message}>
          <input
            id="website"
            className={inputClass(!!errors.website)}
            placeholder="https://example.com"
            {...register("website")}
          />
        </Field>
      </div>
      <Field label="Goals & context" htmlFor="goals" error={errors.goals?.message}>
        <textarea
          id="goals"
          rows={6}
          className={inputClass(!!errors.goals) + " resize-y min-h-[140px]"}
          placeholder="What should the audit prioritize? (SEO, speed, CRO, paid landing pages…)"
          {...register("goals")}
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
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting
          </>
        ) : (
          "Request audit"
        )}
      </Button>
    </form>
  );
}
