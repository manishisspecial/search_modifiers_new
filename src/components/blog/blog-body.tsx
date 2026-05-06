import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface KeywordLink {
  keyword: string;
  href: string;
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
}: {
  content: string;
  keywordLinks?: KeywordLink[];
}) {
  const processedContent = injectKeywordLinks(content, keywordLinks);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 className="mt-12 scroll-mt-28 font-display text-2xl font-semibold text-foreground first:mt-0 sm:text-3xl">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-8 scroll-mt-28 font-display text-xl font-semibold text-foreground sm:text-2xl">{children}</h3>
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
        a: ({ href, children }) => {
          const isExt = href?.startsWith("http");
          if (isExt) {
            return (
              <a href={href} className="text-orange-400 underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          }
          return (
            <Link href={href ?? "#"} className="text-orange-400 underline-offset-2 hover:underline">
              {children}
            </Link>
          );
        },
      }}
    >
      {processedContent}
    </ReactMarkdown>
  );
}
