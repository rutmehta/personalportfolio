'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { RiArrowLeftLine } from 'react-icons/ri';

// Define the course data structure
type CourseType = 'Undergraduate' | 'Graduate';
type MajorType = 'Computer Science' | 'Business Analytics and Information Technology';

interface Course {
  name: string;
  major: MajorType;
  type: CourseType;
  technologies: string[];
  description?: string;
}

// Course data
const courses: Course[] = [
  {
    name: 'Machine Learning I',
    major: 'Computer Science',
    type: 'Graduate',
    technologies: ['Python', 'Scikit-learn', 'TensorFlow', 'Pandas', 'NumPy', 'Statistical Learning'],
    description: 'Covered fundamental ML algorithms, model evaluation, and practical implementation of machine learning systems.'
  },
  {
    name: 'Introduction to Computational Robotics',
    major: 'Computer Science',
    type: 'Graduate',
    technologies: ['ROS', 'Python', 'C++', 'Motion Planning', 'Perception', 'Control Systems'],
    description: 'Explored robotic systems design, motion planning, sensor integration, and autonomous robot programming.'
  },
  {
    name: 'Introduction to Artificial Intelligence',
    major: 'Computer Science',
    type: 'Undergraduate',
    technologies: ['Python', 'Search Algorithms', 'Knowledge Representation', 'Machine Learning', 'Neural Networks'],
    description: 'Explored core AI concepts including search algorithms, knowledge representation, and intelligent agents.'
  },
  {
    name: 'Data Structures',
    major: 'Computer Science',
    type: 'Undergraduate',
    technologies: ['Java', 'Linked Lists', 'Trees', 'Graphs', 'Hashing', 'Algorithm Analysis'],
    description: 'Comprehensive study of fundamental data structures, their implementations, and algorithmic analysis.'
  },
  {
    name: 'Computer Architecture',
    major: 'Computer Science',
    type: 'Undergraduate',
    technologies: ['Assembly', 'Processor Design', 'Memory Systems', 'Pipelining', 'Cache', 'I/O Systems'],
    description: 'Study of computer organization, processor architecture, memory hierarchy, and performance optimization.'
  },
  {
    name: 'Design Analysis and Algorithms',
    major: 'Computer Science',
    type: 'Undergraduate',
    technologies: ['Algorithm Design', 'Complexity Analysis', 'Dynamic Programming', 'Graph Algorithms', 'NP-Completeness'],
    description: 'Advanced study of algorithm design strategies, complexity analysis, and optimization techniques.'
  },
  {
    name: 'Discrete Structures I',
    major: 'Computer Science',
    type: 'Undergraduate',
    technologies: ['Logic', 'Set Theory', 'Combinatorics', 'Graph Theory', 'Proof Techniques'],
    description: 'Foundation in discrete mathematics concepts essential for computer science theory.'
  },
  {
    name: 'Discrete Structures II',
    major: 'Computer Science',
    type: 'Undergraduate',
    technologies: ['Advanced Logic', 'Automata Theory', 'Recursive Functions', 'Number Theory', 'Cryptography Basics'],
    description: 'Advanced discrete mathematics with applications to computability, cryptography, and formal languages.'
  },
  {
    name: 'Honors Calculus III',
    major: 'Computer Science',
    type: 'Undergraduate',
    technologies: ['Multivariable Calculus', 'Vector Analysis', 'Partial Derivatives', 'Multiple Integrals'],
    description: 'Advanced calculus concepts with applications to three-dimensional space and mathematical modeling.'
  },
  {
    name: 'Honors Calculus IV',
    major: 'Computer Science',
    type: 'Undergraduate',
    technologies: ['Differential Equations', 'Vector Calculus', 'Complex Analysis', 'Fourier Series'],
    description: 'Further study of advanced calculus with applications to differential equations and vector fields.'
  },
  {
    name: 'Time Series Modeling For Business',
    major: 'Business Analytics and Information Technology',
    type: 'Undergraduate',
    technologies: ['R', 'ARIMA', 'Forecasting', 'Statistical Analysis', 'Data Visualization'],
    description: 'Applied time series analysis for business forecasting and trend identification.'
  },
  {
    name: 'Management Information Systems',
    major: 'Business Analytics and Information Technology',
    type: 'Undergraduate',
    technologies: ['Database Design', 'Systems Analysis', 'IT Management', 'Business Process Modeling', 'ERP Systems'],
    description: 'Study of information systems for business operations, decision making, and strategic advantage.'
  },
  {
    name: 'Introduction to Deep Learning',
    major: 'Computer Science',
    type: 'Undergraduate',
    technologies: ['PyTorch', 'TensorFlow', 'Neural Networks', 'Computer Vision', 'NLP', 'Convolutional Networks'],
    description: 'Hands-on implementation of deep learning architectures for various AI applications.'
  },
  {
    name: 'Quantum Computing: Programs and Systems',
    major: 'Computer Science',
    type: 'Graduate',
    technologies: ['Qiskit', 'Quantum Algorithms', 'Quantum Gates', 'Quantum Circuits', 'Quantum Cryptography'],
    description: 'Exploration of quantum computing principles, programming models, and potential applications.'
  },
  {
    name: 'Information System Security',
    major: 'Business Analytics and Information Technology',
    type: 'Undergraduate',
    technologies: ['Network Security', 'Cryptography', 'Threat Modeling', 'Security Policies', 'Penetration Testing'],
    description: 'Comprehensive study of information security principles, practices, and implementation.'
  },
  {
    name: 'Business Data Management',
    major: 'Business Analytics and Information Technology',
    type: 'Undergraduate',
    technologies: ['SQL', 'Database Design', 'Data Warehousing', 'ETL Processes', 'Data Governance'],
    description: 'Applied database management concepts with focus on business data organization and retrieval.'
  },
  {
    name: 'Statistics for Business',
    major: 'Business Analytics and Information Technology',
    type: 'Undergraduate',
    technologies: ['R', 'Hypothesis Testing', 'Regression Analysis', 'Probability', 'Statistical Inference'],
    description: 'Application of statistical methods for business decision making and data-driven insights.'
  },
  {
    name: 'Socially Cognizant Robotics',
    major: 'Computer Science',
    type: 'Graduate',
    technologies: ['Human-Robot Interaction', 'Computer Vision', 'NLP', 'Ethics in AI', 'Sensing Technologies'],
    description: 'Advanced study of robots that can interact naturally with humans in social environments.'
  },
  {
    name: 'Generative AI for Visual Computing',
    major: 'Computer Science',
    type: 'Graduate',
    technologies: ['GANs', 'Diffusion Models', 'Stable Diffusion', 'CLIP', 'Computer Vision', 'PyTorch'],
    description: 'Cutting-edge techniques for generating and manipulating visual content using generative AI models.'
  }
];

