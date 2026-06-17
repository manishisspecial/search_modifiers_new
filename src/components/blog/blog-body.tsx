import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toMediaUrl } from "@/lib/media";

export interface KeywordLink {
  keyword: string;
  href: string;
}

/** Slugify heading text into a stable anchor id. */
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Flatten React markdown children into a plain string for id/text extraction. */
function nodeToText(node: React.ReactNode): string {
  if (node == null || node === false) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeToText).join("");
  if (typeof node === "object" && "props" in (node as Record<string, unknown>)) {
    // @ts-expect-error - React element children
    return nodeToText((node as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}

interface TocEntry {
  level: 2 | 3;
  text: string;
  id: string;
}

/** Extract a table of contents from markdown ## and ### headings. */
function extractToc(markdown: string): TocEntry[] {
  const lines = markdown.split("\n");
  const entries: TocEntry[] = [];
  let inFence = false;
  for (const line of lines) {
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = line.match(/^(#{2,3})\s+(.*)$/);
    if (match) {
      const level = match[1].length as 2 | 3;
      const text = match[2].replace(/[#*_`]/g, "").trim();
      if (text) entries.push({ level, text, id: slugifyHeading(text) });
    }
  }
  return entries;
}

/**
 * Preprocesses markdown content to inject internal links for the first
 * occurrence of each keyword. Skips code blocks, inline code, existing links,
 * and heading lines to avoid breaking markdown structure.
 */
function injectKeywordLinks(markdown: string, keywordLinks: KeywordLink[]): string {
  if (!keywordLinks.length) return markdown;

  let result = markdown;

  for (const { keyword, href } of keywordLinks) {
    if (!keyword.trim()) continue;

    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let replaced = false;

    // Split on fenced code blocks, inline code, and existing markdown links
    // Segments at odd indices are "protected" (code/links) — leave them untouched
    const parts = result.split(/(```[\s\S]*?```|`[^`]*`|\[.*?\]\(.*?\))/);

    result = parts
      .map((part, i) => {
        if (i % 2 !== 0 || replaced) return part;

        const lines = part.split("\n");
        const newLines = lines.map((line) => {
          if (replaced) return line;
          // Skip heading lines
          if (/^#{1,6}\s/.test(line)) return line;

          const regex = new RegExp(`\\b(${escaped})\\b`, "i");
          return line.replace(regex, (match) => {
            replaced = true;
            return `[${match}](${href})`;
          });
        });
        return newLines.join("\n");
      })
      .join("");
  }

  return result;
}

export function BlogBody({
  content,
  keywordLinks = [],
  showToc = true,
}: {
  content: string;
  keywordLinks?: KeywordLink[];
  showToc?: boolean;
}) {
  const processedContent = injectKeywordLinks(content, keywordLinks);
  const toc = extractToc(content);
  // Auto-show a table of contents when the article has enough headings.
  const renderToc = showToc && toc.length >= 2;

  return (
    <>
      {renderToc && (
        <nav
          aria-label="Table of contents"
          className="mb-10 rounded-2xl border border-border bg-card/60 p-6"
        >
          <p className="font-display text-sm font-semibold uppercase tracking-wider text-orange-400/90">
            Table of contents
          </p>
          <ol className="mt-4 space-y-2 text-sm">
            {toc.map((entry, i) => (
              <li key={`${entry.id}-${i}`} className={entry.level === 3 ? "pl-4" : ""}>
                <a
                  href={`#${entry.id}`}
                  className="text-foreground/70 transition-colors hover:text-orange-400"
                >
                  {entry.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
        h1: ({ children }) => (
          <h2
            id={slugifyHeading(nodeToText(children))}
            className="mt-12 scroll-mt-28 font-display text-2xl font-semibold text-foreground first:mt-0 sm:text-3xl"
          >
            {children}
          </h2>
        ),
        h2: ({ children }) => (
          <h2
            id={slugifyHeading(nodeToText(children))}
            className="mt-12 scroll-mt-28 font-display text-2xl font-semibold text-foreground first:mt-0 sm:text-3xl"
          >
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3
            id={slugifyHeading(nodeToText(children))}
            className="mt-8 scroll-mt-28 font-display text-xl font-semibold text-foreground sm:text-2xl"
          >
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mt-5 text-base leading-relaxed text-foreground/80 sm:text-lg">{children}</p>
        ),
        ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-foreground/80">{children}</ul>,
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
        table: ({ children }) => (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[28rem] border-collapse text-left text-sm text-foreground/85">{children}</table>
          </div>
        ),
        thead: ({ children }) => <thead className="bg-card text-foreground">{children}</thead>,
        tbody: ({ children }) => <tbody className="divide-y divide-border">{children}</tbody>,
        tr: ({ children }) => <tr className="transition-colors hover:bg-card/60">{children}</tr>,
        th: ({ children }) => (
          <th className="border-b border-border px-4 py-3.5 font-display font-semibold text-foreground">{children}</th>
        ),
        td: ({ children }) => <td className="px-4 py-3.5 text-muted">{children}</td>,
        img: ({ src, alt }) => (
          <img
            src={toMediaUrl(src)}
            alt={alt || ""}
            className="mt-6 rounded-xl border border-border"
            loading="lazy"
          />
        ),
        a: ({ href, children }) => {
          const resolvedHref = href ? toMediaUrl(href) : href;
          const isExt = resolvedHref?.startsWith("http");
          if (isExt) {
            return (
              <a href={resolvedHref} className="text-orange-400 underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          }
          return (
            <Link href={resolvedHref ?? "#"} className="text-orange-400 underline-offset-2 hover:underline">
              {children}
            </Link>
          );
        },
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </>
  );
}
