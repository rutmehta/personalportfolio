import Link from 'next/link';
import type { ReactNode } from 'react';

export function PostShell({ title, date, tags, children }: { title: string; date: string; tags: string[]; children: ReactNode }) {
  return (
    <main className="min-h-screen pt-24 pb-20">
      <article className="mx-auto w-full max-w-[720px] px-4 sm:px-6">
        <Link href="/blog" className="text-gray-500 text-sm hover:text-white transition-colors mb-8 inline-block">
          ← Blog
        </Link>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4 text-sm font-mono text-gray-500">
          <time dateTime={date}>{new Date(date + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })}</time>
          {tags.map((t) => (
            <span key={t} className="text-xs">{t}</span>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">{title}</h1>
        <div className="post-body">{children}</div>
      </article>
    </main>
  );
}

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mt-14 scroll-mt-24">
      <h2 className="text-xl md:text-2xl font-medium tracking-tight mb-4">
        <a href={`#${id}`} className="hover:text-gray-300">{title}</a>
      </h2>
      {children}
    </section>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-gray-300 leading-relaxed mb-4">{children}</p>;
}

export type ScoreRow = { name: string; jev: string; top: ReactNode; other: ReactNode };

export function Scorecard({ rows, headers }: { rows: ScoreRow[]; headers: [string, string, string, string] }) {
  return (
    <div className="border-t border-gray-800">
      <div className="hidden sm:grid grid-cols-[9rem_5rem_minmax(0,1fr)_minmax(0,1fr)] gap-4 py-2 text-xs text-gray-500 border-b border-gray-900">
        {headers.map((h) => <span key={h}>{h}</span>)}
      </div>
      {rows.map((r) => (
        <div key={r.name} className="grid grid-cols-[minmax(0,1fr)_auto] sm:grid-cols-[9rem_5rem_minmax(0,1fr)_minmax(0,1fr)] gap-x-4 gap-y-1 py-3 border-b border-gray-900 text-sm">
          <span className="text-white">{r.name}</span>
          <span className="font-mono tabular-nums text-right sm:text-left text-[#f0a33c]">{r.jev}</span>
          <span className="col-span-2 sm:col-span-1 text-gray-300"><span className="sm:hidden text-gray-500">{headers[2]}: </span>{r.top}</span>
          <span className="col-span-2 sm:col-span-1 text-gray-400"><span className="sm:hidden text-gray-500">{headers[3]}: </span>{r.other}</span>
        </div>
      ))}
    </div>
  );
}

export function Details({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details className="group border-b border-gray-900 py-4">
      <summary className="cursor-pointer text-gray-200 list-none flex justify-between gap-4 [&::-webkit-details-marker]:hidden">
        <span>{summary}</span>
        <span className="text-gray-500 font-mono group-open:rotate-45 transition-transform">+</span>
      </summary>
      <div className="mt-4 text-sm text-gray-400 leading-relaxed space-y-3">{children}</div>
    </details>
  );
}

export function SmallTable({ head, rows, caption }: { head: string[]; rows: (string | ReactNode)[][]; caption?: string }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full text-sm">
        {caption && <caption className="text-left text-sm text-gray-300 mb-3">{caption}</caption>}
        <thead>
          <tr className="border-b border-gray-800 text-xs text-gray-500">
            {head.map((h, i) => <th key={h} className={`py-2 pr-3 font-normal ${i ? 'text-right' : 'text-left'}`}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, k) => (
            <tr key={k} className="border-b border-gray-900">
              {r.map((c, i) => <td key={i} className={`py-2 pr-3 align-top ${i ? 'text-right font-mono tabular-nums text-gray-300' : 'text-gray-300'}`}>{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
