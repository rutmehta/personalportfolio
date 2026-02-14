'use client';
import { useEffect, useState, useRef } from 'react';
import { useTextScrambleOnMount } from '@/hooks/useTextScramble';
import Link from 'next/link';

interface Neuron {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  activation: number;
  baseActivation: number;
}

interface Wave {
  x: number;
  y: number;
  radius: number;
  strength: number;
  speed: number;
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const neuronsRef = useRef<Neuron[]>([]);
  const wavesRef = useRef<Wave[]>([]);

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

  // Dense neural tissue animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const chars = ' .·:;+*#%@';
    const fontSize = 11;
    const charWidth = fontSize * 0.6;
    let cols = 0;
    let rows = 0;

    // Generate dense neuron field
    const generateNeurons = (): Neuron[] => {
      const neurons: Neuron[] = [];
      const count = 400;

      for (let i = 0; i < count; i++) {
        // Clustered distribution - some areas denser than others
        const clusterX = Math.random();
        const clusterY = Math.random();
        const spread = 0.15 + Math.random() * 0.1;

        neurons.push({
          x: clusterX + (Math.random() - 0.5) * spread,
          y: clusterY + (Math.random() - 0.5) * spread,
          z: Math.random(), // depth layer
          vx: (Math.random() - 0.5) * 0.0004,
          vy: (Math.random() - 0.5) * 0.0004,
          activation: Math.random() * 0.3,
          baseActivation: Math.random() * 0.2,
        });
      }

      return neurons;
    };

    neuronsRef.current = generateNeurons();
    wavesRef.current = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / charWidth);
      rows = Math.floor(canvas.height / fontSize);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const prev = mouseRef.current;
      const curr = { x: e.clientX, y: e.clientY };

      // Spawn wave on significant mouse movement
      const dx = curr.x - prev.x;
      const dy = curr.y - prev.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 15 && wavesRef.current.length < 10) {
        wavesRef.current.push({
          x: curr.x / canvas.width,
          y: curr.y / canvas.height,
          radius: 0,
          strength: 0.9,
          speed: 0.025,
        });
      }

      mouseRef.current = curr;
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let frameCount = 0;

    const render = () => {
      frameCount++;
      const neurons = neuronsRef.current;
      const waves = wavesRef.current;
      const mouse = mouseRef.current;

      // Spawn random activity waves
      if (frameCount % 45 === 0 && waves.length < 8) {
        waves.push({
          x: Math.random(),
          y: Math.random(),
          radius: 0,
          strength: 0.7 + Math.random() * 0.3,
          speed: 0.015 + Math.random() * 0.02,
        });
      }

      // Update waves
      for (let i = waves.length - 1; i >= 0; i--) {
        waves[i].radius += waves[i].speed;
        waves[i].strength *= 0.995;
        if (waves[i].strength < 0.05 || waves[i].radius > 1.5) {
          waves.splice(i, 1);
        }
      }

      // Update neurons
      for (const neuron of neurons) {
        // Drift
        neuron.x += neuron.vx;
        neuron.y += neuron.vy;

        // Wrap around
        if (neuron.x < -0.1) neuron.x = 1.1;
        if (neuron.x > 1.1) neuron.x = -0.1;
        if (neuron.y < -0.1) neuron.y = 1.1;
        if (neuron.y > 1.1) neuron.y = -0.1;

        // Calculate activation from waves
        let waveActivation = 0;
        for (const wave of waves) {
          const dx = neuron.x - wave.x;
          const dy = neuron.y - wave.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ringDist = Math.abs(dist - wave.radius);

          if (ringDist < 0.05) {
            const intensity = (1 - ringDist / 0.05) * wave.strength;
            waveActivation = Math.max(waveActivation, intensity);
          }
        }

        // Mouse proximity activation - tighter radius for more responsive feel
        const mouseNormX = mouse.x / canvas.width;
        const mouseNormY = mouse.y / canvas.height;
        const mouseDx = neuron.x - mouseNormX;
        const mouseDy = neuron.y - mouseNormY;
        const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

        if (mouseDist < 0.08) {
          const mouseInfluence = (1 - mouseDist / 0.08) * 0.9;
          waveActivation = Math.max(waveActivation, mouseInfluence);
        }

        // Faster activation transition for snappier response
        const targetActivation = neuron.baseActivation + waveActivation;
        neuron.activation += (targetActivation - neuron.activation) * 0.3;

        // Subtle pulse in base activation
        neuron.baseActivation = 0.1 + Math.sin(frameCount * 0.02 + neuron.x * 10 + neuron.y * 10) * 0.05;
      }

      // Render character grid
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      // Build influence grid
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const charX = col / cols;
          const charY = row / rows;

          // Sum influence from nearby neurons
          let totalInfluence = 0;
          let neuronCount = 0;

          for (const neuron of neurons) {
            const dx = charX - neuron.x;
            const dy = charY - neuron.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Influence radius varies by depth - tighter for less cloudy look
            const influenceRadius = 0.025 + neuron.z * 0.02;

            if (dist < influenceRadius) {
              const falloff = 1 - (dist / influenceRadius);
              const depthFactor = 0.5 + neuron.z * 0.5;
              totalInfluence += neuron.activation * falloff * falloff * depthFactor;
              neuronCount++;
            }
          }

          // Normalize and clamp
          if (neuronCount > 0) {
            totalInfluence = Math.min(1, totalInfluence);
          }

          // Map to character
          const charIndex = Math.floor(totalInfluence * (chars.length - 1));
          const char = chars[Math.min(charIndex, chars.length - 1)];

          // Skip empty characters for performance
          if (charIndex === 0) continue;

          // Opacity based on influence
          const opacity = 0.08 + totalInfluence * 0.25;
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.fillText(char, col * charWidth, row * fontSize + fontSize);
        }
      }

      // Draw subtle ASCII connections between active nearby neurons
      for (let i = 0; i < neurons.length; i++) {
        const n1 = neurons[i];
        if (n1.activation < 0.35) continue;

        for (let j = i + 1; j < neurons.length; j++) {
          const n2 = neurons[j];
          if (n2.activation < 0.35) continue;

          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 0.12 && dist > 0.02) {
            const x1 = n1.x * canvas.width;
            const y1 = n1.y * canvas.height;
            const x2 = n2.x * canvas.width;
            const y2 = n2.y * canvas.height;

            // Draw ASCII characters along the connection
            const steps = Math.floor(dist * 80);
            const combinedActivation = Math.min(n1.activation, n2.activation);

            // Choose line character based on angle
            const angle = Math.atan2(dy, dx);
            let lineChar = '-';
            if (Math.abs(angle) > Math.PI * 0.7 || Math.abs(angle) < Math.PI * 0.3) {
              lineChar = '-';
            } else if (angle > 0) {
              lineChar = '\\';
            } else {
              lineChar = '/';
            }
            if (Math.abs(Math.abs(angle) - Math.PI / 2) < 0.3) {
              lineChar = '|';
            }

            for (let s = 1; s < steps - 1; s++) {
              const t = s / steps;
              const px = x1 + (x2 - x1) * t;
              const py = y1 + (y2 - y1) * t;

              const alpha = 0.04 + combinedActivation * 0.08;
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
              ctx.fillText(lineChar, px, py);
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* ASCII Wave Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
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
            Rutgers CS + Business Analytics grad. 2x founder. Building at the intersection of AI and human potential.
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
