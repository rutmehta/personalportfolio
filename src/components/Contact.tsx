'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

const links = [
  { name: 'Email', href: 'mailto:rut.mehta@rutgers.edu', label: 'rut.mehta@rutgers.edu' },
  { name: 'GitHub', href: 'https://github.com/rutmehta', label: 'github.com/rutmehta' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/rutm', label: 'linkedin.com/in/rutm' },
  { name: 'Twitter', href: 'https://twitter.com/rutmehta', label: '@rutmehta' },
];

export default function Contact() {
  const [inView, setInView] = useState(false);
  const [copied, setCopied] = useState(false);
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

  const copyEmail = () => {
    navigator.clipboard.writeText('rut.mehta@rutgers.edu');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 border-t border-gray-900">
      <div className="container-narrow">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <p className="text-gray-500 text-sm font-mono mb-2">04</p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">Get in touch</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Currently open to new opportunities. Let&apos;s build something together.
          </p>
        </div>

        {/* Contact Links */}
        <div
          className={`space-y-4 transition-all duration-700 delay-200 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="group flex items-center justify-between p-4 border border-gray-900 hover:border-gray-800 rounded-lg transition-colors"
            >
              <span className="text-gray-500 text-sm">{link.name}</span>
              <span className="text-gray-300 group-hover:text-white transition-colors">
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Copy Email Button */}
        <div
          className={`mt-8 text-center transition-all duration-700 delay-300 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <button
            onClick={copyEmail}
            className="text-sm text-gray-600 hover:text-gray-400 transition-colors"
          >
            {copied ? 'Copied!' : 'Click to copy email'}
          </button>
        </div>
      </div>
    </section>
  );
}
