"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";

export default function EditFaqPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    q: "",
    a: "",
    order: 0,
  });

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await fetch(`/api/admin/faq/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch FAQ item");
        const data = await response.json();
        setFormData({
          q: data.q || "",
          a: data.a || "",
          order: data.order || 0,
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to load FAQ item");
        router.push("/admin/faq");
      } finally {
        setIsFetching(false);
      }
    };

    if (params.id) {
      fetchFaq();
    }
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/faq/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update FAQ item");

      alert("FAQ item updated successfully");
      router.push("/admin/faq");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update FAQ item");
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
        title="Edit FAQ"
        description="Update FAQ item details"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Update FAQ"
      >
        <FormField label="Question" required>
          <FormInput
            value={formData.q}
            onChange={(e) =>
              setFormData({ ...formData, q: e.target.value })
            }
            placeholder="What does a typical engagement look like?"
          />
        </FormField>

        <FormField label="Answer" required>
          <FormTextarea
            value={formData.a}
            onChange={(e) =>
              setFormData({ ...formData, a: e.target.value })
            }
            placeholder="Detailed answer..."
            rows={6}
          />
        </FormField>

        <FormField label="Display Order">
          <FormInput
            type="number"
            value={formData.order}
            onChange={(e) =>
              setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
            }
            placeholder="0"
          />
        </FormField>
      </FormLayout>
    </div>
  );
}
