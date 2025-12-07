'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Code2, 
  Database, 
  Cloud, 
  Cpu, 
  GitBranch, 
  Layers,
  TrendingUp,
  Zap
} from 'lucide-react';
import { cn } from '@/libs/utils';

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: Code2,
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'React/Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'React Native', level: 80 },
      { name: 'GraphQL', level: 75 },
    ],
  },
 {
    title: 'Backend Development',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Node.js', level: 92 },
      { name: 'Python/Django', level: 85 },
      { name: 'PostgreSQL', level: 88 },
      { name: 'Redux', level: 80 },
      { name: 'REST APIs', level: 95 },
    ],
  },
 /* {
    title: 'DevOps & Cloud',
    icon: Cloud,
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'AWS', level: 85 },
      { name: 'Docker', level: 82 },
      { name: 'CI/CD', level: 88 },
      { name: 'Kubernetes', level: 75 },
      { name: 'Terraform', level: 70 },
    ],
  },*/
  {
    title: 'Tools & Other',
    icon: GitBranch,
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'Git', level: 95 },
      { name: 'Figma', level: 75 },
      { name: 'Agile/Scrum', level: 90 },
     // { name: '', level: 0 },
     // { name: '', level: 0 },
    ],
  },
];

const techStack = [
  { name: 'React', color: 'bg-blue-500', category: 'Frontend' },
  { name: 'Next.js', color: 'bg-black dark:bg-white', category: 'Frontend' },
  { name: 'TypeScript', color: 'bg-blue-600', category: 'Frontend' },
  { name: 'Tailwind', color: 'bg-cyan-500', category: 'Frontend' },
  { name: 'Node.js', color: 'bg-green-600', category: 'Backend' },
  { name: 'Python', color: 'bg-yellow-500', category: 'Backend' },
  { name: 'PostgreSQL', color: 'bg-blue-700', category: 'Database' },
  { name: 'MongoDB', color: 'bg-green-700', category: 'Database' },
  //{ name: 'AWS', color: 'bg-orange-500', category: 'Cloud' },
  //{ name: 'Docker', color: 'bg-blue-800', category: 'DevOps' },
  { name: 'Redux', color: 'bg-blue-600', category: 'API' },
  { name: 'GraphQL', color: 'bg-pink-600', category: 'API' },
];

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Technical 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Expertise
             </span>
          </h2>
         {/* <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Over 5 years of experience building scalable applications with modern technologies
          </p>*/}
        </motion.div>

        {/* Skills Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-r",
                category.color
              )}>
                <category.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-6">{category.title}</h3>
              
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="font-semibold">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.3 }}
                        className={cn("h-full rounded-full", {
                          'bg-gradient-to-r from-blue-500 to-cyan-500': category.color.includes('blue'),
                          'bg-gradient-to-r from-green-500 to-emerald-500': category.color.includes('green'),
                          'bg-gradient-to-r from-purple-500 to-pink-500': category.color.includes('purple'),
                          'bg-gradient-to-r from-orange-500 to-red-500': category.color.includes('orange'),
                        })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold text-center mb-8">
            Technology <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Stack</span>
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ scale: 0, rotate: -180 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.1,
                }}
                whileHover={{ scale: 1.1, y: -5 }}
                className={cn(
                  "px-4 py-2 rounded-full text-black font-medium flex items-center space-x-2 shadow-lg",
                  tech.color
                )}
              >
                <span>{tech.name}</span>
                <span className="text-xs opacity-80 bg-white/20 px-2 py-1 rounded-full">
                  {tech.category}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Specialized Skills */}
       {/**  <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
                <Zap className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Performance Optimization</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Expertise in reducing load times, optimizing bundle sizes, and improving Core Web Vitals
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl mb-4">
                <Layers className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="text-xl font-semibold mb-3">System Architecture</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Designing scalable, maintainable architectures with microservices and serverless patterns
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="text-xl font-semibold mb-3">Team Leadership</h4>
           <p className="text-gray-600 dark:text-gray-400">
                Mentoring junior developers, conducting code reviews, and driving technical decisions
              </p>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}