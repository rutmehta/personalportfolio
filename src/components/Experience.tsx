'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const experiences = [
  {
    company: 'New Jersey Big Data Alliance (NJBDA)',
    position: 'Software Engineering Intern',
    period: 'Jan 2025 – Present',
    description: 'Developed automated pipeline analyzing NJ transfer course equivalency matrices, identifying 23% more non-transferable data science courses through pattern recognition algorithms. Engineered document processing system using NLP to parse 1,200+ syllabi, generating vector embeddings with Sentence-BERT for cross-institutional comparison. Implemented cosine similarity metrics (scipy.spatial) achieving 89% accuracy in matching syllabi content between 2-year and 4-year programs. Designed novel curriculum merge protocol using mergekit SLERP interpolation, combining top-matched syllabi into unified course structures.',
    technologies: ['Python', 'NLP', 'Sentence-BERT', 'Pattern Recognition', 'Vector Embeddings', 'SLERP Interpolation'],
    logo: '📊'
  },
  {
    company: 'T-Mobile',
    position: 'AI Hardware/Software Intern',
    period: 'May 2024 – Aug 2024',
    description: 'Coordinate 7 cross-functional teams across T-Mobile to design and execute a large-scale market trial. Evaluate the selection of AI, Software, Hardware, and chipset partners to integrate on the HW/SW stack. Inform senior leadership of new advancements in AI hardware and consumer AI products weekly.',
    technologies: ['AI', 'Hardware/Software Integration', 'Market Trial Design', 'Cross-functional Leadership'],
    logo: '📱'
  },
  {
    company: 'Rutgers Learning Centers',
    position: 'Head Learning Assistant for MIS',
    period: 'Sep 2023 – Sept 2024',
    description: 'Assisting classes of 40 in learning the fundamentals and advanced concepts of Excel, Tableau, and SQL.',
    technologies: ['Excel', 'Tableau', 'SQL', 'Teaching', 'Management Information Systems'],
    logo: '👨‍🏫'
  },
  {
    company: 'NASA',
    position: 'Service Design Intern',
    period: 'Jan 2023 – May 2023',
    description: 'Analyzed, coded, and synthesized 100+ hours of interviews, 26000+ tags across the customer experience. Identified customer needs, pain points, themes, patterns, personas, etc to motivate applicant behavior. Created and presented large-scale recommendations for NASA Admin to redesign the SBIR/STTR process.',
    technologies: ['Data Analysis', 'User Research', 'Service Design', 'Customer Experience'],
    logo: '🚀'
  },
  {
    company: 'Rutgers University OIT',
    position: 'Level 2 Consultant',
    period: 'Aug 2021 – Present',
    description: 'Manage 3+ computing labs and libraries across campuses, providing customer service to 100,000+ students, staff, faculty, alumni. Working with IdM tools, ticketing tools, and large-scale troubleshooting tools to maintain the technology infrastructure of Rutgers. Mentor and guide Level 1 Consultants and Consultants in Training, creating training manuals and how-to articles.',
    technologies: ['IdM Tools', 'Technical Support', 'Customer Service', 'Mentoring', 'Documentation'],
    logo: '💻'
  },
  {
    company: 'SageTech',
    position: 'Founder/Developer',
    period: 'Oct 2021 - Present',
    description: 'Building an experiential learning platform powered by AI and Extended Reality (XR) technology. Tackling lower student engagement and knowledge retention in high school students. Creating an intuitive text-to-3D prototyping tool – MetaWeaver – to lower the barrier of entry to VR and AR creation. Providing real-time student performance and learning insights powered by AI trained on headset and eye-tracking data. Backed by the National Science Foundation I-Corps, Rutgers, NJIT, Baylor New Venture, Propelify/TechUnited, etc.',
    technologies: ['AI', 'XR Technology', 'MetaWeaver', 'Text-to-3D', 'Performance Analytics'],
    logo: '💡'
  },
  {
    company: 'Rutgers University CS Department',
    position: 'Learning Assistant - Data Structures',
    period: 'Feb 2025 – Present',
    description: 'Assisting CS students with data structures concepts, algorithm design, and Java programming assignments.',
    technologies: ['Java', 'Data Structures', 'Teaching'],
    logo: '📚'
  },
  {
    company: 'The MARK Conference',
    position: 'Conference Intern',
    period: 'Mar 2024',
    description: 'Supported event planning and execution for the annual Rutgers leadership conference, coordinating speaker logistics and attendee engagement.',
    technologies: ['Event Planning', 'Coordination', 'Leadership'],
    logo: '📣'
  },
  {
    company: 'Steelcase',
    position: 'Social Innovation Fellow',
    period: 'Sep 2024 – Present',
    description: 'Selected as a Steelcase Social Innovation Fellow, collaborating on design projects to foster social impact.',
    technologies: ['Design Thinking', 'Social Innovation', 'Collaboration'],
    logo: '🤝'
  },
  {
    company: 'Design For America',
    position: 'Chapter Lead - Rutgers',
    period: 'Jan 2022 – Dec 2023',
    description: 'Led the Rutgers chapter of Design For America, mentoring student teams to develop solutions addressing community challenges.',
    technologies: ['Leadership', 'Design Thinking', 'Strategy'],
    logo: '💡'
  },
  {
    company: 'NSF I-Corps',
    position: 'I-Corps Fellow',
    period: 'Oct 2021 – Present',
    description: 'Participated as a National Science Foundation I-Corps Fellow, validating the market potential of technology solutions through customer discovery.',
    technologies: ['Research', 'Customer Discovery', 'Entrepreneurship'],
    logo: '🧪'
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
