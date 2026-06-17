"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { toMediaUrl } from "@/lib/media";

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
}

export function ImageUploadField({
  value,
  onChange,
  label,
}: ImageUploadFieldProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      onChange(toMediaUrl(data.secure_url));
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleUpload(files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">{label}</label>

      {value ? (
        <div className="relative">
          <img
            src={value}
            alt="Uploaded"
            className="w-full h-48 object-cover rounded-lg border border-border"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-brand bg-brand/5"
              : "border-border hover:border-brand hover:bg-surface"
          }`}
        >
          <label className="cursor-pointer">
            <div className="flex justify-center mb-2">
              <Upload className="w-8 h-8 text-muted" />
            </div>
            <p className="font-medium text-foreground">
              {isLoading ? "Uploading..." : "Drop image here or click to upload"}
            </p>
            <p className="text-xs text-muted mt-1">
              Supported formats: JPG, PNG, GIF, WebP
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
              className="hidden"
              disabled={isLoading}
            />
          </label>
        </div>
      )}
    </div>
  );
}
