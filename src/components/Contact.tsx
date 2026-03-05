'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

const emails = [
  { label: 'school', href: 'mailto:rut.mehta@rutgers.edu', address: 'rut.mehta@rutgers.edu' },
  { label: 'work', href: 'mailto:rut@endex.ai', address: 'rut@endex.ai' },
];

const links = [
  { name: 'GitHub', href: 'https://github.com/rutmehta', label: 'github.com/rutmehta' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/rutm', label: 'linkedin.com/in/rutm' },
  { name: 'Twitter', href: 'https://twitter.com/mehtarut', label: '@mehtarut' },
];

export default function Contact() {
  const [inView, setInView] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
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
    navigator.clipboard.writeText('rutmehta222@gmail.com');
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
            Always down to talk about AI, startups, or wild ideas.
          </p>
        </div>

        {/* Contact Links */}
        <div
          className={`space-y-4 transition-all duration-700 delay-200 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Email expandable row */}
          <div className="border border-gray-900 hover:border-gray-800 rounded-lg overflow-hidden transition-colors">
            <div className="flex items-center justify-between p-4">
              <span className="text-gray-500 text-sm">Email</span>
              <div className="flex items-center gap-4">
                <a href="mailto:rutmehta222@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  rutmehta222@gmail.com
                </a>
                <button
                  onClick={() => setEmailOpen(!emailOpen)}
                  className={`text-gray-600 hover:text-gray-400 text-xs transition-all duration-300 cursor-pointer ${emailOpen ? 'rotate-45' : ''}`}
                >
                  +
                </button>
              </div>
            </div>
            <div
              className="transition-all duration-300 ease-in-out overflow-hidden"
              style={{ maxHeight: emailOpen ? '200px' : '0', opacity: emailOpen ? 1 : 0 }}
            >
              {emails.map((email) => (
                <a
                  key={email.address}
                  href={email.href}
                  className="group flex items-center justify-between px-4 py-3 border-t border-gray-900 hover:bg-gray-950 transition-colors"
                >
                  <span className="text-gray-600 text-xs">{email.label}</span>
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {email.address}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
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
