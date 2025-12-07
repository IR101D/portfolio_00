import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/libs/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delay?: number;
}

export default function Card({ 
  children, 
  className, 
  hoverEffect = true,
  delay = 0 
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={hoverEffect ? { y: -8 } : {}}
      className={cn(
        "bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg",
        hoverEffect && "hover:shadow-2xl transition-all duration-300",
        className
      )}
    >
      {children}
    </motion.div>
  );
}