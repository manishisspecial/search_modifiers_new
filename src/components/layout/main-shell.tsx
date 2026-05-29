import { Navbar } from "@/components/layout/navbar";
import { TopBar } from "@/components/layout/top-bar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";
import { NavProvider } from "@/lib/nav-context";
import { getMainNav, getServicesNav, getLocationsNav } from "@/lib/db-queries";
import { mainNav, servicesNav, locationsNav } from "@/lib/navigation";

export async function MainShell({ children }: { children: React.ReactNode }) {
  const [dbMain, dbServices, dbLocations] = await Promise.all([
    getMainNav(),
    getServicesNav(),
    getLocationsNav(),
  ]);

  const toItems = (rows: { label: string; href: string }[]) =>
    rows.map((r) => ({ label: r.label, href: r.href }));

  // Fall back to the static defaults when a category has no DB entries yet,
  // so the site always has a usable menu.
  const navData = {
    mainNav: dbMain.length ? toItems(dbMain) : mainNav,
    servicesNav: dbServices.length ? toItems(dbServices) : servicesNav,
    locationsNav: dbLocations.length ? toItems(dbLocations) : locationsNav,
  };

  return (
    <NavProvider value={navData}>
      <SmoothScrollProvider>
        <ScrollProgress />
        <TopBar />
        <Navbar />
        <main className="flex-1 pt-[112px] lg:pt-[120px]">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <WhatsAppFloat />
      </SmoothScrollProvider>
    </NavProvider>
  );
}
