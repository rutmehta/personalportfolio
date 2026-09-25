// Shared colors and formatting for the blog charts. Safe to import from server and client components.
// One accent color for Jev. Everything else is white or gray on black.
export const JEV = '#f0a33c';
export const INK = '#e5e5e5';
export const MUTED = '#a3a3a3';
export const FAINT = '#525252';
export const GRID = '#262626';

export const pct = (x: number, d = 1) => (x * 100).toFixed(d) + '%';
