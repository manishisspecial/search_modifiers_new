"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Upload,
  Image as ImageIcon,
  Link2,
  X,
  Search,
  CheckCircle2,
  Loader2,
  RefreshCw,
  Trash2,
} from "lucide-react";

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  created_at: string;
  display_name?: string;
}

interface FeaturedImagePickerProps {
  value: string;
  onChange: (url: string) => void;
  altValue?: string;
  onAltChange?: (alt: string) => void;
}

type TabId = "upload" | "library" | "url";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FeaturedImagePicker({
  value,
  onChange,
  altValue = "",
  onAltChange,
}: FeaturedImagePickerProps) {
  const [activeTab, setActiveTab] = useState<TabId>("upload");
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Media library state
  const [resources, setResources] = useState<CloudinaryResource[]>([]);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);
  const [libraryError, setLibraryError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [selectedPublicId, setSelectedPublicId] = useState("");

  // URL tab
  const [urlInput, setUrlInput] = useState(value);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Fetch library ──────────────────────────────────────────────
  const fetchLibrary = useCallback(
    async (query = "", cursor?: string) => {
      setIsLoadingLibrary(true);
      setLibraryError("");
      try {
        const params = new URLSearchParams();
        if (query) params.set("q", query);
        if (cursor) params.set("next_cursor", cursor);
        const res = await fetch(`/api/admin/upload?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to load media library");
        const data = await res.json();
        setResources((prev) =>
          cursor ? [...prev, ...(data.resources ?? [])] : (data.resources ?? [])
        );
        setNextCursor(data.next_cursor ?? null);
        setHasMore(!!data.next_cursor);
      } catch (err) {
        setLibraryError(err instanceof Error ? err.message : "Failed to load media");
      } finally {
        setIsLoadingLibrary(false);
      }
    },
    []
  );

  useEffect(() => {
    if (activeTab === "library" && resources.length === 0) {
      fetchLibrary();
    }
  }, [activeTab, fetchLibrary, resources.length]);

  // Debounced search
  useEffect(() => {
    if (activeTab !== "library") return;
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setResources([]);
      fetchLibrary(searchQuery);
    }, 400);
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [searchQuery, activeTab, fetchLibrary]);

  // Sync urlInput when external value changes
  useEffect(() => {
    setUrlInput(value);
  }, [value]);

  // ── Upload handler ─────────────────────────────────────────────
  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    setIsUploading(true);
    setUploadProgress(10);
    try {
      const fd = new FormData();
      fd.append("file", file);
      setUploadProgress(40);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      setUploadProgress(80);
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setUploadProgress(100);
      onChange(data.secure_url);
      // Refresh library silently
      setResources([]);
      fetchLibrary(searchQuery);
    } catch (err) {
      console.error(err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleUpload(e.target.files[0]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files?.[0]) handleUpload(e.dataTransfer.files[0]);
  };

  // ── Library select ─────────────────────────────────────────────
  const handleLibrarySelect = (resource: CloudinaryResource) => {
    setSelectedPublicId(resource.public_id);
    onChange(resource.secure_url);
    if (onAltChange && !altValue) {
      const name = resource.display_name ?? resource.public_id.split("/").pop() ?? "";
      onAltChange(name.replace(/[-_]/g, " "));
    }
  };

  // ── URL apply ─────────────────────────────────────────────────
  const handleUrlApply = () => {
    if (urlInput.trim()) onChange(urlInput.trim());
  };

  const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: "upload", label: "Upload New", icon: Upload },
    { id: "library", label: "Media Library", icon: ImageIcon },
    { id: "url", label: "Paste URL", icon: Link2 },
  ];

  return (
    <div className="space-y-3">
      {/* Current preview */}
      {value && (
        <div className="relative rounded-xl overflow-hidden border border-border group">
          <img
            src={value}
            alt={altValue || "Featured image preview"}
            className="w-full h-44 object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
          <button
            type="button"
            onClick={() => {
              onChange("");
              setSelectedPublicId("");
              setUrlInput("");
            }}
            className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
            title="Remove image"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-white text-xs truncate">{value}</p>
          </div>
        </div>
      )}

      {/* Alt text */}
      {value && onAltChange && (
        <input
          type="text"
          value={altValue}
          onChange={(e) => onAltChange(e.target.value)}
          placeholder="Alt text for accessibility and SEO"
          className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-card text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
        />
      )}

      {/* Tabs */}
      <div className="glass rounded-xl border border-border overflow-hidden">
        <div className="flex border-b border-border">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors ${
                activeTab === id
                  ? "bg-orange-500/10 text-orange-500 border-b-2 border-orange-500"
                  : "text-muted hover:text-foreground hover:bg-surface"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* ── Upload Tab ── */}
        {activeTab === "upload" && (
          <div className="p-4">
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? "border-orange-500 bg-orange-500/5"
                  : "border-border hover:border-orange-500/60 hover:bg-surface"
              } ${isUploading ? "pointer-events-none" : ""}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                disabled={isUploading}
              />

              {isUploading ? (
                <div className="space-y-3">
                  <Loader2 className="w-8 h-8 text-orange-500 mx-auto animate-spin" />
                  <p className="text-sm font-medium text-foreground">Uploading…</p>
                  <div className="w-full bg-surface rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-orange-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-muted mx-auto mb-2" />
                  <p className="font-medium text-foreground text-sm">
                    {isDragActive ? "Drop to upload" : "Drop image here or click to browse"}
                  </p>
                  <p className="text-xs text-muted mt-1">JPG, PNG, WebP, GIF · Max 10 MB</p>
                </>
              )}
            </div>
          </div>
        )}

        {/* ── Media Library Tab ── */}
        {activeTab === "library" && (
          <div className="p-4 space-y-3">
            {/* Search + Refresh */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search images…"
                  className="w-full pl-8 pr-3 py-2 text-sm rounded-lg border border-border bg-card text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setResources([]);
                  fetchLibrary(searchQuery);
                }}
                className="p-2 rounded-lg border border-border text-muted hover:text-foreground hover:bg-surface transition-colors"
                title="Refresh"
              >
                <RefreshCw className={`w-4 h-4 ${isLoadingLibrary ? "animate-spin" : ""}`} />
              </button>
            </div>

            {/* Grid */}
            {libraryError ? (
              <div className="text-center py-8 text-sm text-red-500">{libraryError}</div>
            ) : isLoadingLibrary && resources.length === 0 ? (
              <div className="flex items-center justify-center py-10 gap-2 text-muted text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading media library…
              </div>
            ) : resources.length === 0 ? (
              <div className="text-center py-8 text-sm text-muted">
                No images found.{" "}
                <button
                  type="button"
                  className="text-orange-500 underline"
                  onClick={() => setActiveTab("upload")}
                >
                  Upload one
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-72 overflow-y-auto pr-0.5">
                  {resources.map((r) => {
                    const isSelected = r.public_id === selectedPublicId || r.secure_url === value;
                    return (
                      <button
                        key={r.public_id}
                        type="button"
                        onClick={() => handleLibrarySelect(r)}
                        className={`relative group aspect-square rounded-lg overflow-hidden border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                          isSelected
                            ? "border-orange-500 ring-2 ring-orange-500/30"
                            : "border-transparent hover:border-orange-500/50"
                        }`}
                        title={`${r.display_name ?? r.public_id} · ${formatBytes(r.bytes)}`}
                      >
                        <img
                          src={r.secure_url}
                          alt={r.display_name ?? ""}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-orange-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-orange-500 drop-shadow" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </button>
                    );
                  })}
                </div>

                {hasMore && (
                  <button
                    type="button"
                    onClick={() => fetchLibrary(searchQuery, nextCursor ?? undefined)}
                    disabled={isLoadingLibrary}
                    className="w-full py-2 text-xs text-orange-500 hover:underline disabled:opacity-50 flex items-center justify-center gap-1"
                  >
                    {isLoadingLibrary ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      "Load more"
                    )}
                  </button>
                )}
              </>
            )}
          </div>
        )}

        {/* ── Paste URL Tab ── */}
        {activeTab === "url" && (
          <div className="p-4 space-y-3">
            <p className="text-xs text-muted">
              Paste any public image URL (Cloudinary, Unsplash, CDN, etc.)
            </p>
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleUrlApply())}
                placeholder="https://res.cloudinary.com/…"
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-card text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
              <button
                type="button"
                onClick={handleUrlApply}
                disabled={!urlInput.trim()}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors disabled:opacity-40 disabled:pointer-events-none"
              >
                Apply
              </button>
            </div>
            {urlInput && (
              <img
                src={urlInput}
                alt="URL preview"
                className="w-full h-32 object-cover rounded-lg border border-border"
                onError={(e) => (e.currentTarget.style.display = "none")}
                onLoad={(e) => (e.currentTarget.style.display = "block")}
              />
            )}
          </div>
        )}
      </div>

      {/* Clear button when image is set */}
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange("");
            setSelectedPublicId("");
            setUrlInput("");
          }}
          className="flex items-center gap-1.5 text-xs text-muted hover:text-red-500 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Remove featured image
        </button>
      )}
    </div>
  );
}
