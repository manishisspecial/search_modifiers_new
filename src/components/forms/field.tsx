import { cn } from "@/lib/cn";

export function Field({
  label,
  error,
  children,
  htmlFor,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  htmlFor?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-foreground/80">
        {label}
      </label>
      {children}
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  );
}

export function inputClass(error?: boolean) {
  return cn(
    "w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted/60 outline-none transition",
    error
      ? "border-red-500/50 focus:border-red-400"
      : "border-border focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
  );
}
