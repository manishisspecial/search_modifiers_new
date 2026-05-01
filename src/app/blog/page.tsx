import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";
import { getPosts } from "@/lib/db-queries";
import { getSite } from "@/lib/get-site";
import { ArrowUpRight, Calendar } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: "Blog",
    description: "Insights on SEO, paid media, content, and web performance from the Search Modifiers team.",
    alternates: { canonical: `${site.url}/blog` },
  };
}

export default async function BlogPage() {
  const blogPosts = await getPosts();

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Practical notes from the delivery floor"
        description="No fluff listicles — essays we’d send to a smart colleague who actually runs campaigns."
      />
      <section className="pb-20 sm:pb-28">
        <Container>
          <Stagger className="grid gap-6 md:grid-cols-2">
            {blogPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <FadeIn>
                  <article className="glass group flex h-full flex-col rounded-2xl p-8 transition hover:border-orange-500/20">
                    <p className="text-xs font-semibold uppercase tracking-wider text-orange-400/90">{post.category}</p>
                    <h2 className="mt-3 font-display text-xl font-semibold text-foreground group-hover:text-orange-500 sm:text-2xl">
                      <Link href={`/blog/${post.slug}`} className="focus:outline-none focus-visible:text-orange-500">
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted/70">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span>{post.readTime}</span>
                      <span>{post.author}</span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-orange-400"
                    >
                      Read article <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </article>
                </FadeIn>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
