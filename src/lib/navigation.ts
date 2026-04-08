export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
  },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const servicesNav: NavItem[] = [
  { label: "Digital Marketing", href: "/services/digital-marketing" },
  { label: "SEO Services", href: "/services/seo-services" },
  { label: "Local SEO", href: "/services/local-seo" },
  { label: "E-commerce SEO", href: "/services/ecommerce-seo" },
  { label: "Technical SEO", href: "/services/technical-seo" },
  { label: "Social Media Marketing", href: "/services/social-media-marketing" },
  { label: "Google Ads", href: "/services/google-ads" },
  { label: "Facebook Ads", href: "/services/facebook-ads" },
  { label: "ORM", href: "/services/online-reputation-management" },
  { label: "Brand Management", href: "/services/brand-management" },
  { label: "Content Marketing", href: "/services/content-marketing" },
  { label: "Influencer Marketing", href: "/services/influencer-marketing" },
  { label: "Website Development", href: "/services/website-development" },
];

export const locationsNav: NavItem[] = [
  { label: "Delhi", href: "/locations/digital-marketing-delhi" },
  { label: "Noida", href: "/locations/digital-marketing-noida" },
  { label: "Gurgaon", href: "/locations/digital-marketing-gurgaon" },
  { label: "SEO Delhi NCR", href: "/locations/seo-delhi-ncr" },
  { label: "ORM Delhi", href: "/locations/orm-delhi" },
];

export const footerColumns: { title: string; links: NavItem[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: servicesNav.slice(0, 6),
  },
  {
    title: "More services",
    links: [...servicesNav.slice(6), { label: "All services", href: "/services/digital-marketing" }],
  },
  {
    title: "Locations",
    links: locationsNav,
  },
  {
    title: "Resources",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Free Website Audit", href: "/free-website-audit" },
      { label: "Request a Quote", href: "/request-quote" },
    ],
  },
];
