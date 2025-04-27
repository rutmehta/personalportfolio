'use client';
import { motion } from 'framer-motion';
import { FaUsers, FaFlask, FaLightbulb, FaShieldAlt, FaProjectDiagram } from 'react-icons/fa';

const activities = [
  {
    title: 'MARK Conference Intern',
    role: 'Conference Lead',
    icon: FaProjectDiagram,
    description: 'Led a team of 50+ students and managed an $80,000 budget to organize North America&apos;s largest student-run leadership conference.',
    tags: ['Leadership', 'Event Management', 'Budgeting', 'Team Management']
  },
  {
    title: 'Design For America @ Rutgers',
    role: 'Founder & Studio Lead',
    icon: FaUsers,
    description: 'Founded the Rutgers University chapter. Taught human-centered design and led 50+ students in cohorts tackling challenges like food insecurity and mental health in college communities.',
    tags: ['Founding Member', 'Social Impact', 'Human-Centered Design', 'Leadership', 'Community Engagement']
  },
  {
    title: 'Steelcase Social Innovation Fellowship',
    role: 'Fellow',
    icon: FaLightbulb,
    description: 'Developed \'ColLab\' using social innovation and design thinking principles to improve the transition process for students entering higher education.',
    tags: ['Social Innovation', 'Design Thinking', 'Fellowship', 'Higher Education']
  },
  {
    title: 'NSF I-Corps Fellowship',
    role: 'Entrepreneurial Lead',
    icon: FaFlask,
    description: 'Conducted customer discovery for SageTech, interviewing 100+ potential users and stakeholders to validate the VR learning platform concept.',
    tags: ['Customer Discovery', 'Entrepreneurship', 'Lean Startup', 'NSF', 'SageTech']
  },
  {
    title: 'Innovation, Design, & Entrepreneurship Academy (I.D.E.A.)',
    role: 'Scholar',
    icon: FaLightbulb, // Reusing icon
    description: 'Selected for a competitive 4-year program (10% acceptance rate) focused on human and community-centered design thinking principles.',
    tags: ['Design Thinking', 'Innovation', 'Selective Program', 'Community-Centered Design']
  },
  {
    title: 'Deloitte Cyber Threat Competition',
    role: 'Second Round Finalist',
    icon: FaShieldAlt,
    description: 'Placed among the top 40 finalists out of 5000+ applicants. Competed in a high-stakes, live cyber threat response simulation, applying cybersecurity principles dynamically.',
    tags: ['Cybersecurity', 'Competition', 'Finalist', 'Threat Response', 'Simulation']
  },
];

export default function Activities() {
  return (
    <section id="activities" className="py-20 md:py-28 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Activities & Leadership</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Beyond academics and professional work, I&apos;ve actively engaged in leadership roles, competitions, and programs focused on innovation, design, and community impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900/50 rounded-lg p-6 shadow-lg border border-gray-800/50 hover:border-purple-500/50 transition-colors duration-300 flex flex-col"
            >
              <div className="flex items-center mb-4">
                <activity.icon className="w-8 h-8 text-purple-400 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold">{activity.title}</h3>
                  {activity.role && <p className="text-purple-400 text-sm font-medium">{activity.role}</p>}
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4 flex-grow">{activity.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-800/50">
                {activity.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="bg-gray-800 text-gray-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
