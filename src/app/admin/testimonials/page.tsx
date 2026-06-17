"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch("/api/admin/testimonials");
      if (!response.ok) {
        throw new Error(`Failed to fetch (${response.status})`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format");
      }
      setTestimonials(data);
      setError(null);
    } catch (err: any) {
      console.error("Failed to fetch testimonials", err);
      setError(err?.message || "Failed to fetch testimonials");
      setTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;

    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setTestimonials(testimonials.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete testimonial", error);
      alert("Failed to delete testimonial");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold font-display text-foreground">
            Testimonials
          </h1>
          <p className="text-muted">Manage customer testimonials</p>
        </div>
        <Link href="/admin/testimonials/new">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Testimonial
          </Button>
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-4 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-6 h-32 animate-pulse" />
          ))}
        </div>
      ) : testimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="glass rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <p className="text-sm text-muted italic mb-4 line-clamp-2">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="space-y-2 mb-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-xs text-muted">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/testimonials/${testimonial.id}`} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </Link>
                <button
                  onClick={() => handleDelete(testimonial.id)}
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
          <p className="text-muted mb-4">No testimonials in the database yet</p>
          <Link href="/admin/testimonials/new">
            <Button variant="primary">Add your first testimonial</Button>
          </Link>
        </div>
      )}

      {/* Static fallback notice */}
      {!isLoading && (
        <div className="mt-6 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800 dark:text-amber-200">
              <p className="font-medium mb-1">About homepage testimonials</p>
              <p>
                The homepage displays testimonials from the database above. If no database entries exist,
                it shows default placeholder testimonials. Adding entries here will automatically
                display them on the homepage. Default placeholders are hidden once matching entries exist.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
