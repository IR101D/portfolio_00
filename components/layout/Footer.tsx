"use client";
import { 
  Heart, 
  Code2, 
  Coffee,
  ArrowUp,
  ExternalLink,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/libs/utils';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/IR101D', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/ikramromane', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Mail, href: 'mailto:ikramromane@gmail.com', label: 'Email' },
];

const technologies = [
  'Next.js 14',
  'React 18',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'Vercel',
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand & Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DevPortfolio
              </span>
            </div>
            <p className="mb-6 text-gray-400">
              A showcase of modern web development skills, projects, and expertise.
              Built with cutting-edge technologies and passion for code.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                  >
                    <ArrowUp className="w-4 h-4 rotate-90 group-hover:text-blue-400" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Used */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Built With</h3>
            <div className="flex flex-wrap gap-3">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm hover:bg-gray-700 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          {/*   <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
               <Calendar className="w-4 h-4 text-blue-400" />
                <span>Last updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>*/}
          </div>
        </div>
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-gray-400">
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span>
              Made with passion by ikram romane • © {currentYear} All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm">

            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              Back to Top
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}