'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const research = [
  {
    title: 'SDIM: A Qudit Stabilizer Simulator',
    tagline: 'Quantum error correction beyond qubits',
    venue: 'PLanQC 2025 @ POPL',
    link: 'https://arxiv.org/abs/2511.12777',
  },
  {
    title: 'XR & Experiential Learning',
    tagline: 'Immersive tech for how we learn',
    venue: 'Aresty Research Journal',
    link: 'https://arestyrurj.libraries.rutgers.edu/index.php/arestyrurj/article/view/239',
  },
];

const skills = [
  { name: 'TypeScript', url: 'https://www.typescriptlang.org' },
  { name: 'Python', url: 'https://www.python.org' },
  { name: 'Java', url: 'https://www.java.com' },
  { name: 'C++', url: 'https://isocpp.org' },
  { name: 'C#', url: 'https://dotnet.microsoft.com/languages/csharp' },
  { name: 'Rust', url: 'https://www.rust-lang.org' },
  { name: 'React', url: 'https://react.dev' },
  { name: 'Next.js', url: 'https://nextjs.org' },
  { name: 'Node.js', url: 'https://nodejs.org' },
  { name: 'Unity', url: 'https://unity.com' },
  { name: 'PyTorch', url: 'https://pytorch.org' },
  { name: 'TensorFlow', url: 'https://www.tensorflow.org' },
  { name: 'LangChain', url: 'https://www.langchain.com' },
  { name: 'OpenAI', url: 'https://platform.openai.com' },
  { name: 'Anthropic', url: 'https://www.anthropic.com' },
  { name: 'Hugging Face', url: 'https://huggingface.co' },
  { name: 'Vercel AI SDK', url: 'https://sdk.vercel.ai' },
  { name: 'Three.js', url: 'https://threejs.org' },
  { name: 'PostgreSQL', url: 'https://www.postgresql.org' },
  { name: 'Redis', url: 'https://redis.io' },
  { name: 'AWS', url: 'https://aws.amazon.com' },
  { name: 'Docker', url: 'https://www.docker.com' },
  { name: 'Kubernetes', url: 'https://kubernetes.io' },
];

const experience = [
  {
    company: 'Endex.ai',
    role: 'Member of Technical Staff — AI',
    period: 'Feb 2026 – Present',
    description: 'Spearheading AI at Endex. Building fully autonomous AI analysts.',
    link: 'https://endex.ai',
  },
  {
    company: 'Roam',
    role: 'Founding AI Engineer',
    period: 'Jun 2025 – Jan 2026',
    description: 'Built AI systems for AI-powered game creation platform enabling text-to-game generation.',
    link: 'https://roam.lol',
  },
  {
    company: 'NJBDA',
    role: 'Software Engineering Intern',
    period: 'Jan 2025 – May 2025',
    description: 'Making course credits transfer seamlessly across universities with AI.',
  },
  {
    company: 'T-Mobile',
    role: 'AI Hardware/Software Intern',
    period: 'May 2024 – Aug 2024',
    description: 'Prototyped and built an AI phone end-to-end — hardware, software, storytelling, and GTM.',
    link: 'https://www.tmobile.com'
  },
  {
    company: 'NASA Ames Research Center',
    role: 'Service Design Intern',
    period: 'Jan 2023 – May 2023',
    description: 'Redesigned how NASA funds early-stage innovation.',
    link: 'https://good-design.org/projects/redesigning-an-equitable-nasa-service-experience-for-small-businesses/'
  },
  {
    company: 'SageTech',
    role: 'Founder',
    period: 'Oct 2021 – Dec 2024',
    description: 'AI/XR experiential learning platform. Text-to-3D tool (MetaWeaver). Backed by NSF I-Corps, Rutgers, NJIT.',
  },
  {
    company: 'Rutgers OIT',
    role: 'Level 2 Consultant',
    period: 'Aug 2021 – Present',
    description: 'Running computing infrastructure for 100,000+ students.',
    link: 'https://it.rutgers.edu/'
  },
];

const awards = [
  { title: 'AGI House AI Defense Hackathon', prize: '$25K', year: '2024' },
  { title: 'Undergraduate Student Innovation Award', prize: 'Rutgers', year: '2024' },
  { title: 'Steelcase Social Innovation Fellowship', prize: '$5K', year: '2024' },
  { title: 'J&J AWS Health Hackathon', prize: 'Top 5', year: '2024' },
  { title: 'ScarletPitch Competition', prize: '$1K', year: '2025' },
  { title: 'Google Cloud Award - HackTCNJ', prize: 'Winner', year: '2020' },
  { title: 'Deloitte Cyber Threat Competition', prize: 'Top 40', year: '—' },
  { title: 'National AP Scholar', prize: 'Top 1%', year: '2020' },
];

