import { getBlogPostById } from "@/lib/blog";
import { notFound } from "next/navigation";
import BlogEditor from "../../components/BlogEditor";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    notFound();
  }

  return <BlogEditor post={post} />;
}
