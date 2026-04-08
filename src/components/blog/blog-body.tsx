import Link from "next/link";
import ReactMarkdown from "react-markdown";

export function BlogBody({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h2: ({ children }) => (
          <h2 className="mt-12 scroll-mt-28 font-display text-2xl font-semibold text-white first:mt-0 sm:text-3xl">
            {children}
          </h2>
        ),
        p: ({ children }) => (
          <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">{children}</p>
        ),
        ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-slate-300">{children}</ul>,
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
        a: ({ href, children }) => {
          const isExt = href?.startsWith("http");
          if (isExt) {
            return (
              <a href={href} className="text-cyan-400 underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          }
          return (
            <Link href={href ?? "#"} className="text-cyan-400 underline-offset-2 hover:underline">
              {children}
            </Link>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
