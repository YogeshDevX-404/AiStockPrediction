import React from 'react';
import { GlassCard } from '../cards/GlassCard';
import { Button } from '../buttons/Button';
import { FolderOpen } from 'lucide-react';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Data Available',
  description = 'There are currently no items to display in this view.',
  actionText,
  onAction,
  icon,
}) => {
  return (
    <GlassCard className="flex flex-col items-center justify-center text-center p-12 space-y-4">
      <div className="p-4 rounded-2xl bg-muted/40 text-muted-foreground border border-border/50">
        {icon || <FolderOpen className="w-8 h-8 stroke-[1.5]" />}
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-bold text-foreground font-display">{title}</h3>
        <p className="text-xs text-muted-foreground max-w-sm">{description}</p>
      </div>
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </GlassCard>
  );
};
