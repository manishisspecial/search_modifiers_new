"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  industry: string;
  result: string;
}

export default function CaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStudies();
  }, []);

  const fetchStudies = async () => {
    try {
      const response = await fetch("/api/admin/case-studies");
      const data = await response.json();
      setStudies(data);
    } catch (error) {
      console.error("Failed to fetch case studies", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      await fetch(`/api/admin/case-studies/${id}`, { method: "DELETE" });
      setStudies(studies.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Failed to delete case study", error);
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
          <p className="text-muted mb-4">No case studies yet</p>
          <Link href="/admin/case-studies/new">
            <Button variant="primary">Create your first case study</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
