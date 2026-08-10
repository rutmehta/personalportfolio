'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type ProjectImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type ProjectMedia = {
  /** Primary image or poster. Omit for a media-only video. */
  image?: ProjectImage;
  /** Optional muted, looping product demo. It only plays while this region is visible. */
  video?: string;
  /** Optional poster for the video; falls back to image.src. */
  poster?: string;
  /** Description for the media region and video alternative. */
  alt: string;
  gallery?: ProjectImage[];
};

type Project = {
  title: string;
  description: string;
  tags: string[];
  year: string;
  featured?: boolean;
  /** Optional public URL. Omit for in-development / private projects with no link. */
  link?: string;
  /** Optional availability note, e.g. "Open source" or "In development". */
  status?: string;
  /** Optional real product media; projects without it remain text-only. */
  media?: ProjectMedia;
};

const projects: Project[] = [
  {
    title: 'Atoll',
    description:
      'Open-source macOS notch hub. Replicates the NotchNook feature set and adds a live Claude Code / Codex session view in the notch — watch agents work, get pinged when they need you, and approve tool calls without leaving for the terminal.',
    tags: ['Swift', 'SwiftUI', 'macOS'],
    year: '2026',
    featured: true,
    status: 'Open source',
    link: 'https://github.com/rutmehta/Atoll',
    media: {
      image: {
        src: '/media/projects/atoll/home.webp',
        alt: 'Atoll notch hub home view with controls for connected agent sessions.',
        width: 1520,
        height: 920,
      },
      video: '/media/projects/atoll/demo.webm',
      poster: '/media/projects/atoll/home.webp',
      alt: 'Atoll macOS notch hub demonstrating agent activity and approval controls.',
      gallery: [
        {
          src: '/media/projects/atoll/agents-view.webp',
          alt: 'Atoll notch showing active Claude Code and Codex agent sessions.',
          width: 1520,
          height: 920,
        },
        {
          src: '/media/projects/atoll/approval-card.webp',
          alt: 'Atoll tool approval card inside the notch.',
          width: 1520,
          height: 920,
        },
        {
          src: '/media/projects/atoll/shelf.webp',
          alt: 'Atoll shelf showing saved notch content.',
          width: 1520,
          height: 920,
        },
      ],
    },
  },
  {
    title: 'Lenscap',
    description:
      'Free, open-source, 100% local screenshot and screen-recording utility for macOS. Menu bar capture with ScreenCaptureKit, annotation editor, OCR, and MP4/GIF recording — no cloud, no accounts, no analytics.',
    tags: ['Swift', 'SwiftUI', 'macOS'],
    year: '2026',
    featured: true,
    status: 'Open source',
    link: 'https://github.com/rutmehta/Lenscap',
    media: {
      image: {
        src: '/media/projects/lenscap/menu-bar-panel.webp',
        alt: 'Lenscap compact menu-bar panel with capture and recording actions.',
        width: 696,
        height: 968,
      },
      alt: 'Lenscap menu-bar panel, capture selection overlay, and quick-access controls.',
      gallery: [
        {
          src: '/media/projects/lenscap/capture-selection.webp',
          alt: 'Lenscap capture selection overlay with crosshair, rectangle, and size label.',
          width: 1800,
          height: 1120,
        },
        {
          src: '/media/projects/lenscap/quick-access.webp',
          alt: 'Lenscap quick-access overlay for a captured screenshot.',
          width: 592,
          height: 426,
        },
      ],
    },
  },
  {
    title: 'Prism',
    description:
      'In development: semantic search over a Lightroom library. Indexes smart previews into browsable JPEGs with a metadata DB, scores sharpness, and lets you search photos by describing them in plain language.',
    tags: ['Python', 'Embeddings', 'Lightroom'],
    year: '2026',
    featured: true,
    status: 'In development',
  },
  {
    title: 'Graphene',
    description:
      'Native macOS browser built for knowledge work. History as a navigable graph, in-place annotation with provenance, and an AI layer that reasons over your thread of thought.',
    tags: ['Swift', 'WKWebView', 'AI'],
    year: '2025',
    link: 'https://github.com/rutmehta/graphene',
  },
  {
    title: 'Better Keyboard',
    description: 'iOS keyboard with SHARK2 swipe typing and on-device AI via Apple Foundation Models.',
    tags: ['Swift', 'iOS', 'AI'],
    year: '2026',
    link: 'https://github.com/rutmehta/better-keyboard',
  },
  {
    title: 'Drone Sentry',
    description:
      'AGI House AI Defense Hackathon winner ($25K). Hybrid aerial/underwater autonomous patrol system using LangChain and Llama.',
    tags: ['CV', 'LangChain', 'Llama'],
    year: '2024',
    link: 'https://github.com/DivyamJindal/sentry',
  },
  {
    title: 'Job Hunt Game',
    description:
      'Interactive platformer for CS students with AI-powered interview simulations using Crew.AI.',
    tags: ['Phaser', 'Crew.AI', 'GenAI'],
    year: '2024',
    link: 'https://github.com/AdmiralX7/UnemploymentStudios',
  },
  {
    title: 'Mangrove Browser',
    description: 'Custom browser and extension with privacy-focused features.',
    tags: ['JavaScript', 'Browser'],
    year: '2023',
    link: 'https://github.com/rutmehta/MangroveBrowser',
  },
  {
    title: 'Auto Job',
    description: 'Automated job application tool for streamlining job search.',
    tags: ['Python', 'Automation'],
    year: '2023',
    link: 'https://github.com/rutmehta/auto_job',
  },
];

