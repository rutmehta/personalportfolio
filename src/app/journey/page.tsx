'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { timelineNodes, TimelineNode } from '@/data/timeline';
import TimelineDetail from '@/components/TimelineDetail';
import { toMonths } from '@/lib/timelineLayout';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const TYPE_LABEL: Record<TimelineNode['type'], string> = {
  company: 'Work',
  project: 'Project',
  research: 'Research',
  award: 'Award',
  education: 'Education',
  program: 'Program',
};

const TYPE_STYLE: Record<TimelineNode['type'], string> = {
  company: 'text-gray-300',
  project: 'text-gray-400',
  research: 'text-gray-400',
  award: 'text-yellow-300',
  education: 'text-blue-300',
  program: 'text-purple-300',
};

function formatPeriod(node: TimelineNode) {
  const start = `${MONTH_NAMES[node.month - 1]} ${node.year}`;
  if (node.endYear && node.endMonth) {
    return `${start} - ${MONTH_NAMES[node.endMonth - 1]} ${node.endYear}`;
  }
  return start;
}

export default function JourneyPage() {
  const [selectedNode, setSelectedNode] = useState<TimelineNode | null>(null);

  const sortedNodes = useMemo(
    () => [...timelineNodes].sort((a, b) => toMonths(b.year, b.month) - toMonths(a.year, a.month)),
    []
  );

  const maxYear = useMemo(
    () => Math.max(2026, ...timelineNodes.map((node) => node.endYear ?? node.year)),
    []
  );

  const minYear = useMemo(
    () => Math.min(...timelineNodes.map((node) => node.year)),
    []
  );

  const years = useMemo(() => {
    return Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i);
  }, [maxYear, minYear]);

  const nodesByYear = useMemo(() => {
    const yearMap = new Map<number, TimelineNode[]>();
    years.forEach((year) => yearMap.set(year, []));
    sortedNodes.forEach((node) => {
      // Show each milestone once: if it spans years, anchor to the latest year.
      const displayYear = node.endYear && node.endYear > node.year ? node.endYear : node.year;
      if (!yearMap.has(displayYear)) yearMap.set(displayYear, []);
      yearMap.get(displayYear)!.push(node);
    });
    return yearMap;
  }, [sortedNodes, years]);

  return (
    <>
      <main className="min-h-screen pt-24 pb-20">
        <div className="container-wide">
          <div className="mb-12">
            <Link
              href="/"
              className="text-gray-500 text-sm hover:text-white transition-colors mb-8 inline-block"
            >
              ← Back
            </Link>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Journey</h1>
            <p className="text-gray-500 max-w-2xl">
              A vertical timeline from 2026 downward. Minimal, chronological, and easy to scan.
              Click any milestone to open the full story.
            </p>
          </div>

          <div className="border-t border-gray-900">
            {years.map((year) => {
              const yearNodes = nodesByYear.get(year) ?? [];
              return (
                <section
                  key={year}
                  className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-10 py-10 border-b border-gray-900"
                >
                  <div className="md:pt-1">
                    <h2 className="text-2xl md:text-3xl font-mono text-gray-500">{year}</h2>
                  </div>

                  <div className="relative">
                    <div className="absolute left-[5px] top-0 bottom-0 w-px bg-gray-900" />
                    {yearNodes.length === 0 ? (
                      year === maxYear ? (
                        <div className="relative pl-10">
                          <span className="absolute left-0 top-1 h-3 w-3 rounded-full bg-black border border-gray-700" />
                          <p className="text-sm text-gray-500">
                            Current chapter in progress. New milestones will appear here.
                          </p>
                        </div>
                      ) : null
                    ) : (
                      <div className="space-y-8">
                        {yearNodes.map((node) => (
                          <button
                            key={node.id}
                            onClick={() => setSelectedNode(node)}
                            className="group relative block w-full pl-10 text-left"
                          >
                            <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-black border border-gray-700 transition-colors group-hover:border-white group-hover:bg-white" />

                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <span className="text-[11px] font-mono text-gray-600">{formatPeriod(node)}</span>
                              <span className={`text-[10px] uppercase tracking-[0.14em] ${TYPE_STYLE[node.type]}`}>
                                {TYPE_LABEL[node.type]}
                              </span>
                            </div>

                            <p className="text-base md:text-lg font-medium text-white group-hover:text-gray-200 transition-colors">
                              {node.title}
                            </p>
                            <p className="text-sm text-gray-400">{node.subtitle}</p>
                            <p className="text-sm text-gray-500 mt-2 max-w-3xl">{node.description}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>

      <TimelineDetail
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        allNodes={timelineNodes}
      />
    </>
  );
}
