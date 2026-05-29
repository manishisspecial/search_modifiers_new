"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";

export default function NewTestimonialPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    quote: "",
    name: "",
    role: "",
    company: "",
    order: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const msg = errorData?.error
          ? typeof errorData.error === "string" ? errorData.error : JSON.stringify(errorData.error)
          : `Failed to create testimonial (${response.status})`;
        throw new Error(msg);
      }

      const data = await response.json();
      router.push(`/admin/testimonials/${data.id}`);
    } catch (error: any) {
      console.error("Error:", error);
      alert(error?.message || "Failed to create testimonial");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <FormLayout
        title="Add Testimonial"
        description="Add a new customer testimonial"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Add Testimonial"
      >
        <FormField label="Quote" required>
          <FormTextarea
            value={formData.quote}
            onChange={(e) =>
              setFormData({ ...formData, quote: e.target.value })
            }
            placeholder="Customer testimonial quote..."
            rows={4}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Name" required>
            <FormInput
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="John Doe"
            />
          </FormField>

          <FormField label="Role" required>
            <FormInput
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              placeholder="CEO"
            />
          </FormField>

          <FormField label="Company" required>
            <FormInput
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              placeholder="Company Name"
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
        </div>
      </FormLayout>
    </div>
  );
}
