export const site = {
  name: "Search Modifiers",
  tagline: "Performance-led digital growth for ambitious brands",
  description:
    "Search Modifiers is a results-driven digital marketing agency specializing in online reputation management, PR, SEO, paid media, and web development helping brands control their online presence, build trust, and generate measurable business growth.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://searchmodifiers.com",
  email: "hello@searchmodifiers.com",
  phone: "8851037172",
  phoneTel: "+918851037172",
  whatsapp: "918851037172",
  /** Region label for the office section heading */
  officeRegion: "Delhi NCR",
  /** Badge pill above the address */
  officeBadge: "Corporate office",
  address: {
    street: "Poorvi Pitampura",
    city: "Pitampura",
    region: "Delhi",
    postalCode: "110034",
    country: "IN",
    /** Full street-style block for the office card (keep in sync with map embed) */
    detail:
      "Poorvi Pitampura, Pitampura, Delhi 110034, India",
  },
  /**
   * Optional Google Maps embed `src`. When unset, a generic embed is built from `address.detail`.
   * Paste the full `src` from Maps → Share → Embed for pixel-perfect pins.
   */
  googleMapsEmbedSrc:
    process.env.NEXT_PUBLIC_OFFICE_MAP_EMBED_URL?.trim() || undefined,
  social: {
    linkedin: "http://linkedin.com/company/search-modifiers/",
    twitter: "https://twitter.com/searchmodifiers",
    instagram: "https://www.instagram.com/searchmodifiers",
    /** Replace with your live profiles */
    facebook: "https://www.facebook.com/SearchModifiersIndia/",
    youtube: "https://www.youtube.com/@searchmodifiers",
  },
  /** Partner / trust row above link columns — update `href`s to your profiles */
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
  /** Bottom bar review callouts — point `href` to your Google Business reviews & Clutch profile */
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
} as const;
