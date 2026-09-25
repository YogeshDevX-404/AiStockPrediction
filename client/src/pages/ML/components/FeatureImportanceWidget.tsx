import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { SHAPFeatureImportance } from '@/services/api/mlApi';
import { BarChart2 } from 'lucide-react';

export interface FeatureImportanceWidgetProps {
  shap: SHAPFeatureImportance[];
}

export const FeatureImportanceWidget: React.FC<FeatureImportanceWidgetProps> = ({ shap }) => {
  return (
    <GlassCard className="p-5 space-y-4">
      <div className="flex items-center space-x-2 border-b border-border/50 pb-3">
        <BarChart2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <h2 className="text-base font-bold text-foreground font-display">SHAP Feature Importance & Attribution</h2>
      </div>

      <div className="space-y-3">
        {shap.map((s) => (
          <div key={s.feature} className="space-y-1 text-xs">
            <div className="flex justify-between items-center font-bold">
              <span className="text-foreground">{s.feature}</span>
              <span className="font-mono text-purple-300">{(s.importanceScore * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-foreground/10 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${s.impactDirection === 'POSITIVE' ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-red-500 dark:bg-red-400'}`}
                style={{ width: `${s.importanceScore * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
