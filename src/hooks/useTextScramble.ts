'use client';
import { useState, useEffect, useCallback } from 'react';

const chars = '!<>-_\\/[]{}—=+*^?#________';

interface ScrambleOptions {
  speed?: number;
  tick?: number;
  scramble?: number;
  seed?: number;
  onComplete?: () => void;
}

export function useTextScramble(
  finalText: string,
  options: ScrambleOptions = {}
) {
  const {
    speed = 50,
    tick = 1,
    scramble = 10,
    seed = 3,
    onComplete,
  } = options;

  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const animate = useCallback(() => {
    setIsAnimating(true);
    let iteration = 0;
    const maxIterations = finalText.length * scramble;

    const interval = setInterval(() => {
      setDisplayText(
        finalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / seed) {
              return finalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      iteration += tick;

      if (iteration > maxIterations) {
        clearInterval(interval);
        setDisplayText(finalText);
        setIsAnimating(false);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [finalText, speed, tick, scramble, seed, onComplete]);

  const trigger = useCallback(() => {
    animate();
  }, [animate]);

  return { displayText, isAnimating, trigger };
}

export function useTextScrambleOnMount(
  finalText: string,
  options: ScrambleOptions & { delay?: number } = {}
) {
  const { delay = 0, ...scrambleOptions } = options;
  const { displayText, isAnimating, trigger } = useTextScramble(
    finalText,
    scrambleOptions
  );

  useEffect(() => {
    const timeout = setTimeout(trigger, delay);
    return () => clearTimeout(timeout);
  }, [trigger, delay]);

  return { displayText, isAnimating };
}
