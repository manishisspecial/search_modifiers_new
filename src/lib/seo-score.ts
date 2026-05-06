export interface SeoScoreResult {
  score: number;
  issues: string[];
  passes: string[];
}

interface SeoScoreInput {
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  featuredImageAlt: string;
  content: string;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function computeSeoScore(data: SeoScoreInput): SeoScoreResult {
  const issues: string[] = [];
  const passes: string[] = [];
  let score = 100;

  const kw = data.primaryKeyword.toLowerCase().trim();
  const contentLower = data.content.toLowerCase();
  const metaTitleLower = data.metaTitle.toLowerCase();
  const metaDescLower = data.metaDescription.toLowerCase();
  const h1Lower = data.title.toLowerCase();

  // ── Meta Title ──────────────────────────────────────────────────────────
  if (!data.metaTitle) {
    issues.push("Missing meta title");
    score -= 15;
  } else if (data.metaTitle.length > 60) {
    issues.push(`Meta title too long (${data.metaTitle.length} chars, max 60)`);
    score -= 5;
  } else if (data.metaTitle.length < 30) {
    issues.push(`Meta title too short (${data.metaTitle.length} chars, aim for 30–60)`);
    score -= 3;
  } else {
    passes.push("Meta title length is optimal");
  }

  // ── Meta Description ─────────────────────────────────────────────────────
  if (!data.metaDescription) {
    issues.push("Missing meta description");
    score -= 15;
  } else if (data.metaDescription.length > 160) {
    issues.push(`Meta description too long (${data.metaDescription.length} chars, max 160)`);
    score -= 5;
  } else if (data.metaDescription.length < 50) {
    issues.push(`Meta description too short (${data.metaDescription.length} chars, aim for 50–160)`);
    score -= 5;
  } else {
    passes.push("Meta description length is optimal");
  }

  // ── Primary Keyword ──────────────────────────────────────────────────────
  if (!kw) {
    issues.push("No primary keyword assigned");
    score -= 10;
  } else {
    // Keyword in meta title
    if (data.metaTitle) {
      if (!metaTitleLower.includes(kw)) {
        issues.push("Primary keyword missing from meta title");
        score -= 5;
      } else {
        passes.push("Keyword found in meta title");
      }
    }

    // Keyword in meta description
    if (data.metaDescription) {
      if (!metaDescLower.includes(kw)) {
        issues.push("Primary keyword missing from meta description");
        score -= 4;
      } else {
        passes.push("Keyword found in meta description");
      }
    }

    // Keyword in H1 title
    if (data.title) {
      if (!h1Lower.includes(kw)) {
        issues.push("Primary keyword missing from H1 title");
        score -= 3;
      } else {
        passes.push("Keyword found in H1 title");
      }
    }

    // Keyword in content
    if (!data.content) {
      issues.push("No content — keyword cannot be validated");
      score -= 8;
    } else {
      if (!contentLower.includes(kw)) {
        issues.push("Primary keyword not found in content body");
        score -= 8;
      } else {
        // Keyword in first paragraph
        const firstPara = contentLower.split(/\n\n/)[0] ?? "";
        if (!firstPara.includes(kw)) {
          issues.push("Keyword not in opening paragraph (add it early)");
          score -= 3;
        } else {
          passes.push("Keyword appears in opening paragraph");
        }

        // Keyword density
        const cleanContent = data.content.replace(/[#*`>\[\]()!\-_~]/g, " ");
        const wordCount = cleanContent.trim().split(/\s+/).filter(Boolean).length;
        const kwWordCount = kw.split(/\s+/).length;
        const kwMatches = (
          cleanContent
            .toLowerCase()
            .match(new RegExp(escapeRegex(kw), "g")) ?? []
        ).length;
        const density =
          wordCount > 0 ? (kwMatches * kwWordCount) / wordCount * 100 : 0;

        if (density < 0.3) {
          issues.push(
            `Keyword density too low (${density.toFixed(1)}%, aim for 0.5–2%)`
          );
          score -= 3;
        } else if (density > 3) {
          issues.push(
            `Keyword density too high (${density.toFixed(1)}%, avoid stuffing)`
          );
          score -= 5;
        } else {
          passes.push(`Keyword density is good (${density.toFixed(1)}%)`);
        }
      }

      // Keyword in a heading
      const headings = (data.content.match(/^#{1,6}\s+.+$/gm) ?? []).map((h) =>
        h.toLowerCase()
      );
      if (headings.length > 0) {
        const kwInHeading = headings.some((h) => h.includes(kw));
        if (!kwInHeading) {
          issues.push("Keyword not found in any heading (H1–H6)");
          score -= 3;
        } else {
          passes.push("Keyword found in a heading");
        }
      }
    }
  }

  // ── Images ───────────────────────────────────────────────────────────────
  if (!data.featuredImageAlt) {
    issues.push("Missing featured image alt text");
    score -= 8;
  } else {
    passes.push("Featured image has alt text");
  }

  // Content images without alt text  (markdown syntax: ![alt](url))
  const imgMatches = [...data.content.matchAll(/!\[([^\]]*)\]\([^)]+\)/g)];
  const missingAlt = imgMatches.filter((m) => !m[1].trim()).length;
  if (missingAlt > 0) {
    issues.push(
      `${missingAlt} content image${missingAlt > 1 ? "s" : ""} missing alt text`
    );
    score -= Math.min(7, missingAlt * 3);
  } else if (imgMatches.length > 0) {
    passes.push("All content images have alt text");
  }

  // ── Content Quality ───────────────────────────────────────────────────────
  const totalWords = data.content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  if (totalWords < 300) {
    issues.push(
      `Content too short (${totalWords} words — aim for 300+ for SEO value)`
    );
    score -= 5;
  } else {
    passes.push(`Good content length (${totalWords} words)`);
  }

  const h2Count = (data.content.match(/^#{2}\s/gm) ?? []).length;
  if (h2Count === 0) {
    issues.push("No H2 headings — structure content with subheadings");
    score -= 5;
  } else {
    passes.push(
      `Content has ${h2Count} H2 subheading${h2Count > 1 ? "s" : ""}`
    );
  }

  return { score: Math.max(0, score), issues, passes };
}
