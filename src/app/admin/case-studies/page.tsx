"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  industry: string;
  result: string;
  isStatic?: boolean;
}

export default function CaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudies();
  }, []);

  const fetchStudies = async () => {
    try {
      const response = await fetch("/api/admin/case-studies");
      if (!response.ok) {
        throw new Error(`Failed to fetch (${response.status})`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format");
      }
      setStudies(data);
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch case studies", err);
      setError(err?.message || "Failed to fetch case studies");
      setStudies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      const res = await fetch(`/api/admin/case-studies/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setStudies(studies.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Failed to delete case study", error);
      alert("Failed to delete case study");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">
            Case Studies
          </h1>
          <p className="text-muted">Manage your case studies</p>
        </div>
        <Link href="/admin/case-studies/new">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Case Study
          </Button>
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 h-20 animate-pulse" />
          ))}
        </div>
      ) : studies.length > 0 ? (
        <div className="space-y-4">
          {studies.map((study) => (
            <div
              key={study.id}
              className="glass rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="font-bold font-display text-foreground mb-1">
                    {study.title}
                  </h3>
                  <div className="text-sm text-muted space-x-3">
                    <span>{study.industry}</span>
                    <span>•</span>
                    <span>{study.result}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/case-studies/${study.id}`}>
                    <Button variant="outline" className="flex items-center justify-center">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <button
                    onClick={() => handleDelete(study.id)}
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
          <p className="text-muted mb-4">No case studies in the database yet</p>
          <Link href="/admin/case-studies/new">
            <Button variant="primary">Create your first case study</Button>
          </Link>
        </div>
      )}

      {/* Static fallback notice */}
      {!isLoading && (
        <div className="mt-6 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800 dark:text-amber-200">
              <p className="font-medium mb-1">About homepage case studies</p>
              <p>
                The homepage displays case studies from the database above. If no database entries exist,
                it shows default placeholder case studies. Adding entries here will automatically
                display them on the homepage. The default placeholders are hidden once database entries
                with matching slugs exist.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
