"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/lib/blog";

interface BlogEditorProps {
  post?: BlogPost;
}

export default function BlogEditor({ post }: BlogEditorProps) {
  const router = useRouter();
  const isEdit = !!post;

  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [content, setContent] = useState(post?.content || "");
  const [status, setStatus] = useState<"draft" | "published">(
    post?.status || "draft"
  );
  const [saving, setSaving] = useState(false);

  function generateSlug(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!isEdit || slug === generateSlug(post?.title || "")) {
      setSlug(generateSlug(value));
    }
  }

  async function handleSave() {
    if (!title.trim()) return;
    setSaving(true);

    try {
      if (isEdit) {
        const res = await fetch(`/api/admin/blog/${post!.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, slug, content, status }),
        });
        if (res.ok) {
          router.push("/admin/blog");
          router.refresh();
        }
      } else {
        const res = await fetch("/api/admin/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content, status }),
        });
        if (res.ok) {
          router.push("/admin/blog");
          router.refresh();
        }
      }
    } catch (error) {
      console.error("Save failed:", error);
    }
    setSaving(false);
  }

  const inputClass =
    "w-full bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#dffd6e] transition font-light text-sm";

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push("/admin/blog")}
          className="text-zinc-400 hover:text-white text-sm flex items-center gap-1 transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Back to posts
        </button>
      </div>

      <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/40 rounded-2xl p-6 space-y-5">
        <div>
          <label className="text-zinc-400 text-xs mb-1 block">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title"
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-zinc-400 text-xs mb-1 block">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="post-slug"
            className={inputClass + " font-mono"}
          />
        </div>

        <div>
          <label className="text-zinc-400 text-xs mb-1 block">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content..."
            rows={16}
            className={inputClass + " resize-y"}
          />
        </div>

        <div>
          <label className="text-zinc-400 text-xs mb-2 block">Status</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStatus("draft")}
              className={`px-4 py-2 rounded-lg text-sm border transition ${
                status === "draft"
                  ? "border-zinc-500 text-white bg-zinc-800/50"
                  : "border-zinc-800/50 text-zinc-500 hover:text-white"
              }`}
            >
              Draft
            </button>
            <button
              type="button"
              onClick={() => setStatus("published")}
              className={`px-4 py-2 rounded-lg text-sm border transition ${
                status === "published"
                  ? "border-[#dffd6e]/30 text-[#dffd6e] bg-[#dffd6e]/10"
                  : "border-zinc-800/50 text-zinc-500 hover:text-white"
              }`}
            >
              Published
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800/40">
          <button
            onClick={() => router.push("/admin/blog")}
            className="px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !title.trim()}
            className="px-6 py-2 rounded-lg text-sm bg-[#dffd6e] text-black font-medium hover:bg-[#dffd6e]/90 transition disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : isEdit
              ? "Update Post"
              : "Create Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
