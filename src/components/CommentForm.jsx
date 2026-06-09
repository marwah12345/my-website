"use client";

import { addComment } from "@/app/actions";
import { useRef } from "react";

export default function CommentForm({ postId }) {
  const formRef = useRef(null);

  return (
    <form 
      ref={formRef}
      action={async (formData) => {
        await addComment(postId, formData);
        formRef.current?.reset();
      }}
      className="card mt-4"
    >
      <h3 className="mb-2">Leave a Comment</h3>
      <div className="form-group mb-2">
        <label className="form-label" htmlFor="authorName">Your Name</label>
        <input type="text" id="authorName" name="authorName" className="form-input" required />
      </div>
      <div className="form-group mb-2">
        <label className="form-label" htmlFor="content">Comment</label>
        <textarea id="content" name="content" className="form-textarea" required></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Post Comment</button>
    </form>
  );
}
