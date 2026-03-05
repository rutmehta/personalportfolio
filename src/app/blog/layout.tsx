import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on building, research, and the frontier of intelligence.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
