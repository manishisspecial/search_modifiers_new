import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { LensCursor } from "@/components/motion/lens-cursor";
import { PageTransition } from "@/components/motion/page-transition";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";

export function MainShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <LensCursor />
      <ScrollProgress />
      <Navbar />
      <main className="flex-1 pt-[72px] lg:pt-[80px]">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <WhatsAppFloat />
    </SmoothScrollProvider>
  );
}
