"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StaticPage {
  id: string;
  slug: string;
  title: string;
}

export default function StaticPagesPage() {
  const [pages, setPages] = useState<StaticPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch("/api/admin/static-pages");
      const data = await response.json();
      setPages(data);
    } catch (error) {
      console.error("Failed to fetch pages", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      await fetch(`/api/admin/static-pages/${id}`, { method: "DELETE" });
      setPages(pages.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete page", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">
            Static Pages
          </h1>
          <p className="text-muted">Manage static content pages</p>
        </div>
        <Link href="/admin/static-pages/new">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Page
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 h-16 animate-pulse" />
          ))}
        </div>
      ) : pages.length > 0 ? (
        <div className="space-y-4">
          {pages.map((page) => (
            <div
              key={page.id}
              className="glass rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold font-display text-foreground">
                    {page.title}
                  </h3>
                  <p className="text-sm text-muted">/{page.slug}</p>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/static-pages/${page.id}`}>
                    <Button variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <button
                    onClick={() => handleDelete(page.id)}
                    className="p-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-12 border border-border text-center">
          <p className="text-muted mb-4">No static pages yet</p>
          <Link href="/admin/static-pages/new">
            <Button variant="primary">Create your first page</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
