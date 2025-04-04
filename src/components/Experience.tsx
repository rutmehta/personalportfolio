'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const experiences = [
  {
    company: 'NASA',
    position: 'Software Engineering Intern',
    period: 'Summer 2022',
    description: 'Developed machine learning algorithms for satellite image processing, improving data analysis efficiency by 30%. Collaborated with a cross-functional team of engineers and scientists on mission-critical projects.',
    technologies: ['Python', 'TensorFlow', 'Computer Vision', 'AWS'],
    logo: '🚀'
  },
  {
    company: 'T-Mobile',
    position: 'Technology Innovation Intern',
    period: 'Summer 2021',
    description: 'Designed and implemented a customer insight dashboard using React and Node.js, providing real-time analytics to business stakeholders. Optimized backend services, reducing API response times by 40%.',
    technologies: ['React', 'Node.js', 'GraphQL', 'Docker'],
    logo: '📱'
  },
  {
    company: 'Tech Startup (Founder)',
    position: 'Co-founder & CTO',
    period: '2020 - Present',
    description: 'Founded and led development of a SaaS platform serving over 5,000 users. Built and managed a team of 5 engineers, implementing agile methodologies. Secured $500K in seed funding through competitive pitch competitions.',
    technologies: ['Full-Stack Development', 'AWS', 'Product Management', 'UI/UX'],
    logo: '💡'
  },
  {
    company: 'Research Lab',
    position: 'Undergraduate Researcher',
    period: '2019 - 2023',
    description: 'Conducted research in applied machine learning, resulting in 2 published papers. Developed novel algorithms for natural language processing tasks, achieving state-of-the-art results on benchmark datasets.',
    technologies: ['NLP', 'Machine Learning', 'PyTorch', 'Data Analysis'],
    logo: '🔬'
  }
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tab buttons for larger screens */}
          <div className="hidden lg:flex flex-col min-w-[200px] border-l border-gray-700">
            {experiences.map((exp, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-4 text-left transition-all relative ${
                  activeTab === index 
                    ? 'text-white font-medium' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {activeTab === index && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute left-0 top-0 h-full w-0.5 bg-purple-500"
                  />
                )}
                {exp.company}
              </button>
            ))}
          </div>
          
          {/* Mobile tabs */}
          <div className="flex overflow-x-auto lg:hidden mb-6 pb-2 space-x-4">
            {experiences.map((exp, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 whitespace-nowrap rounded-full ${
                  activeTab === index 
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                    : 'text-gray-400 hover:text-gray-300 border border-gray-700'
                }`}
              >
                {exp.company}
              </button>
            ))}
          </div>
          
          {/* Content */}
          <div className="flex-1">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: activeTab === index ? 1 : 0,
                  y: activeTab === index ? 0 : 20,
                  display: activeTab === index ? 'block' : 'none'
                }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800/30 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600/30 to-purple-600/30 text-3xl">
                    {exp.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{exp.position}</h3>
                    <h4 className="text-purple-400 mb-1">{exp.company}</h4>
                    <p className="text-gray-400 text-sm mb-4">{exp.period}</p>
                    <p className="text-gray-300 mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 text-xs rounded-full bg-gray-800 border border-gray-700 text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
