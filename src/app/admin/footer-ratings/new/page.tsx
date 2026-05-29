"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FormLayout, FormField, FormInput } from "@/components/admin/form-layout";

const PLATFORMS = [
  { value: "google", label: "Google" },
  { value: "clutch", label: "Clutch" },
];

export default function NewFooterRatingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [existingPlatforms, setExistingPlatforms] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    platform: "google",
    score: "",
    maxScore: "",
    href: "",
  });

  useEffect(() => {
    fetch("/api/admin/footer-ratings")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setExistingPlatforms(data.map((r: any) => r.platform));
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        maxScore: formData.maxScore || undefined,
      };

      const response = await fetch("/api/admin/footer-ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const msg = errorData?.error
          ? typeof errorData.error === "string" ? errorData.error : JSON.stringify(errorData.error)
          : "Failed to create footer rating";
        throw new Error(msg);
      }

      const data = await response.json();
      router.push(`/admin/footer-ratings/${data.id}`);
    } catch (error: any) {
      console.error("Error:", error);
      alert(error?.message || "Failed to create footer rating");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <FormLayout
        title="Add Footer Rating"
        description="Add a new review platform rating"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Add Rating"
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
          {existingPlatforms.includes(formData.platform) && (
            <p className="mt-2 text-sm text-amber-500">
              A rating for &quot;{formData.platform}&quot; already exists. Submitting will update the existing entry.
            </p>
          )}
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