export default function Courses() {
  const [filter, setFilter] = useState({
    major: 'all',
    type: 'all'
  });

  // Filter courses based on selection
  const filteredCourses = courses.filter(course => {
    return (
      (filter.major === 'all' || course.major === filter.major) &&
      (filter.type === 'all' || course.type === filter.type)
    );
  });

  // Count courses by category for displaying in filter buttons
  const countByMajor = {
    'Computer Science': courses.filter(c => c.major === 'Computer Science').length,
    'Business Analytics and Information Technology': courses.filter(c => c.major === 'Business Analytics and Information Technology').length
  };

  const countByType = {
    'Undergraduate': courses.filter(c => c.type === 'Undergraduate').length,
    'Graduate': courses.filter(c => c.type === 'Graduate').length
  };

  return (
    <section className="min-h-screen py-20 md:py-28 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <RiArrowLeftLine className="mr-2" /> Back to Home
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Academic Courses</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive list of courses I&apos;ve completed during my academic journey at Rutgers University.
            Filter by major or course level to explore the different areas of my education.
          </p>
        </motion.div>
        
        {/* Filters */}
        <div className="mb-12 space-y-6">
          <div>
            <h3 className="text-white font-medium mb-3">Filter by Major</h3>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => setFilter(prev => ({ ...prev, major: 'all' }))}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  filter.major === 'all' 
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                    : 'border border-gray-700 text-gray-400 hover:text-gray-300'
                }`}
              >
                All Majors ({courses.length})
              </button>
              <button 
                onClick={() => setFilter(prev => ({ ...prev, major: 'Computer Science' }))}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  filter.major === 'Computer Science' 
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                    : 'border border-gray-700 text-gray-400 hover:text-gray-300'
                }`}
              >
                Computer Science ({countByMajor['Computer Science']})
              </button>
              <button 
                onClick={() => setFilter(prev => ({ ...prev, major: 'Business Analytics and Information Technology' }))}
                className={`px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap ${
                  filter.major === 'Business Analytics and Information Technology' 
                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                    : 'border border-gray-700 text-gray-400 hover:text-gray-300'
                }`}
              >
                Business Analytics & IT ({countByMajor['Business Analytics and Information Technology']})
              </button>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-3">Filter by Level</h3>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => setFilter(prev => ({ ...prev, type: 'all' }))}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  filter.type === 'all' 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                    : 'border border-gray-700 text-gray-400 hover:text-gray-300'
                }`}
              >
                All Levels ({courses.length})
              </button>
              <button 
                onClick={() => setFilter(prev => ({ ...prev, type: 'Undergraduate' }))}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  filter.type === 'Undergraduate' 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                    : 'border border-gray-700 text-gray-400 hover:text-gray-300'
                }`}
              >
                Undergraduate ({countByType['Undergraduate']})
              </button>
              <button 
                onClick={() => setFilter(prev => ({ ...prev, type: 'Graduate' }))}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  filter.type === 'Graduate' 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                    : 'border border-gray-700 text-gray-400 hover:text-gray-300'
                }`}
              >
                Graduate ({countByType['Graduate']})
              </button>
            </div>
          </div>
        </div>
        
        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-white">{course.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    course.type === 'Graduate' 
                      ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50' 
                      : 'bg-purple-900/30 text-purple-400 border border-purple-800/50'
                  }`}>
                    {course.type}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-4 text-sm">{course.description}</p>
                
                <div className="mb-4">
                  <span className="text-sm text-gray-400">Major: </span>
                  <span className="text-sm text-gray-300">{course.major}</span>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Technologies & Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {course.technologies.map(tech => (
                      <span
                        key={`${course.name}-${tech}`}
                        className="inline-block px-2 py-1 text-xs bg-gray-700/50 text-gray-300 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Empty state when no courses match filter */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No courses match your current filters.</p>
            <button 
              onClick={() => setFilter({ major: 'all', type: 'all' })}
              className="mt-4 px-4 py-2 bg-purple-600/20 text-purple-400 border border-purple-600/30 rounded-md hover:bg-purple-600/30 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
