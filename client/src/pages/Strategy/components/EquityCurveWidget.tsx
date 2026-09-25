import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { EquityCurvePoint } from '@/services/api/strategyApi';
import { formatCurrency } from '@/utils/cn';
import { TrendingUp } from 'lucide-react';

export interface EquityCurveWidgetProps {
  curve: EquityCurvePoint[];
}

export const EquityCurveWidget: React.FC<EquityCurveWidgetProps> = ({ curve }) => {
  return (
    <GlassCard glow className="p-6 space-y-4 border-purple-500/30 bg-gradient-to-br from-purple-950/30 via-card to-emerald-950/20">
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-base font-bold text-foreground font-display">Backtest Portfolio Equity Curve</h2>
        </div>
        <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">Initial: $10,000 -&gt; Final: $13,850</span>
      </div>

      <div className="space-y-3">
        {curve.map((pt) => (
          <div key={pt.timestamp} className="space-y-1 text-xs font-mono">
            <div className="flex justify-between items-center font-bold">
              <span className="text-muted-foreground font-sans">{pt.timestamp}</span>
              <span className="text-foreground">{formatCurrency(pt.equity)} ({pt.drawdownPercent}%)</span>
            </div>
            <div className="w-full bg-foreground/10 h-2 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-purple-500"
                style={{ width: `${(pt.equity / 15000) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
