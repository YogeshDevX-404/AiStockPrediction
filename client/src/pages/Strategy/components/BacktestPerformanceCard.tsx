import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { BacktestRunOutput } from '@/services/api/strategyApi';

export interface BacktestPerformanceCardProps {
  run: BacktestRunOutput;
}

export const BacktestPerformanceCard: React.FC<BacktestPerformanceCardProps> = ({ run }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
      <GlassCard className="p-4 space-y-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase">Net Profit</span>
        <div className="text-xl font-black text-emerald-400 font-mono">+{run.netProfitPercent}%</div>
      </GlassCard>

      <GlassCard className="p-4 space-y-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase">Profit Factor</span>
        <div className="text-xl font-black text-purple-400 font-mono">{run.profitFactor}</div>
      </GlassCard>

      <GlassCard className="p-4 space-y-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase">Sharpe Ratio</span>
        <div className="text-xl font-black text-blue-400 font-mono">{run.sharpeRatio}</div>
      </GlassCard>

      <GlassCard className="p-4 space-y-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase">Max Drawdown</span>
        <div className="text-xl font-black text-red-400 font-mono">{run.maxDrawdown}%</div>
      </GlassCard>
    </div>
  );
};
