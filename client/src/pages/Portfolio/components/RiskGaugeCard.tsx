import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { PortfolioRiskMetrics } from '@/services/api/portfolioApi';
import { ShieldCheck, TrendingUp, AlertTriangle, Activity } from 'lucide-react';

export interface RiskGaugeCardProps {
  metrics: PortfolioRiskMetrics;
}

export const RiskGaugeCard: React.FC<RiskGaugeCardProps> = ({ metrics }) => {
  return (
    <GlassCard glow className="p-6 space-y-6 border-purple-500/30 bg-gradient-to-br from-purple-950/30 via-card to-emerald-950/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-foreground font-display">Portfolio Health & Risk Rating</h2>
            <p className="text-xs text-muted-foreground">Quantitative Risk Engine Metric Analysis</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-display">{metrics.healthScore}/100</div>
          <Badge variant="emerald">OPTIMAL BALANCE</Badge>
        </div>
      </div>

      {/* Grid Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
          <span className="text-[10px] text-emerald-300 font-bold uppercase">Sharpe Ratio</span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{metrics.sharpeRatio}</div>
          <p className="text-[10px] text-muted-foreground">Risk-Adjusted Return</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-1">
          <span className="text-[10px] text-purple-300 font-bold uppercase">Portfolio Beta</span>
          <div className="text-xl font-black text-purple-600 dark:text-purple-400 font-mono">{metrics.beta}</div>
          <p className="text-[10px] text-muted-foreground">Market Sensitivity</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 space-y-1">
          <span className="text-[10px] text-red-300 font-bold uppercase">Max Drawdown</span>
          <div className="text-xl font-black text-red-600 dark:text-red-400 font-mono">{metrics.maxDrawdown}%</div>
          <p className="text-[10px] text-muted-foreground">Peak-to-Trough Decline</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
          <span className="text-[10px] text-amber-300 font-bold uppercase">Value at Risk (VaR 95%)</span>
          <div className="text-xl font-black text-amber-500 dark:text-amber-400 font-mono">{metrics.valueAtRisk95}%</div>
          <p className="text-[10px] text-muted-foreground">1-Day Max Loss Risk</p>
        </div>
      </div>
    </GlassCard>
  );
};