function ProjectMediaView({ media }: { media: ProjectMedia }) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);

    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    const element = mediaRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '160px 0px', threshold: 0.01 }
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible && !reduceMotion) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isVisible, reduceMotion]);

  const primaryImage = media.image;
  const poster = media.poster ?? primaryImage?.src;

  return (
    <figure ref={mediaRef} className="mt-8" aria-label={media.alt}>
      <div className="grid gap-2 md:grid-cols-[minmax(0,1.45fr)_minmax(0,0.75fr)]">
        <div className="relative aspect-[16/9] overflow-hidden rounded-sm border border-gray-900 bg-[#0a0a0a]">
          {media.video ? (
            <video
              ref={videoRef}
              className="h-full w-full object-contain"
              src={media.video}
              poster={poster}
              muted
              loop
              playsInline
              preload={isVisible && !reduceMotion ? 'metadata' : 'none'}
              aria-label={media.alt}
            />
          ) : primaryImage ? (
            <Image
              src={primaryImage.src}
              alt={primaryImage.alt}
              width={primaryImage.width}
              height={primaryImage.height}
              sizes="(max-width: 768px) 100vw, 65vw"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-contain"
            />
          ) : null}
        </div>

        {media.gallery && media.gallery.length > 0 && (
          <div className="grid grid-cols-2 gap-2 content-start md:grid-cols-2">
            {media.gallery.map(image => (
              <div
                key={image.src}
                className="relative aspect-[16/9] overflow-hidden rounded-sm border border-gray-900 bg-[#0a0a0a]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(max-width: 768px) 50vw, 18vw"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </figure>
  );
}

function ProjectCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  const transitionStyle = { transitionDelay: `${index * 100}ms` };

  const baseClasses =
    'block bg-black p-6 md:p-8 transition-all duration-500 ' +
    (inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4');

  const expandArrow = project.link && (
    <svg
      className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
      />
    </svg>
  );

  const content = (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2 flex-wrap">
            <h3 className="text-lg md:text-xl font-medium text-white transition-colors group-hover:text-gray-300">
              {project.title}
            </h3>
            <span className="text-gray-500 text-sm font-mono">{project.year}</span>
            {project.status && (
              <span className="text-xs font-mono px-2 py-0.5 border border-gray-800 text-gray-400">
                {project.status}
              </span>
            )}
          </div>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl">{project.description}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs text-gray-500 font-mono">
                {tag}
              </span>
            ))}
          </div>
          {expandArrow}
        </div>
      </div>

      {project.media && <ProjectMediaView media={project.media} />}
    </>
  );

  if (project.link) {
    return (
      <Link
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        style={transitionStyle}
        className={`group ${baseClasses} hover:bg-gray-950 focus-visible:bg-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-500`}
      >
        {content}
      </Link>
    );
  }

  return (
    <article style={transitionStyle} className={`group ${baseClasses}`}>
      {content}
    </article>
  );
}

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
    <section id="projects" ref={sectionRef} className="pt-12 md:pt-16 pb-24 md:pb-32 border-t border-gray-900">
      <div className="container-wide">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-gray-500 text-sm font-mono mb-2">02</p>
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
            <ProjectCard key={project.title} project={project} index={index} inView={inView} />
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
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
