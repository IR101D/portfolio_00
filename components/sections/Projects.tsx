'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ExternalLink, 
  Github, 
  ArrowRight,
  X,
  Filter,
  Globe,
  Smartphone,
  Server
} from 'lucide-react';
import Card from '@/components/ui/Card';
import { cn } from '@/libs/utils';


const projects = [
{
  "id": 1,
  "title": "Furniture E-Commerce Store",
  "description": "Modern e-commerce platform for furniture shopping with advanced filtering, real-time cart management, and seamless checkout experience.",
  "longDescription": "A comprehensive furniture e-commerce application built with Next.js 14 featuring product catalog with smart search, dual-view pagination/infinite scroll, Redux-powered cart management, complete checkout flow, order tracking, and user authentication. Implements industry best practices in UI/UX, performance optimization, and accessibility.",
  "image": "/assets/project-furniture-store.png",
  "tags": ["Next.js 14", "TypeScript", "Tailwind CSS", "Redux Toolkit", "React", "REST API", "Responsive Design"],
  "category": "fullstack",
  "github": "https://github.com/IR101D/alx-project-nexus",
  "liveUrl": "https://alx-project-nexus-deployed.vercel.app/",
  "features": [
    "Advanced product search with initials matching",
    "Dual pagination/infinite scroll views",
    "Real-time shopping cart with Redux",
    "Complete checkout & order tracking system",
    "Responsive design with mobile-first approach",
    "User authentication & profile management",
    "Product reviews & rating system",
    "Multi-filter product discovery"
  ],
  "metrics": {
    "performance": 95,
    "accessibility": 98,
    "seo": 97,
    "bestPractices": 96
  }
},
  {
  "id": 2,
  "title": "CineSeek - Movie Discovery Platform",
  "description": "A modern movie discovery platform with AI-powered features, comprehensive movie database, and personalized recommendations.",
  "longDescription": "CineSeek is a full-featured movie discovery application that helps users explore, organize, and find their next favorite films. Built with Next.js and TypeScript, the platform integrates TMDB API for extensive movie data and Hugging Face AI for creative title generation. Features include advanced filtering, user authentication, interactive movie details with trailers, AI-powered title generation, and responsive design with smooth animations.",
  "image": "/assets/project-cineseek.png",
  "tags": ["Next.js 15", "TypeScript", "Tailwind CSS", "TMDB API", "Hugging Face AI", "React Hooks", "Responsive Design"],
  "category": "fullstack",
  "github": "https://github.com/IR101D/movies_app",
  "liveUrl": "https://moviesappdeployed.vercel.app/",
  "features": [
    "AI Movie Title Generator",
    "Advanced movie filtering & search",
    "Comprehensive movie details with trailers",
    "User authentication & profiles",
    "Watchlist management",
    "Responsive dark theme design",
    "Real-time form validation",
    "Social media integration"
  ],
  "metrics": {
    "performance": 94,
    "accessibility": 96,
    "seo": 93
  }

  },
{
  id: 3,
  title: 'Airbnb Clone',
  description: 'Full-featured vacation rental platform with property listings, bookings, and user management.',
  longDescription: 'A complete Airbnb-inspired application featuring property search with filters, booking system, user authentication, and interactive maps. Includes host dashboard for property management and guest review system.',
  image: '/assets/project-airbnb-clone.png',
  tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Mapbox', 'Stripe'],
  category: 'fullstack',
    github: 'https://github.com/IR101D/alx-listing-app-deployed',
    liveUrl: 'https://alx-airbnb-app.vercel.app/',
  features: [
    'Property search with filters',
    'Interactive map integration',
    'Secure booking system',
    'User authentication',
    'Host dashboard',
    'Review and rating system',
    'Responsive design'
  ],
  metrics: {
    performance: 94,
    accessibility: 96,
    seo: 92
  }
},
];

const categories = [
  { id: 'all', label: 'All Projects', icon: Filter },
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A selection of my recent work.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "px-4 py-2 rounded-full flex items-center gap-2 transition-all",
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layoutId={`project-${project.id}`}
                onClick={() => setSelectedProject(project)}
              >
                <Card
                  hoverEffect
                  delay={index * 0.1}
                  className="h-full cursor-pointer group"
                >
                  {/* Project Image */}
                  <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
  {/* Show the actual image if it exists */}
  {project.image ? (
    <img 
      src={`${project.image}`} 
      alt={project.title}
      className="w-full h-full object-cover"
    />
  ) : (
    // Fallback to gradient background if no image
    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-5xl font-bold text-blue-500/30 dark:text-blue-400/30">
          {project.title.charAt(0)}
        </div>
      </div>
    </div>
  )}
</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
  

                  {/* Project Info */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {project.metrics.performance}%
                        </div>
                        <div className="text-xs text-gray-500">Performance</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {project.metrics.accessibility}%
                        </div>
                        <div className="text-xs text-gray-500">Accessibility</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {project.metrics.seo}%
                        </div>
                        <div className="text-xs text-gray-500">SEO</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  {/* Modal Header */}
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-3xl font-bold mb-2">{selectedProject.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Project Image */}
                  <div className="relative h-64 mb-8 rounded-xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-8xl font-bold text-blue-500/30 dark:text-blue-400/30">
  {/* Show the actual image if it exists */}
  {selectedProject.image ? (
    <img 
      src={`${selectedProject.image}`} 
      alt={selectedProject.title}
      className="w-full h-full object-cover"
    />
  ) : (
    // Fallback to gradient background if no image
    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-5xl font-bold text-blue-500/30 dark:text-blue-400/30">
          {selectedProject.title.charAt(0)}
        </div>
      </div>
    </div>
  )}
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <h4 className="text-xl font-semibold mb-4">Project Overview</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {selectedProject.longDescription}
                      </p>

                      <h4 className="text-xl font-semibold mb-4">Key Features</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-6">
                        <h4 className="text-lg font-semibold mb-4">Metrics</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Performance</span>
                              <span>{selectedProject.metrics.performance}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                              <div 
                                className="h-full bg-green-500 rounded-full"
                                style={{ width: `${selectedProject.metrics.performance}%` }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>Accessibility</span>
                              <span>{selectedProject.metrics.accessibility}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                              <div 
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${selectedProject.metrics.accessibility}%` }}
                              />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span>SEO</span>
                              <span>{selectedProject.metrics.seo}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                              <div 
                                className="h-full bg-purple-500 rounded-full"
                                style={{ width: `${selectedProject.metrics.seo}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Links */}
                      <div className="flex gap-4">
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                          View Code
                        </a>
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <ExternalLink className="w-5 h-5" />
                          Live Demo
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}