import { getAllBlogPosts } from "@/lib/blog";
import BlogClient from "./components/BlogClient";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await getAllBlogPosts();
  return <BlogClient posts={posts} />;
}
