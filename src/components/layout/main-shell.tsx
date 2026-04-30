import { Navbar } from "@/components/layout/navbar";
import { TopBar } from "@/components/layout/top-bar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";

export function MainShell({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
