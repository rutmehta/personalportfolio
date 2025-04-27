'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiExternalLink, FiGithub, FiGlobe } from 'react-icons/fi';

const projects = [
  {
    title: 'Graphene',
    description: 'Architected browser-based AI agent framework using TypeScript/Python and Browser-Use to build a Large Action Model. Implementing Retrieval Augmented Generation on your browser session through Qdrant and OpenAI.',
    image: '/images/project-ai.jpg',
    placeholder: 'bg-gradient-to-br from-blue-500/70 to-purple-500/70',
    tags: ['TypeScript', 'Python', 'AI', 'Browser-Use', 'RAG', 'Qdrant', 'OpenAI'],
    links: {
      demo: '#',
      github: 'https://www.github.com/rutmehta',
    },
    featured: true
  },
  {
    title: 'SageTech',
    description: 'Architected Unity-based experiential learning platform; leveraged C++ and C# for performance-critical modules. Developed Python-based ML models trained on XR headset and eye-tracking data achieving ≥ 95% accuracy in predicting student engagement and retention. Created text-to-3D generative AI system using Transformer architectures reducing asset creation time by ≥ 70%.',
    image: '/images/project-sagetech.jpg',
    placeholder: 'bg-gradient-to-br from-purple-500/70 to-pink-500/70',
    tags: ['Unity', 'C++', 'C#', 'Python', 'ML', 'XR', 'Generative AI'],
    links: {
      demo: '#',
      website: 'https://www.sagetech.info',
    },
    featured: true
  },
  {
    title: 'AGI House x SCSP AI Defense Hackathon Winner',
    description: 'Winner of the AGI House x SCSP AI Defense Hackathon ($25,000) – built a drone sentry using Computer Vision, LangChain, Llama, and Modal.',
    image: '/images/project-drone.jpg',
    placeholder: 'bg-gradient-to-br from-green-500/70 to-blue-500/70',
    tags: ['Computer Vision', 'LangChain', 'Llama', 'Modal', 'Drone'],
    links: {
      demo: 'https://www.linkedin.com/posts/rutm_%F0%9D%96%AB%F0%9D%97%82%F0%9D%96%BF%F0%9D%96%BE-%F0%9D%97%8E%F0%9D%97%89%F0%9D%96%BD%F0%9D%96%BA%F0%9D%97%8D%F0%9D%96%BE-%F0%9D%96%BA%F0%9D%97%80%F0%9D%96%BA%F0%9D%97%82%F0%9D%97%87-%F0%9D%96%B3%F0%9D%97%81%F0%9D%97%82%F0%9D%97%8C-activity-7313534496790761473-_79e',
      github: 'https://github.com/DivyamJindal/sentry',
    },
    featured: true
  },
  {
    title: 'Job Hunt Game - GenAI',
    description: 'An interactive platformer game for CS students featuring AI-powered interview simulations. Built with Phaser 3, it includes coding challenges, computer science problems, and skill progression systems that unlock abilities as players advance through their career journey.',
    image: '/images/project-jobhunt.jpg',
    placeholder: 'bg-gradient-to-br from-blue-400/70 to-cyan-500/70',
    tags: ['JavaScript', 'Crew.AI', 'Phaser 3', 'GenAI', 'Game Development', 'Educational'],
    links: {
      demo: '#',
      github: 'https://github.com/AdmiralX7/UnemploymentStudios',
    },
    featured: true
  },
  {
    title: 'Mangrove Browser & Extension',
    description: 'Developed a custom browser and extension for enhanced web browsing with privacy-focused features. The browser provides a streamlined interface while the extension adds functionality for improved user experience.',
    image: '/images/project-mangrove.jpg',
    placeholder: 'bg-gradient-to-br from-green-400/70 to-emerald-600/70',
    tags: ['JavaScript', 'Browser Extension', 'Web Development', 'Privacy'],
    links: {
      github: 'https://github.com/rutmehta/MangroveBrowser',
      website: 'https://github.com/rutmehta/MangroveExtension',
    },
    featured: false
  },
  {
    title: 'J&J & AWS Black Tech Health Hackathon',
    description: 'Top 5 Finish in the J&J & AWS Black Tech Health Hackathon. Built AWS SageMaker pipeline achieving ≥93% F1-score.',
    image: '/images/project-health.jpg',
    placeholder: 'bg-gradient-to-br from-yellow-500/70 to-red-500/70',
    tags: ['AWS', 'SageMaker', 'ML Pipeline', 'Healthcare'],
    links: {
      demo: '#',
      github: '#',
    },
    featured: false
  },
  {
    title: 'GMaps × Rutgers',
    description: 'Custom integration of Google Maps API with Rutgers University data to create interactive campus navigation and information system.',
    image: '/images/project-gmaps.jpg',
    placeholder: 'bg-gradient-to-br from-red-500/70 to-amber-500/70',
    tags: ['Google Maps API', 'Jupyter Notebook', 'Data Analysis', 'Geospatial'],
    links: {
      github: 'https://github.com/rutmehta/GMapsxRutgers',
    },
    featured: false
  },
  {
    title: 'Auto Job',
    description: 'Automated job application tool that streamlines the job search process, saving time and increasing efficiency for job seekers.',
    image: '/images/project-autojob.jpg',
    placeholder: 'bg-gradient-to-br from-purple-400/70 to-blue-500/70',
    tags: ['Automation', 'Python', 'Web Scraping', 'Job Search'],
    links: {
      github: 'https://github.com/rutmehta/auto_job',
    },
    featured: false
  },
  {
    title: 'FoodStash App',
    description: 'An application that tracks household food inventory to reduce waste and improve meal planning. Helps users manage their grocery shopping and food consumption more efficiently.',
    image: '/images/project-foodstash.jpg',
    placeholder: 'bg-gradient-to-br from-green-500/70 to-yellow-400/70',
    tags: ['Mobile App', 'Food Tracking', 'Inventory Management'],
    links: {
      github: 'https://github.com/rutmehta/FoodStashApp',
    },
    featured: false
  },
  {
    title: 'EnviroCycle',
    description: 'Environmental sustainability project focused on recycling and waste management through technology innovation.',
    image: '/images/project-envirocycle.jpg',
    placeholder: 'bg-gradient-to-br from-green-600/70 to-blue-400/70',
    tags: ['Environment', 'Sustainability', 'Recycling'],
    links: {
      github: 'https://github.com/rutmehta/EnviroCycle',
    },
    featured: false
  },
  {
    title: 'AI Consulting for Fortune 50 TMT Client',
    description: 'Analyzed AI compute hardware (GPUs, TPUs, ASICs, FPGAs, etc) and memory (HBM3E) for Fortune 50 TMT client. Researched AI tooling layers (foundational data, orchestration frameworks); pitched Coreweave, Sambanova Systems, etc. Advised on build vs. buy decisions or partner strategies for emerging technologies.',
    image: '/images/project-consulting.jpg',
    placeholder: 'bg-gradient-to-br from-red-500/70 to-purple-500/70',
    tags: ['AI Hardware', 'Consulting', 'GPU', 'TPU', 'ASIC', 'FPGA'],
    links: {},
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
                  {project.links.demo && (
                    <a 
                      href={project.links.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <FiExternalLink className="text-lg" /> Demo
                    </a>
                  )}
                  
                  {project.links.github && (
                    <a 
                      href={project.links.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <FiGithub className="text-lg" /> Code
                    </a>
                  )}
                  
                  {project.links.website && (
                    <a 
                      href={project.links.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <FiGlobe className="text-lg" /> Website
                    </a>
                  )}
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
