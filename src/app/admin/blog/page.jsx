import { db } from "@/lib/db";
import BlogClient from "./BlogClient";

export default async function AdminBlogPage() {
  const posts = await db.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
  
  return <BlogClient initialPosts={posts} />;
}
