'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Github,
  Linkedin,
  Twitter,
  ExternalLink
} from 'lucide-react';
import Card from '@/components/ui/Card';
import { cn } from '@/libs/utils';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/IR101D',
    color: 'hover:bg-gray-900 hover:text-white',
    iconColor: 'text-gray-700 dark:text-gray-300'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/in/ikramromane',
    color: 'hover:bg-blue-700 hover:text-white',
    iconColor: 'text-blue-600 dark:text-blue-400'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com',
    color: 'hover:bg-sky-500 hover:text-white',
    iconColor: 'text-sky-500'
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:ikramromane@gmail.com',
    color: 'hover:bg-red-600 hover:text-white',
    iconColor: 'text-red-600 dark:text-red-400'
  },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would use:
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      
      setSubmitStatus('success');
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get In <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Have a project in mind or want to discuss opportunities? Feel free to reach out!
          </p>
        </motion.div>

        {/* Center the entire content */}
        <div className="flex flex-col items-center">
          {/* Social Links Card - Centered */}
          <motion.div 
            variants={itemVariants}
            className="w-full max-w-2xl" // Limit width and center
          >
            <Card className="text-center"> {/* Added text-center to Card */}
              <h3 className="text-lg font-semibold mb-6">Connect With Me</h3>
              <div className="flex flex-wrap justify-center gap-4"> {/* Changed to justify-center and adjusted gap */}
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300",
                      "bg-gray-100 dark:bg-gray-800",
                      social.color,
                      "min-w-[140px] justify-center" // Added min-width and justify-center
                    )}
                  >
                    <social.icon className={cn("w-5 h-5", social.iconColor)} />
                    <span className="font-medium">{social.name}</span>
                  </a>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Additional Info - Also centered */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-center max-w-2xl"
          >
            <p className="text-gray-600 dark:text-gray-400">
              I typically respond within 24 hours.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Also available on Upwork and other freelance platforms
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}