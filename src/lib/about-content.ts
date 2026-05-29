import { getPageContent } from "@/lib/db-queries";

export type AboutContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  story: {
    heading: string;
    paragraphs: string[];
  };
};

export const defaultAboutContent: AboutContent = {
  hero: {
    eyebrow: "About",
    title: "We're operators, not deck factories",
    description:
      "Search Modifiers started as a specialist SEO studio and evolved into a full-funnel partner — because growth doesn't respect channel silos.",
  },
  story: {
    heading: "Our story",
    paragraphs: [
      "We built Search Modifiers for teams tired of juggling five agencies with five excuses. Today we run integrated programs across SEO, paid media, ORM, content, and web — with one accountable pod and one north star: sustainable revenue impact.",
      "Headquartered in Noida, we serve Delhi NCR on-site and global clients remotely with the same sprint cadence and documentation standards.",
    ],
  },
};

function mergeAboutContent(partial: unknown): AboutContent {
  const p = (partial && typeof partial === "object" ? partial : {}) as Partial<AboutContent>;
  return {
    hero: { ...defaultAboutContent.hero, ...(p.hero ?? {}) },
    story: {
      ...defaultAboutContent.story,
      ...(p.story ?? {}),
      paragraphs: p.story?.paragraphs?.length
        ? p.story.paragraphs
        : defaultAboutContent.story.paragraphs,
    },
  };
}

export async function getAboutContent(): Promise<AboutContent> {
  const record = await getPageContent("about-hero");
  if (!record || !record.fields) return defaultAboutContent;
  return mergeAboutContent(record.fields);
}
