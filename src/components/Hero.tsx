'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-16">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <h2 className="text-lg md:text-xl font-medium text-purple-400 mb-6">Hi there, I&apos;m</h2>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Rut Mehta
              </span>
            </h1>
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6">
              building for humanity
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mb-6">
              A Rutgers grad pursuing dual degrees in Computer Science and Business Analytics, 
              2x founder, and AI developer with experience at T-Mobile, NASA, and beyond. Built in AI, XR, Quantum Computing and other emerging technologies.
            </p>
            <p className="text-gray-400 text-lg max-w-2xl mb-0">
              Passionate about innovating in two key areas:
            </p>
            <ul className="text-gray-400 text-lg max-w-2xl list-disc list-outside pl-5 space-y-1 mt-4">
              <li>Expanding the boundaries of human intelligence (including but not limited to: AI, BCIs, novel computing, education, etc).</li>
              <li>Enhancing optimization and efficiency (including but not limited to: productivity tools, reducing friction, etc).</li>
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 mb-6">
              <Link 
                href="#projects"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center"
              >
                Explore My Work
              </Link>
              <Link 
                href="#contact"
                className="bg-transparent border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center"
              >
                Get In Touch
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 flex justify-center md:justify-end"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-500/50">
              {/* Replace with your image */}
              <Image
                src="/images/me.png"
                alt="Rut Mehta"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-gray-400 text-sm mb-2">Scroll Down</span>
          <motion.div 
            animate={{ 
              y: [0, 10, 0],
            }} 
            transition={{ 
              repeat: Infinity,
              duration: 1.5
            }}
            className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
