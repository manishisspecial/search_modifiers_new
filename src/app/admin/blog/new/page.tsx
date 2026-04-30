"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";
import { MarkdownEditor } from "@/components/admin/markdown-editor";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    author: "",
    readTime: "",
    category: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create blog post");

      const data = await response.json();
      router.push(`/admin/blog/${data.id}`);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to create blog post");
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  return (
    <div className="p-6">
      <FormLayout
        title="Create Blog Post"
        description="Add a new blog article"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Create Post"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Title" required>
            <FormInput
              value={formData.title}
              onChange={(e) => {
                const title = e.target.value;
                setFormData({
                  ...formData,
                  title,
                  slug: formData.slug || generateSlug(title),
                });
              }}
              placeholder="Blog post title"
            />
          </FormField>

          <FormField label="Slug" required>
            <FormInput
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              placeholder="blog-post-slug"
            />
          </FormField>

          <FormField label="Author" required>
            <FormInput
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              placeholder="John Doe"
            />
          </FormField>

          <FormField label="Date" required>
            <FormInput
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </FormField>

          <FormField label="Read Time" required>
            <FormInput
              value={formData.readTime}
              onChange={(e) =>
                setFormData({ ...formData, readTime: e.target.value })
              }
              placeholder="5 min read"
            />
          </FormField>

          <FormField label="Category" required>
            <FormInput
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder="SEO, Marketing, etc."
            />
          </FormField>
        </div>

        <FormField label="Excerpt" required>
          <FormTextarea
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
            placeholder="Brief summary of the blog post"
            rows={3}
          />
        </FormField>

        <FormField label="Content" required>
          <MarkdownEditor
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
        </FormField>
      </FormLayout>
    </div>
  );
}
