'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

export default function ProjectCard({ project }) {
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current && project.video) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(e => console.log('Video play failed:', e));
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current && project.video) {
      videoRef.current.muted = true;
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleTouchStart = () => {
    setIsHovering(true);
  };

  return (
    <article 
      style={{
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        boxShadow: '0 4px 12px -4px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      {/* Media Area */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '220px',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        overflow: 'hidden'
      }}>
        {project.video ? (
          <video
            ref={videoRef}
            src={project.video}
            loop
            muted={!isHovering}
            playsInline
            autoPlay
            preload="auto"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            controls={isHovering}
            onError={(e) => {
              console.error('Video failed to load:', project.video);
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:#f0f9ff;color:#64748b;font-size:0.9rem;">Video not available</div>';
            }}
          />
        ) : project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-light)'
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="m9 9 5 12 1.8-5.2L21 12z" />
              <circle cx="7.5" cy="7.5" r="1.5" />
            </svg>
            <span style={{fontSize: '0.85rem', marginTop: '0.5rem'}}>No media</span>
          </div>
        )}
        
        {/* Gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 0%, rgba(15,23,42,0.4) 100%)',
          pointerEvents: 'none'
        }} />
        
        {/* Project badge */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          padding: '0.35rem 0.75rem',
          background: 'rgba(30,58,138,0.9)',
          color: 'white',
          borderRadius: '6px',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.5px',
          backdropFilter: 'blur(8px)'
        }}>
          PROJECT
        </div>
      </div>

      {/* Content Area */}
      <div style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        flex: 1
      }}>
        <h3 style={{
          fontSize: '1.15rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          lineHeight: '1.3',
          margin: 0
        }}>
          {project.title}
        </h3>
        
        {project.description && (
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            margin: 0,
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {project.description}
          </p>
        )}

        {/* Links Row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginTop: 'auto',
          paddingTop: '0.75rem',
          borderTop: '1px solid var(--border)'
        }}>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 0.9rem',
                background: '#24292e',
                color: 'white',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {e.currentTarget.style.background = '#1b1f23';}}
              onMouseLeave={(e) => {e.currentTarget.style.background = '#24292e';}}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              GitHub
            </a>
          )}
          {project.youtubeLink && (
            <a
              href={project.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 0.9rem',
                background: '#FF0000',
                color: 'white',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {e.currentTarget.style.background = '#cc0000';}}
              onMouseLeave={(e) => {e.currentTarget.style.background = '#FF0000';}}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube
            </a>
          )}
          {project.link && !project.githubLink && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 0.9rem',
                background: 'var(--primary)',
                color: 'white',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {e.currentTarget.style.background = 'var(--primary-hover)';}}
              onMouseLeave={(e) => {e.currentTarget.style.background = 'var(--primary)';}}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              View Project
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
