# Video Upload Instructions

## MRI-Slice-Blur-Detector Video

The project "MRI-Slice-Blur-Detector" expects a video file at:
```
/public/uploads/MRI-Slice-Blur-Detector.mp4
```

**To make the video work:**

1. Place your `MRI-Slice-Blur-Detector.mp4` video file in the following directory:
   ```
   my-website/public/uploads/MRI-Slice-Blur-Detector.mp4
   ```

2. The video should be in MP4 format for best browser compatibility

3. Recommended video specifications:
   - Format: MP4 (H.264 codec)
   - Resolution: 1280x720 or 1920x1080
   - File size: Under 50MB for faster loading
   - Duration: 30-60 seconds recommended

4. After adding the video file, restart your development server:
   ```bash
   npm run dev
   ```

The video will:
- Autoplay muted when the page loads
- Loop continuously
- Show controls and play with sound when you hover (desktop) or tap (mobile)

## Alternative: Use YouTube or External Hosting

If you prefer not to host the video locally, you can:
1. Upload the video to YouTube
2. Update the project record in the database to use `youtubeLink` instead of `video`
3. The project card will then show a YouTube link button instead of embedded video
