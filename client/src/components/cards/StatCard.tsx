import React from 'react';
import { GlassCard } from './GlassCard';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changePeriod?: string;
  icon?: React.ReactNode;
  badgeText?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changePeriod = 'vs last period',
  icon,
  badgeText,
  className,
}) => {
  const isPositive = change !== undefined && change >= 0;

  return (
    <GlassCard glow className={cn('flex flex-col justify-between space-y-4', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </span>
        {icon && (
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
            {icon}
          </div>
        )}
      </div>

      <div>
        <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground font-display">
          {value}
        </div>

        {change !== undefined && (
          <div className="flex items-center space-x-2 mt-2 text-xs">
            <span
              className={cn(
                'inline-flex items-center font-bold px-2 py-0.5 rounded-full',
                isPositive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              )}
            >
              {isPositive ? (
                <TrendingUp className="w-3 h-3 mr-1 inline" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1 inline" />
              )}
              {isPositive ? '+' : ''}
              {change.toFixed(2)}%
            </span>
            <span className="text-muted-foreground">{changePeriod}</span>
          </div>
        )}
      </div>

      {badgeText && (
        <div className="mt-2 text-xs font-medium text-accent inline-flex items-center">
          ✨ {badgeText}
        </div>
      )}
    </GlassCard>
  );
};
