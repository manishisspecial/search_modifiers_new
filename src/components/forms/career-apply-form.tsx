"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

interface CareerApplyFormProps {
  roleTitle: string;
}

export function CareerApplyForm({ roleTitle }: CareerApplyFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, roleTitle }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.error
            ? Array.isArray(data.error)
              ? data.error[0]?.message || "Validation failed"
              : data.error
            : "Submission failed"
        );
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", coverLetter: "" });
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:border-orange-500/50 hover:shadow-md"
      >
        Apply
      </button>
    );
  }

  if (submitted) {
    return (
      <div className="mt-4 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-4 flex items-center gap-3">
        <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
        <div>
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Application submitted!</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">We&apos;ll review and get back to you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 rounded-xl border border-border bg-card/80 p-4 space-y-3">
      <p className="text-xs font-medium text-muted uppercase tracking-wider">Apply for: {roleTitle}</p>

      {error && (
        <p className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">{error}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          required
          placeholder="Full Name *"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-card text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
        />
        <input
          type="email"
          required
          placeholder="Email *"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-card text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
        />
      </div>

      <input
        type="tel"
        placeholder="Phone (optional)"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-card text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
      />

      <textarea
        placeholder="Why are you a good fit for this role? (optional)"
        value={formData.coverLetter}
        onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
        rows={3}
        className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-card text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-orange-500/40 resize-none"
      />

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-rose-500 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="text-xs text-muted hover:text-foreground transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
