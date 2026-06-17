import Link from "next/link";
import { ArrowUpRight, Calendar, Newspaper } from "lucide-react";
import { AnimatedSectionHeading } from "@/components/home/animated-section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { getRecentBlogPosts } from "@/lib/db-queries";
import type { HomeContent } from "@/lib/home-content";
import { toMediaUrl } from "@/lib/media";

interface BlogPostDisplay {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: { name: string } | null;
  featuredImage: string | null;
  featuredImageAlt: string | null;
}

function formatPostDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function thumbClass(category: string) {
  const map: Record<string, string> = {
    SEO: "from-sky-500/30 via-orange-500/12 to-rose-500/20",
    "Paid Media": "from-violet-500/25 via-orange-500/15 to-amber-500/15",
    Social: "from-rose-500/25 via-orange-500/12 to-amber-500/15",
    "Local SEO": "from-emerald-500/25 via-teal-500/10 to-orange-500/15",
    Content: "from-amber-500/25 via-orange-500/12 to-rose-500/15",
    Web: "from-slate-500/20 via-orange-500/10 to-amber-500/15",
  };
  return map[category] ?? "from-orange-500/25 via-amber-500/12 to-rose-500/20";
}

function BlogThumb({ category, image, alt, className }: { category: string; image?: string | null; alt?: string | null; className?: string }) {
  if (image) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <img src={toMediaUrl(image)} alt={alt || ""} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-gradient-to-br",
        thumbClass(category),
        className
      )}
    >
      <div className="noise-overlay absolute inset-0 opacity-40" />
      <Newspaper className="relative h-16 w-16 text-foreground/15 sm:h-20 sm:w-20" strokeWidth={1.25} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_45%)] opacity-50 dark:opacity-20" />
    </div>
  );
}

function ArrowOrb({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-rose-400 text-white shadow-md shadow-orange-500/25 transition duration-300 group-hover:scale-105 group-hover:shadow-orange-500/35",
        className
      )}
    >
      <ArrowUpRight className="h-4 w-4" aria-hidden />
    </span>
  );
}

function FeaturedCard({ post }: { post: BlogPostDisplay }) {
  const categoryName = post.category?.name || "Uncategorized";
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group glass relative flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-border transition duration-500 hover:border-orange-500/20 hover:shadow-xl hover:shadow-orange-500/10"
    >
      <BlogThumb category={categoryName} image={post.featuredImage} alt={post.featuredImageAlt} className="aspect-[16/10] w-full shrink-0 sm:aspect-[5/3]" />
      <div className="relative flex flex-1 flex-col p-6 sm:p-8">
        <span className="inline-flex w-fit rounded-full bg-orange-500/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-300">
          {categoryName}
        </span>
        <h3 className="mt-4 font-display text-xl font-semibold leading-snug tracking-tight text-foreground transition group-hover:text-orange-500 sm:text-2xl">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted sm:line-clamp-3">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted/80">
            <Calendar className="h-3.5 w-3.5 shrink-0 text-orange-400/90" aria-hidden />
            {formatPostDate(post.date)}
          </span>
          <ArrowOrb />
        </div>
      </div>
    </Link>
  );
}

function CompactCard({ post }: { post: BlogPostDisplay }) {
  const categoryName = post.category?.name || "Uncategorized";
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group glass flex min-h-[140px] gap-4 overflow-hidden rounded-2xl border border-border p-4 transition duration-500 hover:border-orange-500/20 hover:shadow-lg hover:shadow-orange-500/10 sm:min-h-[156px] sm:gap-5 sm:p-5 md:min-h-0"
    >
      <BlogThumb
        category={categoryName}
        image={post.featuredImage}
        alt={post.featuredImageAlt}
        className="h-full min-h-[120px] w-[min(38%,10rem)] shrink-0 self-stretch rounded-xl sm:min-h-[132px] sm:w-[min(36%,11rem)]"
      />
      <div className="relative flex min-w-0 flex-1 flex-col justify-center py-1">
        <span className="inline-flex w-fit max-w-full rounded-full bg-orange-500/12 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-300">
          {categoryName}
        </span>
        <h3 className="mt-2 font-display text-base font-semibold leading-snug tracking-tight text-foreground transition group-hover:text-orange-500 sm:text-lg">
          <span className="line-clamp-3">{post.title}</span>
        </h3>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted/80">
            <Calendar className="h-3.5 w-3.5 shrink-0 text-orange-400/90" aria-hidden />
            {formatPostDate(post.date)}
          </span>
          <ArrowOrb className="h-8 w-8 [&_svg]:h-3.5 [&_svg]:w-3.5" />
        </div>
      </div>
    </Link>
  );
}

export async function HomeBlogSection({ content }: { content?: HomeContent["blogHeading"] }) {
  const recent = await getRecentBlogPosts(3);
  if (recent.length === 0) return null;

  const c = content ?? {
    eyebrow: "Insights",
    title: "Related blog posts",
    description: "Long-form notes on SEO, paid media, social, and web — the same frameworks we ship for clients.",
    ctaLabel: "View all",
    ctaHref: "/blog",
  };

  const featured = recent[0];
  const stacked = recent.slice(1, 3);
  const hasSide = stacked.length > 0;

  return (
    <section className="relative py-24 sm:py-32">
      <div className="gradient-line absolute inset-x-0 top-0" />
      <Container>
        <AnimatedSectionHeading
          eyebrow={c.eyebrow}
          title={c.title}
          description={c.description}
        />

        <div
          className={cn(
            "mt-14 grid gap-6 lg:gap-8",
            hasSide ? "lg:grid-cols-12" : "lg:grid-cols-1"
          )}
        >
          <div className={hasSide ? "lg:col-span-7" : undefined}>
            <FadeIn>
              <FeaturedCard post={featured} />
            </FadeIn>
          </div>
          {hasSide ? (
            <div className="flex flex-col gap-6 lg:col-span-5">
              {stacked.map((post, i) => (
                <FadeIn key={post.slug} delay={0.06 + i * 0.06}>
                  <CompactCard post={post} />
                </FadeIn>
              ))}
            </div>
          ) : null}
        </div>

        <FadeIn className="mt-12 flex justify-center" delay={0.12}>
          <Button href={c.ctaHref} className="group px-8 py-3 text-base">
            {c.ctaLabel}
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
