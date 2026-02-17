"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/lib/blog";
import StatusBadge from "../../components/StatusBadge";

interface BlogClientProps {
  posts: BlogPost[];
}

export default function BlogClient({ posts: initialPosts }: BlogClientProps) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = posts.filter(
    (p) => statusFilter === "all" || p.status === statusFilter
  );

  async function handleToggleStatus(post: BlogPost) {
    const newStatus = post.status === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const { post: updated } = await res.json();
        setPosts((prev) =>
          prev.map((p) => (p.id === post.id ? updated : p))
        );
      }
    } catch (error) {
      console.error("Toggle failed:", error);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
    setDeleting(null);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-black/20 backdrop-blur-sm border border-zinc-800/50 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#dffd6e] transition font-light text-sm"
        >
          <option value="all">All Posts</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>
        <Link
          href="/admin/blog/new"
          className="px-4 py-2 rounded-lg text-sm bg-[#dffd6e] text-black font-medium hover:bg-[#dffd6e]/90 transition"
        >
          New Post
        </Link>
      </div>

      <p className="text-zinc-500 text-xs mb-4">
        {filtered.length} post{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* Posts list */}
      <div className="space-y-3">
        {filtered.map((post) => (
          <div
            key={post.id}
            className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/40 rounded-xl p-4 hover:border-zinc-700/60 transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-light truncate">
                    {post.title}
                  </h3>
                  <StatusBadge status={post.status} />
                </div>
                <p className="text-zinc-500 text-xs">
                  /{post.slug} &middot;{" "}
                  {new Date(post.updatedAt || post.createdAt).toLocaleDateString()}
                </p>
                {post.content && (
                  <p className="text-zinc-400 text-sm mt-2 line-clamp-2">
                    {post.content.slice(0, 200)}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleToggleStatus(post)}
                  className="px-3 py-1.5 rounded-lg text-xs border border-zinc-700/50 text-zinc-400 hover:text-white hover:border-zinc-600 transition"
                >
                  {post.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button
                  onClick={() =>
                    router.push(`/admin/blog/${post.id}/edit`)
                  }
                  className="px-3 py-1.5 rounded-lg text-xs border border-zinc-700/50 text-zinc-400 hover:text-[#dffd6e] hover:border-[#dffd6e]/30 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  disabled={deleting === post.id}
                  className="px-3 py-1.5 rounded-lg text-xs border border-zinc-700/50 text-zinc-400 hover:text-red-400 hover:border-red-500/30 transition disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-zinc-900/30 backdrop-blur-xl border border-zinc-800/40 rounded-xl p-12 text-center">
            <p className="text-zinc-500">No blog posts yet</p>
            <Link
              href="/admin/blog/new"
              className="inline-block mt-3 text-sm text-[#dffd6e] hover:underline"
            >
              Create your first post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
