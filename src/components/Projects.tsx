'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

const projects = [
  {
    title: 'AI-Powered Health Assistant',
    description: 'A machine learning application that uses computer vision and NLP to detect early signs of health conditions from various inputs. Deployed as a web and mobile application with cross-platform functionality.',
    image: '/images/project-health.jpg',
    placeholder: 'bg-gradient-to-br from-blue-500/70 to-purple-500/70',
    tags: ['React Native', 'TensorFlow', 'Python', 'AWS'],
    links: {
      demo: '#',
      github: '#',
    },
    featured: true
  },
  {
    title: 'Blockchain Supply Chain Platform',
    description: 'Developed a transparent supply chain tracking system using blockchain technology. Enables real-time monitoring and verification of product journeys from manufacturer to consumer.',
    image: '/images/project-blockchain.jpg',
    placeholder: 'bg-gradient-to-br from-purple-500/70 to-pink-500/70',
    tags: ['Solidity', 'React', 'Node.js', 'Ethereum'],
    links: {
      demo: '#',
      github: '#',
    },
    featured: true
  },
  {
    title: 'EdTech Learning Platform',
    description: 'A comprehensive online learning platform with interactive courses, real-time collaboration tools, and AI-driven personalized learning paths. Utilized by over 2,000 students.',
    image: '/images/project-edtech.jpg',
    placeholder: 'bg-gradient-to-br from-green-500/70 to-blue-500/70',
    tags: ['Next.js', 'MongoDB', 'Socket.IO', 'Docker'],
    links: {
      demo: '#',
      github: '#',
    },
    featured: true
  },
  {
    title: 'Smart City IoT Dashboard',
    description: 'An IoT analytics dashboard that visualizes and manages data from thousands of connected devices across urban environments. Provides real-time insights for city planning and resource management.',
    image: '/images/project-iot.jpg',
    placeholder: 'bg-gradient-to-br from-yellow-500/70 to-red-500/70',
    tags: ['Vue.js', 'Python', 'InfluxDB', 'MQTT'],
    links: {
      demo: '#',
      github: '#',
    },
    featured: false
  },
  {
    title: 'Augmented Reality Navigation',
    description: 'Mobile AR application that overlays navigation information in real-time for enhanced urban exploration. Features landmark recognition and historical information integration.',
    image: '/images/project-ar.jpg',
    placeholder: 'bg-gradient-to-br from-red-500/70 to-purple-500/70',
    tags: ['Unity', 'ARCore', 'C#', 'Firebase'],
    links: {
      demo: '#',
      github: '#',
    },
    featured: false
  },
  {
    title: 'Financial Analytics Tool',
    description: 'A comprehensive financial analytics platform that uses machine learning to predict market trends and provide investment insights. Features customizable dashboards and alerts.',
    image: '/images/project-finance.jpg',
    placeholder: 'bg-gradient-to-br from-blue-500/70 to-cyan-500/70',
    tags: ['Python', 'React', 'PostgreSQL', 'TensorFlow'],
    links: {
      demo: '#',
      github: '#',
    },
    featured: false
  }
];

export default function Projects() {
  const [filter, setFilter] = useState('all');
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : filter === 'featured' 
      ? projects.filter(p => p.featured) 
      : projects.filter(p => p.tags.includes(filter));
  
  const uniqueTags = Array.from(new Set(projects.flatMap(p => p.tags)));
  
  return (
    <section id="projects" className="py-20 md:py-28 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A showcase of my technical projects spanning multiple domains including AI, blockchain, 
            web development, and more. Each project demonstrates different aspects of my skill set.
          </p>
        </motion.div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              filter === 'all' 
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                : 'border border-gray-700 text-gray-400 hover:text-gray-300'
            }`}
          >
            All Projects
          </button>
          <button 
            onClick={() => setFilter('featured')}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              filter === 'featured' 
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                : 'border border-gray-700 text-gray-400 hover:text-gray-300'
            }`}
          >
            Featured
          </button>
          {uniqueTags.slice(0, 5).map(tag => (
            <button 
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filter === tag 
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                  : 'border border-gray-700 text-gray-400 hover:text-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10 group"
            >
              <div className="h-48 relative overflow-hidden">
                {/* Using placeholder color until actual images are added */}
                <div className={`absolute inset-0 ${project.placeholder}`}>
                  <div className="w-full h-full flex items-center justify-center text-white text-opacity-30 text-7xl font-bold">
                    {project.title.charAt(0)}
                  </div>
                </div>
                {/* Uncomment when you have actual images */}
                {/* <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                /> */}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-full bg-gray-700/50 text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <a 
                    href={project.links.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <FiExternalLink className="text-lg" /> Demo
                  </a>
                  <a 
                    href={project.links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <FiGithub className="text-lg" /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            View All Projects <FiExternalLink />
          </a>
        </div>
      </div>
    </section>
  );
}
