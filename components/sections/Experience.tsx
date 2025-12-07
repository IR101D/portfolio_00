'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Calendar, 
  MapPin, 
  Building, 
  Award,
  ChevronDown,
  ChevronUp,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import Card from '@/components/ui/Card';
import { formatDate } from '@/libs/utils';
import { cn } from '@/libs/utils';

const experiences = [
  {
    id: 1,
    title: 'Full-Stack Developer',
    company: 'TechCorp Solutions',
    location: 'San Francisco, CA',
    type: 'work',
    startDate: '2022-01',
    endDate: 'Present',
    description: 'Leading development of enterprise-scale web applications.',
    details: [
      'Architected and implemented a microservices-based platform serving 1M+ users',
      'Led a team of 5 developers in building React/Node.js applications',
      'Improved application performance by 40% through code optimization and caching strategies',
      'Implemented CI/CD pipelines reducing deployment time by 70%',
      'Mentored junior developers and conducted technical interviews'
    ],
    technologies: ['React', 'Node.js', 'AWS', 'Kubernetes', 'TypeScript', 'GraphQL'],
    achievements: [
      'Reduced page load time by 60%',
      'Achieved 99.9% uptime for critical services',
      'Successfully migrated legacy system to microservices'
    ]
  },
  {
    id: 2,
    title: 'Full-Stack Developer',
    company: 'Startup Innovators',
    location: 'Remote',
    type: 'work',
    startDate: '2020-03',
    endDate: '2021-12',
    description: 'Built and scaled multiple web applications from scratch.',
    details: [
      'Developed 3 major products from concept to production',
      'Implemented real-time features using WebSockets and Socket.io',
      'Built RESTful APIs serving mobile and web clients',
      'Set up monitoring and alerting systems using Prometheus and Grafana',
      'Collaborated with product and design teams in agile environment'
    ],
    technologies: ['Vue.js', 'Express', 'MongoDB', 'Docker', 'Redis', 'Socket.io'],
    achievements: [
      'Product featured in TechCrunch',
      'Scaled to handle 100K concurrent users',
      'Reduced server costs by 30% through optimization'
    ]
  },
  {
    id: 3,
    title: 'Frontend Developer',
    company: 'Digital Agency XYZ',
    location: 'New York, NY',
    type: 'work',
    startDate: '2018-06',
    endDate: '2020-02',
    description: 'Created responsive web applications for various clients.',
    details: [
      'Built 20+ client websites using modern frontend technologies',
      'Implemented pixel-perfect designs with CSS animations',
      'Optimized websites for Core Web Vitals and SEO',
      'Collaborated with UX/UI designers to improve user experience',
      'Maintained and updated legacy codebases'
    ],
    technologies: ['React', 'JavaScript', 'SCSS', 'Webpack', 'Jest', 'Git'],
    achievements: [
      'Achieved 95+ scores on Lighthouse audits',
      'Improved client website conversion rates by 25%',
      'Received 100% positive client feedback'
    ]
  },
  {
    id: 4,
    title: 'M.S. Computer Science',
    company: 'Stanford University',
    location: 'Stanford, CA',
    type: 'education',
    startDate: '2016-09',
    endDate: '2018-05',
    description: 'Specialized in Software Engineering and Machine Learning.',
    details: [
      'GPA: 3.9/4.0',
      'Thesis: "Optimizing Frontend Performance in Large-Scale Applications"',
      'Graduate Teaching Assistant for Web Development course',
      'Published research paper on React performance optimization',
      'Participated in multiple hackathons winning 3 awards'
    ],
    technologies: ['Python', 'Java', 'TensorFlow', 'React', 'Django'],
    achievements: [
      'Graduated with Honors',
      'Best Thesis Award 2018',
      'Hackathon Winner - Stanford Tech Challenge'
    ]
  },
  {
    id: 5,
    title: 'B.S. Software Engineering',
    company: 'MIT',
    location: 'Cambridge, MA',
    type: 'education',
    startDate: '2012-09',
    endDate: '2016-05',
    description: 'Focus on Web Technologies and Software Architecture.',
    details: [
      'GPA: 3.8/4.0',
      'President of Web Development Club',
      'Built campus event management system used by 5K+ students',
      'Internship at Google as Software Engineering Intern',
      'Capstone project: Real-time collaborative code editor'
    ],
    technologies: ['JavaScript', 'Python', 'C++', 'SQL', 'React'],
    achievements: [
      'Summa Cum Laude',
      'Dean\'s List all semesters',
      'Google Internship 2015'
    ]
  },
];

export default function Experience() {
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Career <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            My professional experience and education in software development
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative max-w-4xl mx-auto"
        >
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              className={cn(
                "relative mb-8",
                index % 2 === 0 ? "md:pr-1/2 md:pl-8" : "md:pl-1/2 md:pr-8",
                "md:mt-8 first:mt-0"
              )}
            >
              {/* Timeline dot */}
              <div className={cn(
                "absolute top-6 w-4 h-4 rounded-full border-4 border-white dark:border-gray-900 z-10",
                index % 2 === 0 
                  ? "left-[-6px] md:left-1/2 md:-translate-x-1/2" 
                  : "left-[-6px] md:right-1/2 md:translate-x-1/2"
              )}>
                <div className={cn(
                  "w-full h-full rounded-full",
                  exp.type === 'work' 
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                    : "bg-gradient-to-r from-purple-500 to-pink-500"
                )} />
              </div>

              {/* Content */}
              <Card
                hoverEffect={false}
                delay={index * 0.1}
                className={cn(
                  "ml-8 md:ml-0 cursor-pointer transition-all duration-300",
                  expandedId === exp.id && "ring-2 ring-blue-500 dark:ring-blue-400"
                )}
               // onClick={() => toggleExpand(exp.id)}
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={cn(
                        "p-2 rounded-lg",
                        exp.type === 'work'
                          ? "bg-blue-100 dark:bg-blue-900/30"
                          : "bg-purple-100 dark:bg-purple-900/30"
                      )}>
                        {exp.type === 'work' ? (
                          <Briefcase className={cn(
                            "w-5 h-5",
                            exp.type === 'work'
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-purple-600 dark:text-purple-400"
                          )} />
                        ) : (
                          <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{exp.title}</h3>
                        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mt-1">
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            <span>{exp.company}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(exp.startDate)} - {exp.endDate === 'Present' ? 'Present' : formatDate(exp.endDate)}</span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {exp.description}
                    </p>
                  </div>

                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    {expandedId === exp.id ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Expanded Content */}
                {expandedId === exp.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                  >
                    {/* Responsibilities/Details */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        {exp.type === 'work' ? 'Responsibilities' : 'Course Highlights'}
                      </h4>
                      <ul className="space-y-2">
                        {exp.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                            <span className="text-gray-600 dark:text-gray-400">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        Key Achievements
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {exp.achievements.map((achievement, idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg"
                          >
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {achievement}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}