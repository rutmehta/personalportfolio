'use client';
import { useEffect, useState, useCallback } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { Container } from '@tsparticles/engine';

export default function ParticleBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    // Particles loaded
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles-hero"
      particlesLoaded={particlesLoaded}
      className="absolute inset-0"
      style={{ zIndex: 0 }}
      options={{
        fullScreen: false,
        background: {
          color: { value: 'transparent' },
        },
        fpsLimit: 60,
        particles: {
          color: { value: '#ffffff' },
          links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.02,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.4,
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'bounce' },
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
          number: {
            value: typeof window !== 'undefined' && window.innerWidth < 768 ? 40 : 80,
            density: { enable: true, width: 800, height: 800 },
          },
          opacity: {
            value: { min: 0.01, max: 0.06 },
            animation: {
              enable: true,
              speed: 0.5,
              startValue: 'random',
              sync: false,
            },
          },
          shape: { type: 'circle' },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'grab',
            },
          },
          modes: {
            grab: {
              distance: 200,
              links: { opacity: 0.1 },
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
