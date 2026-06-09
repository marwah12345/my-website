"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({ children, styleClass = "", delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const current = domRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, [delay]);

  return (
    <div
      className={`scroll-reveal ${isVisible ? "is-visible" : ""} ${styleClass}`}
      ref={domRef}
    >
      {children}
    </div>
  );
}
