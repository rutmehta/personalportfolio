'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const posts = [
  {
    title: 'Building AI Agents That Actually Work',
    description: 'Practical insights on browser automation, RAG systems, and shipping production AI.',
    date: '2025-02-01',
    url: '',
    tags: ['AI', 'Engineering'],
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
    <main className="min-h-screen pt-24 pb-20">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-gray-500 text-sm hover:text-white transition-colors mb-8 inline-block"
          >
            ← Back
          </Link>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Blog</h1>
          <p className="text-gray-500 max-w-2xl">
            Thoughts on building, research, and the frontier of intelligence.
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

        {/* Spacer */}
        <div className="mt-8" />
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
