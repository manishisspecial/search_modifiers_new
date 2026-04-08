"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { toggle, mounted } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300",
        "border border-border bg-surface-hover hover:bg-surface-hover",
        "text-muted hover:text-foreground",
        !mounted && "opacity-0",
        className
      )}
    >
      <Sun className="absolute h-4 w-4 transition-all duration-300 scale-100 rotate-0 opacity-100 dark:scale-0 dark:rotate-90 dark:opacity-0" />
      <Moon className="absolute h-4 w-4 transition-all duration-300 scale-0 -rotate-90 opacity-0 dark:scale-100 dark:rotate-0 dark:opacity-100" />
    </button>
  );
}
