'use client';
import { FiLinkedin, FiGithub, FiTwitter, FiMail } from 'react-icons/fi';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="#home" className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-4 inline-block">
              Rut Mehta
            </Link>
            <p className="text-gray-400 mt-2 mb-4 max-w-md">
              A tech innovator, entrepreneur, and researcher building solutions that make a difference.
              Constantly exploring the intersection of technology and real-world applications.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors text-xl"
              >
                <FiLinkedin />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors text-xl"
              >
                <FiGithub />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400 transition-colors text-xl"
              >
                <FiTwitter />
              </a>
              <a 
                href="mailto:rut.mehta@example.com" 
                className="text-gray-400 hover:text-purple-400 transition-colors text-xl"
              >
                <FiMail />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'About', 'Experience', 'Projects', 'Research', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="mailto:rut.mehta@example.com" className="hover:text-purple-400 transition-colors">
                  rut.mehta@example.com
                </a>
              </li>
              <li>Rutgers University</li>
              <li>New Brunswick, NJ</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Rut Mehta. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-4 md:mt-0">
            Designed and built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
