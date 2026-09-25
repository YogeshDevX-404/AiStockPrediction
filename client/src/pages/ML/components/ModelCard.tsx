import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { RegisteredModelItem } from '@/services/api/mlApi';
import { Cpu } from 'lucide-react';

export interface ModelCardProps {
  model: RegisteredModelItem;
}

export const ModelCard: React.FC<ModelCardProps> = ({ model }) => {
  return (
    <GlassCard className="p-5 space-y-4 hover:border-border transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground font-display">{model.name}</h2>
            <span className="text-[11px] text-muted-foreground font-mono">v{model.version} • {model.modelType}</span>
          </div>
        </div>

        <Badge variant={model.status === 'CHAMPION' ? 'purple' : 'emerald'}>{model.status}</Badge>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
        <div className="p-2 rounded-xl bg-foreground/5 space-y-0.5">
          <span className="text-[9px] text-muted-foreground block font-sans">Accuracy</span>
          <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{model.accuracy}%</span>
        </div>
        <div className="p-2 rounded-xl bg-foreground/5 space-y-0.5">
          <span className="text-[9px] text-muted-foreground block font-sans">RMSE</span>
          <span className="font-extrabold text-purple-600 dark:text-purple-400">{model.rmse}</span>
        </div>
        <div className="p-2 rounded-xl bg-foreground/5 space-y-0.5">
          <span className="text-[9px] text-muted-foreground block font-sans">MAE</span>
          <span className="font-extrabold text-blue-400">{model.mae}</span>
        </div>
        <div className="p-2 rounded-xl bg-foreground/5 space-y-0.5">
          <span className="text-[9px] text-muted-foreground block font-sans">F1 Score</span>
          <span className="font-extrabold text-amber-500 dark:text-amber-400">{model.f1Score}</span>
        </div>
      </div>
    </GlassCard>
  );
};
