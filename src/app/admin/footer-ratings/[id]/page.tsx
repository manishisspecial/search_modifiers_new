"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormLayout, FormField, FormInput } from "@/components/admin/form-layout";

const PLATFORMS = [
  { value: "google", label: "Google" },
  { value: "clutch", label: "Clutch" },
];

export default function EditFooterRatingPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    platform: "google",
    score: "",
    maxScore: "",
    href: "",
  });

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await fetch(`/api/admin/footer-ratings/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch footer rating");
        const data = await response.json();
        setFormData({
          platform: data.platform || "google",
          score: data.score || "",
          maxScore: data.maxScore || "",
          href: data.href || "",
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to load footer rating");
        router.push("/admin/footer-ratings");
      } finally {
        setIsFetching(false);
      }
    };

    if (params.id) {
      fetchRating();
    }
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        maxScore: formData.maxScore || undefined,
      };

      const response = await fetch(`/api/admin/footer-ratings/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to update footer rating");

      alert("Footer rating updated successfully");
      router.push("/admin/footer-ratings");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update footer rating");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-surface rounded w-1/3" />
          <div className="h-4 bg-surface rounded w-1/4" />
          <div className="glass rounded-2xl p-6 h-64" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <FormLayout
        title="Edit Footer Rating"
        description="Update review platform rating details"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Update Rating"
      >
        <FormField label="Platform" required>
          <select
            value={formData.platform}
            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
          >
            {PLATFORMS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Score" required>
            <FormInput
              value={formData.score}
              onChange={(e) => setFormData({ ...formData, score: e.target.value })}
              placeholder="e.g. 4.5"
            />
          </FormField>

          <FormField label="Max Score">
            <FormInput
              value={formData.maxScore}
              onChange={(e) => setFormData({ ...formData, maxScore: e.target.value })}
              placeholder="e.g. 5"
            />
          </FormField>

          <FormField label="Link (href)" required>
            <FormInput
              value={formData.href}
              onChange={(e) => setFormData({ ...formData, href: e.target.value })}
              placeholder="https://..."
            />
          </FormField>
        </div>
      </FormLayout>
    </div>
  );
}
