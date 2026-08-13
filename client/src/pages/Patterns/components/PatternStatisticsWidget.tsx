import React, { useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { usePatternStatisticsStore } from '@/store/usePatternStatisticsStore';
import { BarChart3, ShieldCheck } from 'lucide-react';

export const PatternStatisticsWidget: React.FC = () => {
  const { statistics, fetchStatistics } = usePatternStatisticsStore();

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-purple-400" />
          <h2 className="text-base font-bold font-display text-white">Historical Pattern Reliability Statistics</h2>
        </div>
        <Badge variant="purple">BACKTEST BENCHMARK</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {statistics.map((stat) => (
          <div key={stat.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white font-mono truncate">{stat.patternName}</span>
              <Badge variant="emerald" className="text-[9px]">{stat.category}</Badge>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-slate-300">
                <span>Historical Win Rate:</span>
                <span className="font-extrabold text-emerald-400 font-mono">{stat.historicalSuccessRate}%</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${stat.historicalSuccessRate}%` }} />
              </div>
            </div>

            <div className="flex justify-between text-[11px] text-slate-400 border-t border-white/5 pt-2">
              <span>Avg Move: <strong className="text-white">+{stat.avgMovePercent}%</strong></span>
              <span>Sample: <strong className="text-white">{stat.occurrences} trades</strong></span>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
