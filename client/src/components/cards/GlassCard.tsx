import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className, glow = false, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'glass-card p-6 relative overflow-hidden transition-all duration-300 hover:border-border',
        glow && 'before:absolute before:-top-24 before:-right-24 before:w-48 before:h-48 before:bg-primary/20 before:blur-3xl before:pointer-events-none',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
