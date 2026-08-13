import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { mockTradingStats } from '@/services/mock/mockAnalyticsService';
import { formatCurrency } from '@/utils/cn';
import { BarChart3, TrendingUp } from 'lucide-react';

export const TradingPerformanceWidget: React.FC = () => {
  const { winRate, totalTrades, profitFactor, averageWin, averageLoss, monthlyProfitLossHistory } = mockTradingStats;

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold font-display text-white">Trading Statistics & Win Rate</h2>
        </div>
        <Badge variant="emerald">{winRate}% WIN RATE</Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-3 rounded-2xl bg-white/5 space-y-1">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Total Trades</div>
          <div className="text-lg font-black text-white font-display">{totalTrades}</div>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 space-y-1">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Profit Factor</div>
          <div className="text-lg font-black text-emerald-400 font-display">{profitFactor}</div>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 space-y-1">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Avg Win</div>
          <div className="text-lg font-black text-emerald-400 font-display">{formatCurrency(averageWin)}</div>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 space-y-1">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Avg Loss</div>
          <div className="text-lg font-black text-red-400 font-display">{formatCurrency(averageLoss)}</div>
        </div>
      </div>

      {/* Monthly Bar Chart SVG */}
      <div className="space-y-2 pt-2">
        <span className="text-xs font-bold text-slate-300 uppercase">Monthly Net Profit vs Loss ($)</span>
        <div className="h-28 w-full flex items-end justify-between px-2 pt-4 border-b border-white/10">
          {monthlyProfitLossHistory.map((m) => {
            const heightProf = Math.min(80, (m.profit / 10000) * 80);
            return (
              <div key={m.month} className="flex flex-col items-center space-y-1">
                <div
                  className="w-8 rounded-t-lg bg-emerald-500/80 hover:bg-emerald-400 transition-all"
                  style={{ height: `${heightProf}px` }}
                />
                <span className="text-[10px] font-bold text-slate-400">{m.month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
};
