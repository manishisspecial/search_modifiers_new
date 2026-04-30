"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface FormLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  submitLabel?: string;
}

export function FormLayout({
  title,
  description,
  children,
  onSubmit,
  isLoading = false,
  submitLabel = "Save",
}: FormLayoutProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold font-display text-foreground mb-2">
          {title}
        </h1>
        {description && <p className="text-muted">{description}</p>}
      </div>

      <div className="glass rounded-2xl p-6 border border-border space-y-6">
        {children}
      </div>

      <div className="flex gap-2">
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

export function FormField({
  label,
  error,
  required = false,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
        {required && <span className="text-brand ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}

export function FormInput({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent ${className}`}
      {...props}
    />
  );
}

export function FormTextarea({
  placeholder,
  value,
  onChange,
  rows = 4,
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent resize-vertical ${className}`}
      {...props}
    />
  );
}
