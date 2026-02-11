'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

const research = [
  {
    title: 'SDIM: A Qudit Stabilizer Simulator',
    venue: 'PLanQC 2025 @ ASPLOS 2026',
    description: 'Efficient simulation methods for quantum stabilizer states in higher-dimensional quantum systems.',
    tags: ['Quantum Computing', 'Simulation'],
    link: 'https://popl25.sigplan.org/details/planqc-2025-papers/17/Sdim-A-Qudit-Stabilizer-Simulator',
  },
  {
    title: 'XR, Experiential & Multimedia Learning',
    venue: 'Aresty Rutgers Journal',
    description: 'Research on immersive learning experiences and their impact on student engagement and retention.',
    tags: ['XR', 'Education', 'ML'],
    link: 'https://arestyrurj.libraries.rutgers.edu/index.php/arestyrurj/article/view/239',
  },
];

export default function Research() {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="research" ref={sectionRef} className="py-24 md:py-32 border-t border-gray-900">
      <div className="container-wide">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-gray-500 text-sm font-mono mb-2">03</p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Research</h2>
        </div>

        {/* Research Items */}
        <div className="grid gap-px bg-gray-900">
          {research.map((item, index) => (
            <Link
              key={item.title}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-black p-6 md:p-8 transition-all duration-700 hover:bg-gray-950 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-gray-600 text-sm font-mono mb-2">{item.venue}</p>
                  <h3 className="text-lg md:text-xl font-medium text-white group-hover:text-gray-300 transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm max-w-2xl">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-gray-600 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
