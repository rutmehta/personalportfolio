'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Blog posts - add your Craft doc URLs here
// To get a Craft URL: Open doc → Share → Copy link
const posts = [
  {
    title: 'Building AI Agents That Actually Work',
    description: 'Lessons learned from building Interfere and Graphene — practical insights on browser automation, RAG systems, and production AI.',
    date: '2025-02-01',
    url: '', // Add your Craft doc share link here
    tags: ['AI', 'Engineering'],
  },
  {
    title: 'From Hackathon to YC: The Interfere Story',
    description: 'How a weekend project became a Y Combinator company. The decisions, pivots, and lessons along the way.',
    date: '2025-01-15',
    url: '', // Add your Craft doc share link here
    tags: ['Startup', 'YC'],
  },
  {
    title: 'XR Learning: What the Research Actually Says',
    description: 'A synthesis of my published research on experiential learning, VR, and cognitive science.',
    date: '2024-04-20',
    url: 'https://arestyrurj.libraries.rutgers.edu/index.php/arestyrurj/article/view/239',
    tags: ['Research', 'XR'],
  },
];

export default function BlogPage() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    setInView(true);
  }, []);

  return (
    <main className="min-h-screen pt-24">
      <div className="container-narrow py-16">
        {/* Header */}
        <div className="mb-16">
          <Link
            href="/"
            className="text-gray-500 text-sm hover:text-white transition-colors mb-8 inline-block"
          >
            ← Back
          </Link>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Blog</h1>
          <p className="text-gray-500 max-w-lg">
            Thoughts on building, research, and the intersection of AI and human potential.
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-px bg-gray-900">
          {posts.map((post, index) => (
            <div
              key={post.title}
              className={`group bg-black p-6 md:p-8 transition-all duration-500 ${
                post.url ? 'hover:bg-gray-950 cursor-pointer' : 'opacity-50'
              } ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {post.url ? (
                <Link
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <PostContent post={post} />
                </Link>
              ) : (
                <div className="relative">
                  <PostContent post={post} />
                  <span className="absolute top-0 right-0 text-xs text-gray-600 font-mono">
                    Coming soon
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Simple instruction */}
        <p className="mt-8 text-gray-600 text-sm text-center">
          To add a post: Share your Craft doc and paste the URL in the code.
        </p>
      </div>
    </main>
  );
}

function PostContent({ post }: { post: typeof posts[0] }) {
  return (
    <>
      <div className="flex items-center gap-4 mb-3">
        <span className="text-gray-600 text-sm font-mono">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </span>
        <div className="flex gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs text-gray-600 font-mono">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <h2 className="text-lg md:text-xl font-medium text-white group-hover:text-gray-300 transition-colors mb-2">
        {post.title}
      </h2>
      <p className="text-gray-500 text-sm">
        {post.description}
      </p>
    </>
  );
}
