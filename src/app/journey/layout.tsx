import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journey',
  description: 'The milestones, roles, and projects that have shaped my path.',
};

export default function JourneyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
