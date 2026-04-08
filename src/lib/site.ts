export const site = {
  name: "Search Modifiers",
  tagline: "Performance-led digital growth for ambitious brands",
  description:
    "Search Modifiers is a full-service digital marketing agency delivering SEO, paid media, reputation management, and web experiences that convert — built for speed, clarity, and measurable ROI.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://searchmodifiers.com",
  email: "hello@searchmodifiers.com",
  phone: "+91 98765 43210",
  phoneTel: "+919876543210",
  whatsapp: "919876543210",
  address: {
    street: "Connaught Place",
    city: "New Delhi",
    region: "Delhi",
    postalCode: "110001",
    country: "IN",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/search-modifiers",
    twitter: "https://twitter.com/searchmodifiers",
    instagram: "https://www.instagram.com/searchmodifiers",
  },
} as const;
