import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'glass' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-[16px] cursor-pointer';

    const variants = {
      primary:
        'bg-primary text-primary-foreground hover:bg-emerald-600 shadow-lg shadow-emerald-950/30 focus:ring-emerald-500',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-blue-600 shadow-lg shadow-blue-950/30 focus:ring-blue-500',
      accent:
        'bg-accent text-accent-foreground hover:bg-purple-600 shadow-lg shadow-purple-950/30 focus:ring-purple-500',
      ghost:
        'bg-transparent hover:bg-muted text-foreground focus:ring-muted',
      glass:
        'glass-pill text-foreground hover:bg-white/10 dark:hover:bg-white/15 border border-white/10 shadow-md',
      outline:
        'border border-border bg-transparent hover:bg-muted text-foreground focus:ring-border',
      danger:
        'bg-danger text-white hover:bg-red-600 shadow-lg shadow-red-950/30 focus:ring-red-500',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs space-x-1.5',
      md: 'px-4 py-2 text-sm space-x-2',
      lg: 'px-6 py-3 text-base space-x-2.5',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
