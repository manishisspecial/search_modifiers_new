"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";

export default function NewFaqPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    q: "",
    a: "",
    order: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create FAQ item");

      const data = await response.json();
      router.push(`/admin/faq/${data.id}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create FAQ item");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <FormLayout
        title="Add FAQ"
        description="Add a new frequently asked question"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Add FAQ"
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
