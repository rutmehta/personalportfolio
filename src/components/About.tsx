'use client';
import { useEffect, useRef, useState } from 'react';

const skills = [
  'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Rust',
  'React', 'Next.js', 'Node.js', 'Unity',
  'PyTorch', 'TensorFlow', 'LangChain', 'spaCy',
  'AWS', 'Docker', 'Kubernetes',
];

const experience = [
  {
    company: 'Interfere',
    role: 'Co-founder',
    period: 'Jan 2026 – Present',
    description: 'Self-healing software. Automatically detects and fixes issues in production systems.',
    highlight: 'YC S25',
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
    period: 'Jan 2025 – Present',
    description: 'NLP pipeline analyzing 1,200+ syllabi with Sentence-BERT. 89% accuracy in cross-institutional matching.',
  },
  {
    company: 'T-Mobile',
    role: 'AI Hardware/Software Intern',
    period: 'May – Aug 2024',
    description: 'Coordinated 7 cross-functional teams on AI hardware market trial. Evaluated AI/chipset partners for HW/SW stack.',
  },
  {
    company: 'NASA Ames',
    role: 'Service Design Intern',
    period: 'Jan – May 2023',
    description: 'Analyzed 100+ hours of interviews, 26,000+ tags to redesign SBIR/STTR process for NASA Admin.',
  },
  {
    company: 'SageTech',
    role: 'Founder',
    period: 'Oct 2021 – Present',
    description: 'AI/XR experiential learning platform. Text-to-3D tool (MetaWeaver). Backed by NSF I-Corps, Rutgers, NJIT.',
  },
  {
    company: 'Rutgers OIT',
    role: 'Level 2 Consultant',
    period: 'Aug 2021 – Present',
    description: 'Manage 3+ computing labs serving 100,000+ users. Mentor junior consultants.',
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
    <section id="about" ref={sectionRef} className="py-24 md:py-32">
      <div className="container-wide">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-gray-500 text-sm font-mono mb-2">02</p>
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
              Graduating from Rutgers with dual degrees in Computer Science and Business Analytics,
              I&apos;ve built products across AI, XR, quantum computing, and web technologies —
              from AI-powered browsers to experiential learning platforms.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Currently focused on two areas: expanding human intelligence (AI, BCIs, novel computing)
              and enhancing optimization (productivity tools, reducing friction in workflows).
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
              <p className="text-gray-600 text-xs">
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
                    <span className="text-gray-600 text-sm font-mono">{exp.period}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-medium">{exp.company}</span>
                      {exp.highlight && (
                        <span className="text-xs px-2 py-0.5 bg-white/10 text-gray-300 rounded">
                          {exp.highlight}
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
              {awards.slice(0, 6).map((award, i) => (
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

          {/* Skills Card - Full width */}
          <div
            className={`bento-item lg:col-span-3 transition-all duration-700 delay-400 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <h3 className="text-lg font-medium mb-4">Stack</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-sm text-gray-400 border border-gray-800 rounded hover:border-gray-700 hover:text-gray-300 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
