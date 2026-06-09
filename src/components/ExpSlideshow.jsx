"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/**
 * Slideshow that starts playing only once scrolled into view.
 * - Fades between images slowly (2s transition)
 * - interval: ms between slides (default 3500)
 */
export default function ExpSlideshow({ images = [], interval = 3500 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  // Start when scrolled into view
  useEffect(() => {
    if (!ref.current || images.length <= 1) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [images]);

  // Advance slides only when active
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
        <Image
          key={src}
          src={src}
          alt={`Workplace photo ${idx + 1}`}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          style={{
            objectFit: "cover",
            opacity: idx === currentIndex ? 1 : 0,
            transition: "opacity 2s ease-in-out",
          }}
        />
      ))}
    </div>
  );
}
