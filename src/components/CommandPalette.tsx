'use client';
import { useEffect, useState, useCallback } from 'react';
import { Command } from 'cmdk';

const sections = [
  { name: 'Home', href: '#home', shortcut: 'H' },
  { name: 'Projects', href: '#projects', shortcut: 'P' },
  { name: 'About', href: '#about', shortcut: 'A' },
  { name: 'Research', href: '#research', shortcut: 'R' },
  { name: 'Blog', href: '/blog', shortcut: 'B' },
  { name: 'Contact', href: '#contact', shortcut: 'C' },
];

const links = [
  { name: 'GitHub', href: 'https://github.com/rutmehta', external: true },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/rutm', external: true },
  { name: 'Twitter', href: 'https://twitter.com/rutmehta', external: true },
  { name: 'Email', href: 'mailto:rut.mehta@rutgers.edu', external: true },
];

const actions = [
  { name: 'Download Resume', action: 'resume' },
  { name: 'Copy Email', action: 'email' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSelect = useCallback((value: string) => {
    setOpen(false);

    // Handle section navigation
    const section = sections.find(s => s.name.toLowerCase() === value);
    if (section) {
      if (section.href.startsWith('/')) {
        window.location.href = section.href;
      } else {
        const element = document.querySelector(section.href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Handle external links
    const link = links.find(l => l.name.toLowerCase() === value);
    if (link) {
      window.open(link.href, '_blank');
      return;
    }

    // Handle actions
    if (value === 'download resume') {
      window.open('/resume.pdf', '_blank');
    } else if (value === 'copy email') {
      navigator.clipboard.writeText('rut.mehta@rutgers.edu');
    }
  }, []);

  if (!open) return null;

  return (
    <>
      <div
        cmdk-overlay=""
        onClick={() => setOpen(false)}
      />
      <Command cmdk-dialog="" onKeyDown={(e) => {
        if (e.key === 'Escape') setOpen(false);
      }}>
        <Command.Input
          placeholder="Type a command or search..."
          autoFocus
        />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>

          <Command.Group heading="Navigation">
            {sections.map((section) => (
              <Command.Item
                key={section.name}
                value={section.name.toLowerCase()}
                onSelect={handleSelect}
              >
                <span style={{ opacity: 0.5, marginRight: 8 }}>#</span>
                {section.name}
                <kbd style={{ marginLeft: 'auto' }}>{section.shortcut}</kbd>
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Links">
            {links.map((link) => (
              <Command.Item
                key={link.name}
                value={link.name.toLowerCase()}
                onSelect={handleSelect}
              >
                <span style={{ opacity: 0.5, marginRight: 8 }}>↗</span>
                {link.name}
              </Command.Item>
            ))}
          </Command.Group>

          <Command.Group heading="Actions">
            {actions.map((action) => (
              <Command.Item
                key={action.name}
                value={action.name.toLowerCase()}
                onSelect={handleSelect}
              >
                <span style={{ opacity: 0.5, marginRight: 8 }}>⌘</span>
                {action.name}
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </>
  );
}

// Trigger button component
export function CommandPaletteTrigger() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => {
        const event = new KeyboardEvent('keydown', {
          key: 'k',
          metaKey: true,
        });
        document.dispatchEvent(event);
      }}
      className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-300 border border-gray-800 hover:border-gray-700 rounded-lg transition-colors"
    >
      <span>Search</span>
      <kbd className="hidden sm:inline-flex">⌘K</kbd>
    </button>
  );
}
