"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TrustBadge {
  id: string;
  label: string;
  subtitle: string;
  href: string;
  order: number;
}

export default function TrustBadgesPage() {
  const [badges, setBadges] = useState<TrustBadge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    try {
      const response = await fetch("/api/admin/trust-badges");
      const data = await response.json();
      setBadges(data);
    } catch (error) {
      console.error("Failed to fetch trust badges", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      await fetch(`/api/admin/trust-badges/${id}`, { method: "DELETE" });
      setBadges(badges.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Failed to delete trust badge", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">
            Trust Badges
          </h1>
          <p className="text-muted">Manage partner and certification badges shown in the footer</p>
        </div>
        <Link href="/admin/trust-badges/new">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Badge
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 h-32 animate-pulse" />
          ))}
        </div>
      ) : badges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="glass rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="space-y-2 mb-4">
                <p className="font-semibold text-foreground">{badge.label}</p>
                <p className="text-sm text-muted">{badge.subtitle}</p>
                <p className="text-xs text-muted truncate">{badge.href}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/trust-badges/${badge.id}`} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </Link>
                <button
                  onClick={() => handleDelete(badge.id)}
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
          <p className="text-muted mb-4">No trust badges yet</p>
          <Link href="/admin/trust-badges/new">
            <Button variant="primary">Add your first trust badge</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
