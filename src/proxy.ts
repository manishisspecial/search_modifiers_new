import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

let redirectCache: { fromPath: string; toPath: string; type: number }[] = [];
let cacheTimestamp = 0;
const CACHE_TTL = 60_000;

async function getRedirects(baseUrl: string) {
  const now = Date.now();
  if (now - cacheTimestamp < CACHE_TTL) {
    return redirectCache;
  }

  try {
    const res = await fetch(`${baseUrl}/api/admin/redirects/active`, {
      cache: "no-store",
    });
    if (res.ok) {
      redirectCache = await res.json();
      cacheTimestamp = now;
    }
  } catch {
    // Use stale cache on failure
  }
  return redirectCache;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin route protection
  if (pathname.startsWith("/admin")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }

    return NextResponse.next();
  }

  // Skip API, static, and asset paths for redirect checks
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Redirect handling
  const baseUrl = request.nextUrl.origin;
  const redirects = await getRedirects(baseUrl);
  const match = redirects.find((r) => r.fromPath === pathname);

  if (match) {
    const isExternal = match.toPath.startsWith("http");
    if (isExternal) {
      return NextResponse.redirect(new URL(match.toPath), match.type as 301 | 302 | 307);
    }
    const url = request.nextUrl.clone();
    url.pathname = match.toPath;
    return NextResponse.redirect(url, match.type as 301 | 302 | 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
