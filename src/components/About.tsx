'use client';
import { motion } from 'framer-motion';
import { BsCodeSlash, BsLightbulb, BsPeople } from 'react-icons/bs';
import { FaGraduationCap } from 'react-icons/fa';

const skills = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 
  'Node.js', 'Python', 'Machine Learning', 'Data Science',
  'AWS', 'Docker', 'Kubernetes', 'GraphQL',
  'MongoDB', 'PostgreSQL', 'Firebase', 'TensorFlow'
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300">
              I'm a tech enthusiast and recent graduate from Rutgers University with a passion for building 
              innovative solutions that make a difference. As a 2x founder, I thrive in environments where 
              creativity meets technical challenge.
            </p>
            <p className="text-lg text-gray-300">
              With experience from internships at T-Mobile, NASA, and other leading organizations, I've developed 
              a diverse skill set across software development, data science, and product management. My research 
              work has been published in peer-reviewed journals, focusing on the intersection of technology and real-world applications.
            </p>
            <p className="text-lg text-gray-300">
              I'm constantly exploring new technologies and methodologies to push the boundaries of what's possible. 
              When I'm not coding or brainstorming new startup ideas, you can find me mentoring aspiring developers 
              or contributing to open-source projects.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              {[
                { icon: BsCodeSlash, title: 'Software Development', description: 'Building robust applications' },
                { icon: BsLightbulb, title: 'Innovation', description: 'Creating novel solutions' },
                { icon: FaGraduationCap, title: 'Academic Research', description: 'Published scholar' },
                { icon: BsPeople, title: 'Leadership', description: '2x Tech Founder' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex flex-col items-center p-4 rounded-lg bg-gray-800/50 border border-gray-700"
                >
                  <item.icon className="text-2xl text-purple-400 mb-2" />
                  <h3 className="font-medium text-white">{item.title}</h3>
                  <p className="text-sm text-gray-400 text-center">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-100">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 text-gray-100">Education</h3>
              <div className="p-4 rounded-lg border border-gray-700 bg-gray-800/30">
                <h4 className="font-medium text-white">Rutgers University</h4>
                <p className="text-purple-400">Bachelor of Science in Computer Science</p>
                <p className="text-sm text-gray-400">2019 - 2023</p>
                <p className="text-sm text-gray-300 mt-2">
                  Graduated with honors. Specialized in Artificial Intelligence and Data Science.
                </p>
              </div>
              
              <div className="p-4 rounded-lg border border-gray-700 bg-gray-800/30">
                <h4 className="font-medium text-white">Additional Certifications</h4>
                <ul className="text-sm text-gray-300 list-disc pl-5 mt-2 space-y-1">
                  <li>AWS Certified Solutions Architect</li>
                  <li>Google Cloud Professional Data Engineer</li>
                  <li>TensorFlow Developer Certificate</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
