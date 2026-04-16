import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-orange-400/90">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">This page drifted off SERP</h1>
      <p className="mt-4 max-w-md text-muted">The URL may have moved. Try the homepage or contact us for help.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button href="/">Back home</Button>
        <Button href="/contact" variant="outline">
          Contact
        </Button>
      </div>
    </Container>
  );
}
