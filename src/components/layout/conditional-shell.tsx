"use client";

import { usePathname } from "next/navigation";
import { MainShell } from "@/components/layout/main-shell";

/**
 * Conditionally wraps children in MainShell based on route.
 * Admin and auth routes render children directly without public site chrome.
 */
export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Routes that should NOT have the public site header/footer
  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthRoute = pathname.startsWith("/auth/signin");
  
  if (isAdminRoute || isAuthRoute) {
    return <>{children}</>;
  }
  
  return <MainShell>{children}</MainShell>;
}
