"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormLayout, FormField, FormInput, FormTextarea } from "@/components/admin/form-layout";
import { MarkdownEditor } from "@/components/admin/markdown-editor";

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    excerpt: "",
    content: "",
    date: "",
    author: "",
    readTime: "",
    category: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/admin/blog/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch post");
        const data = await response.json();
        setFormData({
          slug: data.slug || "",
          title: data.title || "",
          excerpt: data.excerpt || "",
          content: data.content || "",
          date: data.date || "",
          author: data.author || "",
          readTime: data.readTime || "",
          category: data.category || "",
        });
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to load blog post");
        router.push("/admin/blog");
      } finally {
        setIsFetching(false);
      }
    };

    if (params.id) {
      fetchPost();
    }
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/blog/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update blog post");

      alert("Blog post updated successfully");
      router.push("/admin/blog");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update blog post");
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
          <div className="glass rounded-2xl p-6 h-96" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <FormLayout
        title="Edit Blog Post"
        description="Update blog article details"
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitLabel="Update Post"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Title" required>
            <FormInput
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
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
