"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/forms/field";
import { Loader2 } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    setStatus("idle");
    setMsg("");
    const res = await fetch("/api/contact", {
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
        <Field label="Name" htmlFor="name" error={errors.name?.message}>
          <input id="name" className={inputClass(!!errors.name)} placeholder="Your name" {...register("name")} />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            className={inputClass(!!errors.email)}
            placeholder="you@company.com"
            {...register("email")}
          />
        </Field>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Phone" htmlFor="phone" error={errors.phone?.message}>
          <input id="phone" className={inputClass(!!errors.phone)} placeholder="+91 …" {...register("phone")} />
        </Field>
        <Field label="Company (optional)" htmlFor="company" error={errors.company?.message}>
          <input id="company" className={inputClass(!!errors.company)} placeholder="Company name" {...register("company")} />
        </Field>
      </div>
      <Field label="How can we help?" htmlFor="message" error={errors.message?.message}>
        <textarea
          id="message"
          rows={5}
          className={inputClass(!!errors.message) + " resize-y min-h-[120px]"}
          placeholder="Goals, timeline, channels…"
          {...register("message")}
        />
      </Field>
      {status === "ok" ? (
        <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">{msg}</p>
      ) : null}
      {status === "err" ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{msg}</p>
      ) : null}
      <Button type="submit" disabled={isSubmitting} className="min-w-[160px]">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}
