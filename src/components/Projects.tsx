'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const projects = [
  {
    title: 'Graphene',
    description: 'AI-powered browser. Browser-based agent framework using Browser-Use to build a Large Action Model with RAG.',
    tags: ['TypeScript', 'Python', 'AI', 'Browser'],
    link: 'https://github.com/rutmehta',
    featured: true,
    year: '2024',
  },
  {
    title: 'SageTech / MetaWeaver',
    description: 'Unity-based XR learning platform. ML models for engagement prediction (95%+ accuracy). Text-to-3D generative AI.',
    tags: ['Unity', 'C#', 'ML', 'XR'],
    link: 'https://sagetech.info',
    featured: true,
    year: '2021',
  },
  {
    title: 'Drone Sentry',
    description: 'AGI House AI Defense Hackathon winner ($25K). Hybrid aerial/underwater autonomous patrol system using LangChain and Llama.',
    tags: ['CV', 'LangChain', 'Llama'],
    link: 'https://github.com/DivyamJindal/sentry',
    featured: true,
    year: '2024',
  },
  {
    title: 'SDIM Quantum Simulator',
    description: 'Qudit stabilizer simulator for quantum computing research. Presented at PLanQC 2025, submitted to ASPLOS 2026.',
    tags: ['Quantum', 'Python', 'Research'],
    link: 'https://arxiv.org/abs/2511.12777',
    featured: true,
    year: '2025',
  },
  {
    title: 'Job Hunt Game',
    description: 'Interactive platformer for CS students with AI-powered interview simulations using Crew.AI.',
    tags: ['Phaser', 'Crew.AI', 'GenAI'],
    link: 'https://github.com/AdmiralX7/UnemploymentStudios',
    year: '2024',
  },
  {
    title: 'Mangrove Browser',
    description: 'Custom browser and extension with privacy-focused features.',
    tags: ['JavaScript', 'Browser'],
    link: 'https://github.com/rutmehta/MangroveBrowser',
    year: '2023',
  },
  {
    title: 'Auto Job',
    description: 'Automated job application tool for streamlining job search.',
    tags: ['Python', 'Automation'],
    link: 'https://github.com/rutmehta/auto_job',
    year: '2023',
  },
];

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const displayedProjects = showAll ? projects : projects.filter(p => p.featured);

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
    <section id="projects" ref={sectionRef} className="py-24 md:py-32 border-t border-gray-900">
      <div className="container-wide">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-gray-500 text-sm font-mono mb-2">01</p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">Projects</h2>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-gray-500 hover:text-white transition-colors underline underline-offset-4"
          >
            {showAll ? 'Show featured' : 'View all'}
          </button>
        </div>

        {/* Projects List */}
        <div className="space-y-px bg-gray-900">
          {displayedProjects.map((project, index) => (
            <Link
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group block bg-black p-6 md:p-8 transition-all duration-500 hover:bg-gray-950 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg md:text-xl font-medium text-white group-hover:text-gray-300 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-gray-600 text-sm font-mono">{project.year}</span>
                    {project.featured && (
                      <span className="hidden md:inline-block w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <p className="text-gray-500 text-sm md:text-base max-w-2xl">
                    {project.description}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
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

        {/* GitHub Link */}
        <div className="mt-12 text-center">
          <Link
            href="https://github.com/rutmehta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            More on GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
