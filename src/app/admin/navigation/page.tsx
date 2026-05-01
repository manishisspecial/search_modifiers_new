"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationItem {
  id: string;
  category: string;
  label: string;
  href: string;
  order: number;
}

const CATEGORY_LABELS: Record<string, string> = {
  main: "Main Nav",
  services: "Services",
  locations: "Locations",
  footer: "Footer",
};

export default function NavigationPage() {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/admin/navigation");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch navigation items", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      await fetch(`/api/admin/navigation/${id}`, { method: "DELETE" });
      setItems(items.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Failed to delete navigation item", error);
    }
  };

  const grouped = items.reduce<Record<string, NavigationItem[]>>((acc, item) => {
    const key = item.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">
            Navigation
          </h1>
          <p className="text-muted">Manage navigation links across the site</p>
        </div>
        <Link href="/admin/navigation/new">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Item
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 h-24 animate-pulse" />
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="space-y-8">
          {Object.entries(grouped).map(([category, categoryItems]) => (
            <div key={category}>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                {CATEGORY_LABELS[category] || category}
              </h2>
              <div className="space-y-2">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    className="glass rounded-xl p-4 border border-border hover:shadow-lg transition-shadow flex items-center justify-between"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted truncate">{item.href}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <span className="text-xs text-muted bg-surface px-2 py-1 rounded">
                        #{item.order}
                      </span>
                      <Link href={`/admin/navigation/${item.id}`}>
                        <Button variant="outline" className="flex items-center gap-1.5 text-sm px-3 py-1.5">
                          <Edit className="w-3.5 h-3.5" />
                          Edit
                        </Button>
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass rounded-2xl p-12 border border-border text-center">
          <p className="text-muted mb-4">No navigation items yet</p>
          <Link href="/admin/navigation/new">
            <Button variant="primary">Add your first navigation item</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