export default function About() {
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
    <section id="about" ref={sectionRef} className="pt-24 md:pt-32 pb-8">
      <div className="container-wide">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-gray-500 text-sm font-mono mb-2">01</p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight">About</h2>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Bio Card - Spans 2 cols */}
          <div
            className={`bento-item lg:col-span-2 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <h3 className="text-lg font-medium mb-4">Bio</h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              I&apos;m an engineer and researcher passionate about expanding the boundaries of
              human intelligence and building tools that enhance how we work and create.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              Graduated from Rutgers with dual degrees in Computer Science and Business Analytics.
              I&apos;ve built products across AI, XR, quantum computing, and web technologies —
              from AI-powered browsers to experiential learning platforms.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Currently leading AI at Endex.ai. Focused on expanding human intelligence and
              building tools that reduce friction in how we work.
            </p>
          </div>

          {/* Education Card */}
          <div
            className={`bento-item transition-all duration-700 delay-100 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <h3 className="text-lg font-medium mb-4">Education</h3>
            <div className="space-y-4">
              <div>
                <p className="text-white font-medium">Rutgers University</p>
                <p className="text-gray-500 text-sm">B.S. Computer Science</p>
                <p className="text-gray-500 text-sm">B.S. Business Analytics & IT</p>
                <p className="text-gray-500 text-sm">Minor: Mathematics</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-400">GPA: 3.77</span>
                <span className="text-gray-600">|</span>
                <span className="text-gray-400">SAS Honors</span>
              </div>
              <p className="text-gray-500 text-xs">
                Dean&apos;s List · Scarlet Knight Scholar · CS Honors
              </p>
            </div>
          </div>

          {/* Experience Card */}
          <div
            className={`bento-item lg:col-span-2 transition-all duration-700 delay-200 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <h3 className="text-lg font-medium mb-6">Experience</h3>
            <div className="space-y-5">
              {experience.map((exp, i) => (
                <div key={i} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                  <div className="md:w-36 flex-shrink-0">
                    <span className="text-gray-500 text-sm font-mono">{exp.period}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {exp.link ? (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white font-medium hover:text-gray-300 transition-colors underline underline-offset-4 decoration-gray-700 hover:decoration-gray-400"
                        >
                          {exp.company}
                        </a>
                      ) : (
                        <span className="text-white font-medium">{exp.company}</span>
                      )}
                      {(exp as { highlight?: string }).highlight && (
                        <span className="text-xs px-2 py-0.5 bg-white/10 text-gray-300 rounded">
                          {(exp as { highlight?: string }).highlight}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">{exp.role}</p>
                    <p className="text-gray-400 text-sm mt-1">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Awards Card */}
          <div
            className={`bento-item transition-all duration-700 delay-300 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <h3 className="text-lg font-medium mb-4">Awards</h3>
            <div className="space-y-3">
              {awards.slice(0, 5).map((award, i) => (
                <div key={i} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-gray-300 text-sm">{award.title}</p>
                    <p className="text-gray-600 text-xs">{award.year}</p>
                  </div>
                  <span className="text-gray-500 text-sm font-mono flex-shrink-0">{award.prize}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Research Card */}
          <div
            className={`bento-item lg:col-span-3 transition-all duration-700 delay-300 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <h3 className="text-lg font-medium mb-4">Research</h3>
            <div className="space-y-4">
              {research.map((item, i) => (
                <Link
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <p className="text-white group-hover:text-gray-300 transition-colors">{item.title}</p>
                    <span className="text-gray-600 text-sm">{item.tagline}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.venue}</p>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Stack - outside bento grid */}
        <div
          className={`border-t border-[var(--border)] px-8 pt-5 pb-2 overflow-hidden transition-all duration-700 delay-400 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <h3 className="text-lg font-medium mb-3">Stack</h3>
          <div className="relative overflow-hidden mask-fade">
            <div className="flex gap-3 animate-marquee w-max">
              {[...skills, ...skills].map((skill, i) => (
                <a
                  key={`${skill.name}-${i}`}
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-sm text-gray-400 border border-gray-800 rounded hover:border-gray-700 hover:text-white transition-colors whitespace-nowrap flex-shrink-0"
                >
                  {skill.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
