'use client';
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useTextScrambleOnMount } from '@/hooks/useTextScramble';
import Link from 'next/link';

const ParticleBackground = dynamic(() => import('./ParticleBackground'), { ssr: false });

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const { displayText: nameText } = useTextScrambleOnMount('Rut Mehta', {
    delay: 300,
    speed: 40,
    scramble: 8,
  });

  const { displayText: taglineText } = useTextScrambleOnMount('building for humanity', {
    delay: 800,
    speed: 30,
    scramble: 6,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // ASCII wave animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = ' .:-=+*#%@';
    const fontSize = 12;
    let cols: number;
    let rows: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / (fontSize * 0.6));
      rows = Math.floor(canvas.height / fontSize);
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const wave1 = Math.sin(x * 0.05 + time * 0.02) * Math.cos(y * 0.03 + time * 0.01);
          const wave2 = Math.sin((x + y) * 0.02 + time * 0.015);
          const combined = (wave1 + wave2 + 2) / 4;

          const charIndex = Math.floor(combined * (chars.length - 1));
          const char = chars[Math.min(Math.max(charIndex, 0), chars.length - 1)];

          ctx.fillText(char, x * fontSize * 0.6, y * fontSize);
        }
      }

      time++;
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Layer 1: Particle Background (z-0) */}
      <ParticleBackground />

      {/* Layer 2: ASCII Wave (z-5) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 5, mixBlendMode: 'screen' }}
      />

      {/* Content */}
      <div className="relative z-10 container-narrow text-center">
        <div
          className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {/* Small intro text */}
          <p className="text-gray-500 text-sm font-mono mb-6 tracking-wider">
            founder / engineer / researcher
          </p>

          {/* Name with scramble effect */}
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-4 font-mono">
            {nameText || '\u00A0'}
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-gray-400 mb-8">
            {taglineText || '\u00A0'}
          </p>

          {/* Description */}
          <p className="text-gray-500 max-w-lg mx-auto mb-12 leading-relaxed">
            Rutgers CS + Business Analytics grad. 2x founder. Currently building{' '}
            <Link href="https://interfere.ai" target="_blank" className="text-white hover:underline underline-offset-4">
              Interfere
            </Link>{' '}
            (YC S25) — self-healing software.
          </p>

          {/* Minimal CTAs */}
          <div className="flex items-center justify-center gap-6">
            <Link
              href="#projects"
              className="text-sm text-gray-400 hover:text-white transition-colors underline underline-offset-4"
            >
              View work
            </Link>
            <span className="text-gray-700">|</span>
            <Link
              href="#contact"
              className="text-sm text-gray-400 hover:text-white transition-colors underline underline-offset-4"
            >
              Get in touch
            </Link>
            <span className="text-gray-700">|</span>
            <button
              onClick={() => {
                const event = new KeyboardEvent('keydown', {
                  key: 'k',
                  metaKey: true,
                  bubbles: true,
                });
                document.dispatchEvent(event);
              }}
              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <kbd className="text-xs">⌘K</kbd>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <span className="text-xs font-mono">scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent" />
        </div>
      </div>
    </section>
  );
}
