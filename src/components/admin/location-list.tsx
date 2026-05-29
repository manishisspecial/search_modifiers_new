"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationRow {
  id: string;
  slug: string;
  title: string;
  type: string;
}

export function LocationList({
  type,
  basePath,
  title,
  description,
  addLabel,
}: {
  type: "COUNTRY" | "CITY";
  basePath: string;
  title: string;
  description: string;
  addLabel: string;
}) {
  const [locations, setLocations] = useState<LocationRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(`/api/admin/locations?type=${type}`);
        const data = await response.json();
        setLocations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch locations", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLocations();
  }, [type]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await fetch(`/api/admin/locations/${id}`, { method: "DELETE" });
      setLocations((prev) => prev.filter((l) => l.id !== id));
    } catch (error) {
      console.error("Failed to delete location", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">{title}</h1>
          <p className="text-muted">{description}</p>
        </div>
        <Link href={`${basePath}/new`}>
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            {addLabel}
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 h-32 animate-pulse" />
          ))}
        </div>
      ) : locations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {locations.map((location) => (
            <div
              key={location.id}
              className="glass rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <h3 className="font-bold font-display text-foreground mb-1">{location.title}</h3>
              <p className="text-xs text-muted font-mono mb-4">/location/{location.slug}</p>
              <div className="flex gap-2">
                <Link href={`${basePath}/${location.id}`} className="flex-1">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </Link>
                <button
                  onClick={() => handleDelete(location.id)}
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
          <p className="text-muted mb-4">Nothing here yet</p>
          <Link href={`${basePath}/new`}>
            <Button variant="primary">{addLabel}</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
