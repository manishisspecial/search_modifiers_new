import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { ConditionalShell } from "@/components/layout/conditional-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/components/providers";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";
import { getSite } from "@/lib/get-site";
import { SiteProvider } from "@/lib/site-context";
import { NavProvider } from "@/lib/nav-context";
import { getMainNav, getServicesNav, getLocationsNav } from "@/lib/db-queries";
import {
  mainNav as staticMainNav,
  servicesNav as staticServicesNav,
  locationsNav as staticLocationsNav,
} from "@/lib/navigation";

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

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
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
}

export const viewport: Viewport = {
  themeColor: "#f8fafc",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSite();

  const [dbMain, dbServices, dbLocations] = await Promise.all([
    getMainNav(),
    getServicesNav(),
    getLocationsNav(),
  ]);

  const navData = {
    mainNav: dbMain.length > 0 ? dbMain.map((n) => ({ label: n.label, href: n.href })) : staticMainNav,
    servicesNav: dbServices.length > 0 ? dbServices.map((n) => ({ label: n.label, href: n.href })) : staticServicesNav,
    locationsNav: dbLocations.length > 0 ? dbLocations.map((n) => ({ label: n.label, href: n.href })) : staticLocationsNav,
  };

  return (
    <html
      lang="en"
      className={`light ${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased`}
      style={{ colorScheme: "light" }}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="mesh-bg flex min-h-full flex-col text-foreground" suppressHydrationWarning>
        <Providers>
          <ThemeProvider>
            <SiteProvider value={siteSettings}>
              <NavProvider value={navData}>
                <OrganizationJsonLd />
                <WebSiteJsonLd />
                <ConditionalShell>{children}</ConditionalShell>
              </NavProvider>
            </SiteProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
