"use client";

import { usePathname } from "next/navigation";

/**
 * Conditionally shows publicShell (with header/footer) or bare children.
 * MainShell is rendered on the server and passed as the `publicShell` prop,
 * keeping it (and its async children like Footer) as Server Components.
 */
export function ConditionalShell({
  children,
  publicShell,
}: {
  children: React.ReactNode;
  publicShell: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthRoute = pathname.startsWith("/auth/signin");

  if (isAdminRoute || isAuthRoute) {
    return <>{children}</>;
  }

  return <>{publicShell}</>;
}
