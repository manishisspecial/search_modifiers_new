"use client";

import { useEffect, useState } from "react";
import { Save, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const DEFAULT_ROBOTS = `User-agent: *
Allow: /
Disallow: /api/`;

export default function SeoToolsPage() {
  const [robotsTxt, setRobotsTxt] = useState(DEFAULT_ROBOTS);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sitemapInfo, setSitemapInfo] = useState<{ urlCount: number } | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/seo");
      if (res.ok) {
        const data = await res.json();
        if (data.robotsTxt) setRobotsTxt(data.robotsTxt);
        if (data.sitemapInfo) setSitemapInfo(data.sitemapInfo);
      }
    } catch (error) {
      console.error("Failed to fetch SEO settings", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ robotsTxt }),
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("Robots.txt saved successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save robots.txt");
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface rounded w-1/3" />
          <div className="glass rounded-2xl p-6 h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-display text-foreground">
          SEO Tools
        </h1>
        <p className="text-muted">Manage sitemap and robots.txt configuration</p>
      </div>

      {/* Sitemap Status */}
      <div className="glass rounded-2xl p-6 border border-border">
        <h2 className="text-xl font-bold font-display text-foreground mb-4">
          Sitemap
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">
              Sitemap is auto-generated and updates on every publish action.
            </p>
            {sitemapInfo && (
              <p className="text-sm text-foreground mt-1">
                Currently indexing <strong>{sitemapInfo.urlCount}</strong> URLs
              </p>
            )}
          </div>
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-orange-500 hover:underline"
          >
            View sitemap.xml
          </a>
        </div>
      </div>

      {/* Robots.txt Editor */}
      <div className="glass rounded-2xl p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold font-display text-foreground">
            Robots.txt
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setRobotsTxt(DEFAULT_ROBOTS)}
            >
              <RefreshCw className="w-4 h-4" />
              Reset to Default
            </Button>
            <Button
              variant="primary"
              className="flex items-center gap-2"
              onClick={handleSave}
              disabled={saving}
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted mb-3">
          Controls which pages search engines can crawl. The sitemap URL is
          automatically appended.
        </p>
        <textarea
          value={robotsTxt}
          onChange={(e) => setRobotsTxt(e.target.value)}
          rows={10}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand resize-vertical"
          placeholder="User-agent: *&#10;Allow: /&#10;Disallow: /api/"
        />
        <p className="text-xs text-muted mt-2">
          Syntax: Each directive on its own line. Use &quot;User-agent:&quot;,
          &quot;Allow:&quot;, and &quot;Disallow:&quot; directives.
        </p>
      </div>
    </div>
  );
}
