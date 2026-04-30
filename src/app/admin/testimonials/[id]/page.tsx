"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";

export default function EditTestimonialPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    quote: "",
    name: "",
    role: "",
    company: "",
    order: 0,
  });

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const response = await fetch(`/api/admin/testimonials/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch testimonial");
        const data = await response.json();
        setFormData({
          quote: data.quote || "",
          name: data.name || "",
          role: data.role || "",
          company: data.company || "",
          order: data.order || 0,
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to load testimonial");
        router.push("/admin/testimonials");
      } finally {
        setIsFetching(false);
      }
    };

    if (params.id) {
      fetchTestimonial();
    }
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/testimonials/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update testimonial");

      alert("Testimonial updated successfully");
      router.push("/admin/testimonials");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update testimonial");
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
        title="Edit Testimonial"
        description="Update customer testimonial details"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Update Testimonial"
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
