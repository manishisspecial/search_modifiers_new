/**
 * Rewrites Cloudinary delivery URLs to a same-origin path (`/media/...`).
 *
 * Cloudinary URLs look like:
 *   https://res.cloudinary.com/<cloud>/image/upload/v123/folder/file.png
 *
 * A matching rewrite in `next.config.ts` proxies `/media/:path*` back to
 * Cloudinary, so the browser only ever sees our own domain. This stops the
 * images from being flagged as external links and keeps them on-brand for SEO.
 */
export function toMediaUrl(url: string | null | undefined): string {
  if (!url) return "";
  // Strip the Cloudinary host + cloud name, leaving the resource path.
  const localized = url.replace(
    /^https?:\/\/res\.cloudinary\.com\/[^/]+\//i,
    "/media/"
  );
  return localized;
}
