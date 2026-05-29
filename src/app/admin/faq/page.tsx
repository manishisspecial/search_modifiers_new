"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FaqItem {
  id: string;
  q: string;
  a: string;
  placement?: string;
  targetSlug?: string | null;
  order: number;
}

const PLACEMENT_LABELS: Record<string, string> = {
  PAGE: "Page",
  BLOG: "Blog",
  COUNTRY: "Country Pages",
  CITY: "City Pages",
};

export default function FaqAdminPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await fetch("/api/admin/faq");
      const data = await response.json();
      setFaqs(data);
    } catch (error) {
      console.error("Failed to fetch FAQ items", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      await fetch(`/api/admin/faq/${id}`, { method: "DELETE" });
      setFaqs(faqs.filter((f) => f.id !== id));
    } catch (error) {
      console.error("Failed to delete FAQ item", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">
            FAQ
          </h1>
          <p className="text-muted">Manage frequently asked questions</p>
        </div>
        <Link href="/admin/faq/new">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New FAQ
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 h-32 animate-pulse" />
          ))}
        </div>
      ) : faqs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="glass rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="space-y-2 mb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-1.5 py-0.5 text-[10px] rounded bg-orange-500/10 text-orange-500 border border-orange-500/20">
                    {PLACEMENT_LABELS[faq.placement || "PAGE"]}
                  </span>
                  {faq.targetSlug ? (
                    <span className="px-1.5 py-0.5 text-[10px] rounded bg-surface text-muted border border-border font-mono">
                      {faq.targetSlug}
                    </span>
                  ) : (
                    <span className="text-[10px] text-muted/70">all</span>
                  )}
                  <span className="text-[10px] text-muted/70">· seq {faq.order}</span>
                </div>
                <p className="font-semibold text-foreground line-clamp-2">{faq.q}</p>
                <p className="text-sm text-muted line-clamp-2">{faq.a}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/faq/${faq.id}`} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </Link>
                <button
                  onClick={() => handleDelete(faq.id)}
                  className="px-4 py-2 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-12 border border-border text-center">
          <p className="text-muted mb-4">No FAQ items yet</p>
          <Link href="/admin/faq/new">
            <Button variant="primary">Add your first FAQ</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
