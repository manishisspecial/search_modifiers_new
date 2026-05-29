import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { ConditionalShell } from "@/components/layout/conditional-shell";
import { MainShell } from "@/components/layout/main-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/components/providers";
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
    template: `%s`,
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
  themeColor: "#f8fafc",
  width: "device-width",
  initialScale: 1,
};

// Content is admin-managed (DB-backed). Render dynamically so edits in the
// admin panel reflect on the public site immediately without a rebuild.
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`light ${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <body className="mesh-bg flex min-h-full flex-col text-foreground" suppressHydrationWarning>
        <Providers>
          <ThemeProvider>
            <OrganizationJsonLd />
            <WebSiteJsonLd />
            <ConditionalShell
              publicShell={<MainShell>{children}</MainShell>}
            >
              {children}
            </ConditionalShell>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
