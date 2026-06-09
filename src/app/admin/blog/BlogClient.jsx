"use client";

import { useState, useRef } from "react";
import { createBlogPost, deleteBlogPost } from "./actions";

export default function BlogClient({ initialPosts }) {
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const formRef = useRef(null);

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) {
        if (type === 'image') setImageUrl(data.url);
        if (type === 'video') setVideoUrl(data.url);
      }
    } catch (err) {
      alert("Upload failed.");
    }
    setIsUploading(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>Manage Blog Posts</h2>
      </div>

      <div className="card mb-4">
        <h3 className="mb-3">Create New Post</h3>
        <form 
          ref={formRef}
          action={async (formData) => {
            formData.append("imageUrl", imageUrl);
            formData.append("videoUrl", videoUrl);
            await createBlogPost(formData);
            formRef.current?.reset();
            setImageUrl("");
            setVideoUrl("");
          }}
        >
          <div className="form-group">
            <label className="form-label">Title</label>
            <input type="text" name="title" className="form-input" required />
          </div>
          
          <div className="form-group">
            <label className="form-label">Cover Image (Optional)</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} />
            {isUploading && <span style={{marginLeft: '10px'}} className="text-secondary">Uploading...</span>}
            {imageUrl && <p className="text-primary mt-1">Image uploaded: {imageUrl}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Video (Optional)</label>
            <input type="file" accept="video/mp4,video/webm" onChange={(e) => handleFileUpload(e, 'video')} />
            {videoUrl && <p className="text-primary mt-1">Video uploaded: {videoUrl}</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Content (HTML allowed)</label>
            <textarea name="content" className="form-textarea" required style={{height: '200px'}}></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Publish Post</button>
        </form>
      </div>

      <div className="card">
        <h3 className="mb-3">Existing Posts</h3>
        <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{borderBottom: '1px solid var(--border)'}}>
              <th style={{padding: '1rem'}}>Title</th>
              <th style={{padding: '1rem'}}>Date</th>
              <th style={{padding: '1rem', width: '100px'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialPosts.map(post => (
              <tr key={post.id} style={{borderBottom: '1px solid var(--border)'}}>
                <td style={{padding: '1rem'}}>{post.title}</td>
                <td style={{padding: '1rem'}}>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td style={{padding: '1rem'}}>
                  <button onClick={() => deleteBlogPost(post.id)} className="btn btn-danger" style={{padding: '0.3rem 0.6rem', fontSize: '0.8rem'}}>Delete</button>
                </td>
              </tr>
            ))}
            {initialPosts.length === 0 && (
              <tr><td colSpan="3" style={{padding: '1rem', textAlign: 'center'}}>No posts found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
