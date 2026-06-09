"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createBlogPost(formData) {
  const title = formData.get("title");
  const content = formData.get("content");
  let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  
  // ensure slug uniqueness
  const exists = await db.blogPost.findUnique({ where: { slug } });
  if (exists) slug += '-' + Date.now();

  const image = formData.get("imageUrl");
  const video = formData.get("videoUrl");

  await db.blogPost.create({
    data: {
      title,
      slug,
      content,
      image: image || null,
      video: video || null,
    }
  });

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}

export async function deleteBlogPost(id) {
  await db.blogPost.delete({ where: { id: parseInt(id) } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
