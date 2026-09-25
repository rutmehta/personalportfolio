'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';

import { INK, JEV, pct } from './theme';

export { FAINT, GRID, INK, JEV, MUTED, pct } from './theme';

// Width of a container in CSS pixels, so charts draw at real size instead of scaling text down.
export function useWidth<T extends HTMLElement>(fallback = 640) {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(fallback);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(Math.max(260, Math.floor(el.getBoundingClientRect().width)));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

export function Figure({ title, caption, children }: { title: string; caption?: ReactNode; children: ReactNode }) {
  return (
    <figure className="my-8">
      <div className="text-sm text-gray-300 mb-3">{title}</div>
      {children}
      {caption && <figcaption className="text-xs text-gray-500 mt-3 leading-relaxed">{caption}</figcaption>}
    </figure>
  );
}

export function Toggle<K extends string>({ options, value, onChange, label }: { options: { key: K; label: string }[]; value: K; onChange: (k: K) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1.5 mb-4">
      {options.map((o) => (
        <button
          key={o.key}
          type="button"
          role="radio"
          aria-checked={value === o.key}
          onClick={() => onChange(o.key)}
          className={`text-xs font-mono px-2.5 py-1.5 rounded border transition-colors ${
            value === o.key ? 'border-gray-400 text-white bg-gray-900' : 'border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-600'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// Horizontal bar list in HTML, so labels wrap on narrow screens.
export type BarRow = { label: string; sub?: string; value: number; jev?: boolean; muted?: boolean; display?: string };
export function BarList({ rows, max = 1, min = 0, ariaLabel, reference }: { rows: BarRow[]; max?: number; min?: number; ariaLabel: string; reference?: { value: number; label: string } }) {
  const X = (v: number) => ((Math.max(min, Math.min(max, v)) - min) / (max - min)) * 100;
  return (
    <div role="list" aria-label={ariaLabel} className="space-y-2.5">
      {rows.map((r) => (
        <div role="listitem" key={r.label + (r.sub || '')} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 items-baseline">
          <div className="min-w-0">
            <span className={`text-sm ${r.jev ? 'font-medium' : r.muted ? 'text-gray-500' : 'text-gray-300'}`} style={r.jev ? { color: JEV } : undefined}>
              {r.label}
            </span>
            {r.sub && <span className="text-xs text-gray-500"> · {r.sub}</span>}
          </div>
          <span className="text-sm font-mono tabular-nums" style={{ color: r.jev ? JEV : r.muted ? '#737373' : INK }}>
            {r.display ?? pct(r.value)}
          </span>
          <div className="col-span-2 relative h-2 mt-1 bg-gray-950 rounded-sm">
            <div className="absolute inset-y-0 left-0 rounded-sm" style={{ width: X(r.value) + '%', background: r.jev ? JEV : r.muted ? '#404040' : '#8a8a8a' }} />
            {reference && <div className="absolute -top-1 -bottom-1 w-px bg-gray-500" style={{ left: X(reference.value) + '%' }} />}
          </div>
        </div>
      ))}
      {reference && <div className="text-xs text-gray-500 pt-1">Thin line: {reference.label}</div>}
    </div>
  );
}
