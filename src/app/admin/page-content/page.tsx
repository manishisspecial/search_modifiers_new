"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageContentItem {
  id: string;
  slug: string;
  title: string;
  fields: Record<string, unknown>;
  updatedAt: string;
}

export default function PageContentAdminPage() {
  const [items, setItems] = useState<PageContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/admin/page-content");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch page content", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page content?")) return;

    try {
      await fetch(`/api/admin/page-content/${id}`, { method: "DELETE" });
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete page content", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">
            Page Content
          </h1>
          <p className="text-muted">Manage editable page content blocks</p>
        </div>
        <Link href="/admin/page-content/new">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Entry
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 h-32 animate-pulse" />
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="glass rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="space-y-2 mb-4">
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="text-sm text-muted font-mono">{item.slug}</p>
                <p className="text-xs text-muted">
                  {Object.keys(item.fields).length} field(s) &middot; Updated{" "}
                  {new Date(item.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/page-content/${item.id}`} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
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
          <p className="text-muted mb-4">No page content entries yet</p>
          <Link href="/admin/page-content/new">
            <Button variant="primary">Add your first entry</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
