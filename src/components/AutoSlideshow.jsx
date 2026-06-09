"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function AutoSlideshow({ images = [], interval = 5000, height = "100%", borderRadius = "0" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [images, interval]);

  if (!images.length) return null;

  return (
    <div style={{ position: "relative", width: "100%", height: height, borderRadius: borderRadius, overflow: "hidden" }}>
      {images.map((src, idx) => (
        <Image
          key={src}
          src={src}
          alt={`Slideshow image ${idx + 1}`}
          fill
          style={{
            objectFit: "cover",
            opacity: idx === currentIndex ? 1 : 0,
            transition: "opacity 1.5s ease-in-out"
          }}
        />
      ))}
      {/* Sleek Overlay to make it feel integrated and premium */}
      <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "linear-gradient(to top, rgba(15, 23, 42, 0.4) 0%, transparent 40%)",
          zIndex: 1,
          pointerEvents: "none"
      }} />
    </div>
  );
}
