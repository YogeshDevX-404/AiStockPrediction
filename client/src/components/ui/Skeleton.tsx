import React from 'react';
import { cn } from '@/utils/cn';

export interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-2xl bg-muted/60 dark:bg-foreground/5 border border-border/40',
        className
      )}
    />
  );
};
