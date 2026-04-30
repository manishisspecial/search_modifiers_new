"use client";

import { useState } from "react";
import { Eye, Code } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Enter markdown content...",
}: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex gap-2 border-b border-border pb-2">
        <button
          type="button"
          onClick={() => setShowPreview(false)}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
            !showPreview
              ? "bg-brand text-white"
              : "text-muted hover:bg-surface"
          }`}
        >
          <Code className="w-4 h-4" />
          Edit
        </button>
        <button
          type="button"
          onClick={() => setShowPreview(true)}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
            showPreview
              ? "bg-brand text-white"
              : "text-muted hover:bg-surface"
          }`}
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
      </div>

      {!showPreview ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={12}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent font-mono text-sm resize-vertical"
        />
      ) : (
        <div className="w-full px-4 py-3 rounded-lg border border-border bg-card min-h-64 markdown-preview prose dark:prose-invert prose-sm max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
