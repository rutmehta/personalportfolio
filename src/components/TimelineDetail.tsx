'use client';
import { useEffect, useCallback } from 'react';
import { TimelineNode } from '@/data/timeline';
import Link from 'next/link';

interface TimelineDetailProps {
  node: TimelineNode | null;
  onClose: () => void;
  allNodes: TimelineNode[];
}

export default function TimelineDetail({ node, onClose, allNodes }: TimelineDetailProps) {
  // Close on escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (node) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [node, handleKeyDown]);

  if (!node) return null;

  const relatedNodes = node.relatedIds
    ?.map(id => allNodes.find(n => n.id === id))
    .filter(Boolean) as TimelineNode[];

  const typeLabels: Record<string, string> = {
    company: 'Experience',
    project: 'Project',
    research: 'Research',
    award: 'Award',
    education: 'Education',
    program: 'Program',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-black border-l border-gray-900 z-50 overflow-y-auto">
        <div className="p-8 min-h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-white transition-colors text-sm"
            >
              &larr; Back
            </button>
            <span className="text-xs text-gray-600 font-mono">
              {typeLabels[node.type]}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-medium tracking-tight mb-2">
            {node.title}
          </h2>
          <p className="text-gray-500 mb-2">{node.subtitle}</p>
          <p className="text-gray-600 text-sm font-mono mb-8">
            {node.month ? `${node.month}/${node.year}` : node.year}
          </p>

          {/* Divider */}
          <div className="h-px bg-gray-900 mb-8" />

          {/* Writeup */}
          <div className="prose prose-invert prose-sm max-w-none mb-8">
            {node.writeup.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-gray-400 leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* What made it special */}
          {node.special && (
            <div className="mb-8">
              <h3 className="text-sm text-gray-500 mb-2">What made it special</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{node.special}</p>
            </div>
          )}

          {/* Highlights */}
          {node.highlights && node.highlights.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm text-gray-500 mb-2">Highlights</h3>
              <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
                {node.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Blog CTA */}
          {node.blogSlug && (
            <div className="mb-8">
              <Link
                href={`/blog/${node.blogSlug}`}
                className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors underline underline-offset-4"
              >
                Read the full story
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          )}

          {/* Related */}
          {relatedNodes && relatedNodes.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm text-gray-500 mb-3">Connected to</h3>
              <div className="flex flex-wrap gap-2">
                {relatedNodes.map(related => (
                  <span
                    key={related.id}
                    className="px-3 py-1 text-sm text-gray-400 border border-gray-800 rounded"
                  >
                    {related.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* External link */}
          {node.link && (
            <Link
              href={node.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors underline underline-offset-4"
            >
              Visit {node.type === 'company' ? 'site' : node.type === 'research' ? 'paper' : 'project'}
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </Link>
          )}

          {/* Keyboard hint */}
          <div className="mt-16 text-center">
            <p className="text-gray-700 text-xs font-mono">
              Press <kbd className="px-1 border border-gray-800 rounded">Esc</kbd> to close
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
