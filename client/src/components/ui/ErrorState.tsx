import React from 'react';
import { GlassCard } from '../cards/GlassCard';
import { Button } from '../buttons/Button';
import { AlertCircle, RefreshCw } from 'lucide-react';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'Failed to load component data. Please check your connection and try again.',
  onRetry,
}) => {
  return (
    <GlassCard className="flex flex-col items-center justify-center text-center p-10 space-y-4 border-red-500/20 bg-red-500/5">
      <div className="p-3 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20">
        <AlertCircle className="w-8 h-8" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-foreground font-display">{title}</h3>
        <p className="text-xs text-muted-foreground max-w-sm">{message}</p>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" leftIcon={<RefreshCw className="w-3.5 h-3.5" />} onClick={onRetry}>
          Try Again
        </Button>
      )}
    </GlassCard>
  );
};
