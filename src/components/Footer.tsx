'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-900">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-600 font-mono">
              &copy; {new Date().getFullYear()}
            </span>
            <span className="text-sm text-gray-600">Rut Mehta</span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/rutmehta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-white transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/rutm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-white transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href="https://twitter.com/rutmehta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-white transition-colors"
            >
              Twitter
            </Link>
            <button
              onClick={() => {
                const event = new KeyboardEvent('keydown', {
                  key: 'k',
                  metaKey: true,
                  bubbles: true,
                });
                document.dispatchEvent(event);
              }}
              className="text-sm text-gray-600 hover:text-white transition-colors flex items-center gap-1"
            >
              <kbd className="text-xs">⌘K</kbd>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
