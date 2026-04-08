import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { PageTransition } from "@/components/motion/page-transition";
import { SmoothScrollProvider } from "@/components/motion/smooth-scroll-provider";

export function MainShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main className="flex-1 pt-[72px] lg:pt-[80px]">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <WhatsAppFloat />
    </SmoothScrollProvider>
  );
}
