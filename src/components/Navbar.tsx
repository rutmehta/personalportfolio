'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CommandPaletteTrigger } from './CommandPalette';

const navItems = [
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Journey', href: '/journey' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isNotHomePage = pathname !== '/';

  const getHref = (href: string) => {
    if (href.startsWith('#') && isNotHomePage) {
      return '/' + href;
    }
    return href;
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-gray-900' : ''
      }`}
    >
      <nav className="container-wide">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-sm font-mono text-gray-400 hover:text-white transition-colors"
          >
            rm.
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={getHref(item.href)}
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <CommandPaletteTrigger />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-gray-400 hover:text-white transition-colors p-2"
            aria-label="Toggle menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {mobileOpen ? (
                <path d="M5 5l10 10M5 15L15 5" />
              ) : (
                <>
                  <path d="M3 6h14" />
                  <path d="M3 10h14" />
                  <path d="M3 14h14" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-900 py-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={getHref(item.href)}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2">
                <CommandPaletteTrigger />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
