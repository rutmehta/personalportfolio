'use client';
import { useEffect, useRef, useState } from 'react';

interface AsciiRendererProps {
  videoSrc?: string;
  imageSrc?: string;
  width?: number;
  height?: number;
  fontSize?: number;
  colorMode?: 'mono' | 'color';
  className?: string;
  inverted?: boolean;
}

const ASCII_CHARS = ' .:-=+*#%@';

export default function AsciiRenderer({
  videoSrc,
  imageSrc,
  width = 120,
  height = 60,
  fontSize = 10,
  colorMode = 'mono',
  className = '',
  inverted = false,
}: AsciiRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const outputRef = useRef<HTMLPreElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    const output = outputRef.current;
    const video = videoRef.current;

    if (!canvas || !ctx || !output) return;

    canvas.width = width;
    canvas.height = height;

    const chars = inverted ? ASCII_CHARS.split('').reverse().join('') : ASCII_CHARS;

    const renderFrame = () => {
      if (videoSrc && video && video.readyState >= 2) {
        ctx.drawImage(video, 0, 0, width, height);
      }

      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;

      let ascii = '';

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const brightness = (r + g + b) / 3;
          const charIndex = Math.floor((brightness / 255) * (chars.length - 1));
          ascii += chars[charIndex];
        }
        ascii += '\n';
      }

      output.textContent = ascii;

      if (videoSrc) {
        animationRef.current = requestAnimationFrame(renderFrame);
      }
    };

    // Load image if provided
    if (imageSrc) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        setIsLoaded(true);
        renderFrame();
      };
      img.src = imageSrc;
    }

    // Setup video if provided
    if (videoSrc && video) {
      video.addEventListener('loadeddata', () => {
        setIsLoaded(true);
        renderFrame();
      });
      video.play().catch(() => {
        // Autoplay might be blocked, that's ok
      });
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [videoSrc, imageSrc, width, height, inverted]);

  const lineHeight = fontSize * 0.9;

  return (
    <div className={`relative ${className}`}>
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="hidden"
        />
      )}
      <canvas ref={canvasRef} className="hidden" />
      <pre
        ref={outputRef}
        className="ascii-canvas select-none"
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: `${lineHeight}px`,
          color: colorMode === 'mono' ? 'inherit' : undefined,
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />
    </div>
  );
}

// Simple ASCII art component for static text-based patterns
interface AsciiPatternProps {
  pattern: string;
  className?: string;
  animate?: boolean;
}

export function AsciiPattern({ pattern, className = '', animate = false }: AsciiPatternProps) {
  const [displayPattern, setDisplayPattern] = useState(animate ? '' : pattern);

  useEffect(() => {
    if (!animate) return;

    const lines = pattern.split('\n');
    let currentLine = 0;
    let currentChar = 0;

    const interval = setInterval(() => {
      if (currentLine >= lines.length) {
        clearInterval(interval);
        return;
      }

      const line = lines[currentLine];
      if (currentChar >= line.length) {
        currentLine++;
        currentChar = 0;
        setDisplayPattern(prev => prev + '\n');
      } else {
        setDisplayPattern(prev => prev + line[currentChar]);
        currentChar++;
      }
    }, 5);

    return () => clearInterval(interval);
  }, [pattern, animate]);

  return (
    <pre className={`ascii-canvas ${className}`}>
      {displayPattern}
    </pre>
  );
}

// Generative ASCII noise background
export function AsciiNoise({ className = '' }: { className?: string }) {
  const outputRef = useRef<HTMLPreElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const output = outputRef.current;
    if (!output) return;

    const chars = ' .:+*#';
    const width = Math.floor(window.innerWidth / 8);
    const height = Math.floor(window.innerHeight / 12);

    const render = () => {
      let ascii = '';
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const noise = Math.random();
          // Create subtle waves
          const wave = Math.sin(x * 0.1 + Date.now() * 0.001) * 0.5 + 0.5;
          const combined = noise * 0.3 + wave * 0.7;
          const charIndex = Math.floor(combined * (chars.length - 1));
          ascii += chars[Math.min(charIndex, chars.length - 1)];
        }
        ascii += '\n';
      }
      output.textContent = ascii;
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <pre
      ref={outputRef}
      className={`ascii-canvas fixed inset-0 -z-10 opacity-[0.03] pointer-events-none ${className}`}
      style={{ fontSize: '8px', lineHeight: '10px' }}
    />
  );
}
