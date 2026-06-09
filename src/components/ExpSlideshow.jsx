"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Slideshow that starts cycling only once scrolled into view.
 * Uses plain <img> tags to avoid Next.js fill/sizing constraints.
 */
export default function ExpSlideshow({ images = [], interval = 3500 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  // Trigger once visible
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Advance slides when active and multiple images
  useEffect(() => {
    if (!active || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [active, images, interval]);

  if (!images.length) return null;

  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: "100%" }}>
      {images.map((src, idx) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={`Workplace photo ${idx + 1}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: idx === currentIndex ? 1 : 0,
            transition: images.length > 1 ? "opacity 2s ease-in-out" : "none",
          }}
        />
      ))}
    </div>
  );
}
