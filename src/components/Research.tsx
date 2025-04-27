'use client';
import { motion } from 'framer-motion';
import { FiExternalLink } from 'react-icons/fi';

const researchPapers = [
  {
    title: 'SDIM: A Qudit Stabilizer Simulator',
    journal: 'PLanQC 2025 & ASPLOS 2026',
    date: '2025',
    description: 'Presented SDIM, a stabilizer circuit simulator for qudits, at PLanQC 2025 and submitted to ASPLOS 2026. Explore the simulator and code.',
    link: 'https://popl25.sigplan.org/details/planqc-2025-papers/17/Sdim-A-Qudit-Stabilizer-Simulator',
    tags: ['Quantum Computing', 'Qudits', 'Simulator']
  },
  {
    title: 'Literature Review: XR, Experiential & Multimedia Learning',
    journal: 'Aresty Rutgers Undergraduate Research Journal',
    date: '2024',
    description: 'Comprehensive literature review on the intersection of Extended Reality, Experiential Learning, and Multimedia Learning.',
    link: 'https://arestyrurj.libraries.rutgers.edu/index.php/arestyrurj/article/view/239',
    tags: ['XR', 'Experiential Learning', 'Multimedia']
  }
];

export default function Research() {
  return (
    <section id="research" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Research Publications</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My published research explores cutting-edge technologies and their real-world applications. 
            Each publication represents a significant contribution to its respective field.
          </p>
        </motion.div>
        
        <div className="space-y-10">
          {researchPapers.map((paper, index) => (
            <motion.div
              key={paper.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-blue-500/30 transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-4/5">
                  <h3 className="text-xl font-semibold text-white mb-2">{paper.title}</h3>
                  <div className="mb-3">
                    <span className="text-blue-400">{paper.journal}</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-gray-400">{paper.date}</span>
                  </div>
                  <p className="text-gray-300 mb-4">{paper.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {paper.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 text-xs rounded-full bg-blue-900/30 text-blue-300 border border-blue-800/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:w-1/5 flex md:justify-end items-start">
                  <a 
                    href={paper.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-colors border border-blue-600/30"
                  >
                    Read Paper <FiExternalLink />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 p-6 rounded-xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/30"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Interested in Research Collaboration?</h3>
              <p className="text-gray-300">
                I&apos;m always open to collaborating on innovative research projects at the intersection 
                of technology and real-world applications.
              </p>
            </div>
            <a 
              href="#contact" 
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors whitespace-nowrap"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
