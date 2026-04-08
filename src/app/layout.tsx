import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { MainShell } from "@/components/layout/main-shell";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Digital Marketing & SEO Agency`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "digital marketing agency",
    "SEO services",
    "Google Ads",
    "Facebook Ads",
    "ORM",
    "Delhi NCR",
    "Search Modifiers",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Digital Marketing & SEO Agency`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Digital Marketing & SEO Agency`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: site.url },
};

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <body suppressHydrationWarning className="mesh-bg flex min-h-full flex-col text-slate-100">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <MainShell>{children}</MainShell>
      </body>
    </html>
  );
}
