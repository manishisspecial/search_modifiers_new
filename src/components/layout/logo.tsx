"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 transition-opacity duration-300 hover:opacity-80",
        className
      )}
    >
      {imgOk ? (
        <Image
          src="/logo.png"
          alt="Search Modifiers"
          width={180}
          height={44}
          className="h-9 w-auto max-w-[160px] object-contain sm:h-10 sm:max-w-[180px] brightness-0 dark:brightness-0 dark:invert"
          priority
          onError={() => setImgOk(false)}
        />
      ) : (
        <span className="font-display text-lg font-bold tracking-tight text-foreground sm:text-xl">
          Search{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Modifiers
          </span>
        </span>
      )}
    </Link>
  );
}
