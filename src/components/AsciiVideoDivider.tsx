'use client';
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const Video2Ascii = dynamic(() => import('video2ascii'), { ssr: false });

export default function AsciiVideoDivider() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasVideo, setHasVideo] = useState(true);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (dividerRef.current) {
      observer.observe(dividerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Check if video exists
  useEffect(() => {
    fetch('/videos/ai-abstract.mp4', { method: 'HEAD' })
      .then((res) => {
        if (!res.ok) setHasVideo(false);
      })
      .catch(() => setHasVideo(false));
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div
      ref={dividerRef}
      className="relative h-32 md:h-48 overflow-hidden border-y border-gray-900 bg-black"
    >
      {isVisible && hasVideo && (
        <div className="absolute inset-0 opacity-40">
          <Video2Ascii
            src="/videos/ai-abstract.mp4"
            numColumns={isMobile ? 60 : 100}
            colored={false}
            brightness={1.3}
            enableMouse={false}
            enableRipple={false}
            charset="standard"
            autoPlay={true}
          />
        </div>
      )}

      {/* Fallback gradient when no video */}
      {!hasVideo && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950" />
      )}

      {/* Subtle overlay text */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <span className="text-gray-800 text-xs font-mono tracking-[0.3em]">
          ························
        </span>
      </div>
    </div>
  );
}
