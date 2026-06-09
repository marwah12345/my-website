"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addComment(postId, formData) {
  const authorName = formData.get("authorName");
  const content = formData.get("content");
  
  if (!authorName || !content) return;

  await db.comment.create({
    data: {
      authorName,
      content,
      postId: parseInt(postId),
      // Automatically approved per default settings unless user changes it later in admin
      approved: true,
    }
  });

  revalidatePath(`/blog/[slug]`, 'page');
}
