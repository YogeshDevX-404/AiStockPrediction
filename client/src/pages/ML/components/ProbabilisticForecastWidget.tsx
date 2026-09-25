import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { ProbabilisticForecastOutput } from '@/services/api/mlApi';
import { TrendingUp, ShieldCheck } from 'lucide-react';

export interface ProbabilisticForecastWidgetProps {
  forecast: ProbabilisticForecastOutput;
}

export const ProbabilisticForecastWidget: React.FC<ProbabilisticForecastWidgetProps> = ({ forecast }) => {
  return (
    <GlassCard glow className="p-6 space-y-6 border-purple-500/30 bg-gradient-to-br from-purple-950/30 via-card to-emerald-950/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold font-mono">
            ${forecast.symbol}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-black text-foreground font-display">Probabilistic Machine Learning Forecast</h2>
              <Badge variant="purple">{forecast.confidenceScore}% CONVICTION</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Temporal Fusion Transformer 24-Hour Horizon Forecast Band</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-muted-foreground font-mono block">Expected Return</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">+{forecast.expectedReturn}%</div>
        </div>
      </div>

      {/* 95% Confidence Interval Band */}
      <div className="p-4 rounded-2xl bg-foreground/5 border border-border/50 space-y-2 text-xs">
        <div className="flex justify-between items-center font-bold">
          <span className="text-muted-foreground">95% Confidence Interval Band (CI)</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-mono">[{forecast.lowerBound95}% ... +{forecast.expectedReturn}% ... +{forecast.upperBound95}%]</span>
        </div>
        <div className="relative w-full bg-foreground/10 h-3 rounded-full overflow-hidden">
          <div className="absolute left-[15%] right-[30%] bg-gradient-to-r from-emerald-500/40 via-purple-500/60 to-emerald-400/40 h-full rounded-full" />
        </div>
        <p className="text-[10px] text-muted-foreground text-center font-mono">Model output expresses statistical probability distribution without guaranteeing returns.</p>
      </div>
    </GlassCard>
  );
};
