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
      <label htmlFor={htmlFor} className="text-sm font-medium text-slate-300">
        {label}
      </label>
      {children}
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </div>
  );
}

export function inputClass(error?: boolean) {
  return cn(
    "w-full rounded-xl border bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition",
    error
      ? "border-red-500/50 focus:border-red-400"
      : "border-white/10 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
  );
}
