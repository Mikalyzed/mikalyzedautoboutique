import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import {
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} from "@/lib/blog";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const post = await getBlogPostById(id);
    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ post });
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const allowed = new Set(["title", "slug", "content", "status"]);
    const updates: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(body)) {
      if (allowed.has(key)) {
        updates[key] = value;
      }
    }
    updates.updatedAt = new Date().toISOString();

    await updateBlogPost(id, updates);
    const updated = await getBlogPostById(id);
    return NextResponse.json({ post: updated });
  } catch (error) {
    console.error("Failed to update blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await deleteBlogPost(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
