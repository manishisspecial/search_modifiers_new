"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  order: number;
}

export default function PortfolioAdminPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/admin/portfolio");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch portfolio items", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      await fetch(`/api/admin/portfolio/${id}`, { method: "DELETE" });
      setItems(items.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Failed to delete portfolio item", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">
            Portfolio
          </h1>
          <p className="text-muted">Manage portfolio items</p>
        </div>
        <Link href="/admin/portfolio/new">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Item
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
                <p className="text-xs font-medium text-orange-400/80">{item.category}</p>
                <p className="text-sm text-muted line-clamp-2">{item.description}</p>
                <p className="text-xs text-muted/60">Icon: {item.icon}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/portfolio/${item.id}`} className="flex-1">
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
          <p className="text-muted mb-4">No portfolio items yet</p>
          <Link href="/admin/portfolio/new">
            <Button variant="primary">Add your first portfolio item</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
