/**
 * Normalizes the configured site URL to always use https + the `www.` host,
 * with no trailing slash. This keeps canonical/OG/sitemap URLs consistent
 * regardless of how NEXT_PUBLIC_SITE_URL is set in each environment.
 */
export function normalizeSiteUrl(raw: string): string {
  try {
    const u = new URL(raw.includes("://") ? raw : `https://${raw}`);
    u.protocol = "https:";
    if (!u.hostname.startsWith("www.")) {
      u.hostname = `www.${u.hostname}`;
    }
    return u.origin;
  } catch {
    return "https://www.searchmodifiers.com";
  }
}

export const siteDefaults = {
  name: "Search Modifiers",
  tagline: "Performance-led digital growth for ambitious brands",
  description:
    "Search Modifiers is a results-driven digital marketing agency specializing in online reputation management, PR, SEO, paid media, and web development helping brands control their online presence, build trust, and generate measurable business growth.",
  url: normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.searchmodifiers.com"),
  email: "hello@searchmodifiers.com",
  phone: "8851037172",
  phoneTel: "+918851037172",
  whatsapp: "918851037172",
  officeRegion: "Delhi NCR",
  officeBadge: "Corporate office",
  address: {
    street: "Poorvi Pitampura",
    city: "Pitampura",
    region: "Delhi",
    postalCode: "110034",
    country: "IN",
    detail:
      "Poorvi Pitampura, Pitampura, Delhi 110034, India",
  },
  googleMapsEmbedSrc:
    process.env.NEXT_PUBLIC_OFFICE_MAP_EMBED_URL?.trim() || undefined,
  social: {
    linkedin: "http://linkedin.com/company/search-modifiers/",
    twitter: "https://twitter.com/searchmodifiers",
    instagram: "https://www.instagram.com/searchmodifiers",
    facebook: "https://www.facebook.com/SearchModifiersIndia/",
    youtube: "https://www.youtube.com/@searchmodifiers",
  },
  trustBadges: [
    {
      label: "Google Partner",
      subtitle: "Premier",
      href: "https://www.google.com/partners/",
    },
    {
      label: "Semrush",
      subtitle: "Certified Agency Partner",
      href: "https://www.semrush.com/agency/partners/",
    },
    {
      label: "Clutch",
      subtitle: "4.5 ★★★★★",
      href: "https://clutch.co",
    },
  ],
  footerRatings: {
    google: {
      score: "4.1",
      maxScore: "5",
      href: "https://www.google.com/maps/search/?api=1&query=Search+Modifiers+New+Delhi",
    },
    clutch: {
      score: "4.5",
      href: "https://clutch.co",
    },
  },
};
