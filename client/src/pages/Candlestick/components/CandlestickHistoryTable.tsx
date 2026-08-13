import React, { useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { useCandlestickHistoryStore } from '@/store/useCandlestickHistoryStore';
import { History, CheckCircle2 } from 'lucide-react';

export const CandlestickHistoryTable: React.FC = () => {
  const { history, statistics, fetchHistoryAndStats } = useCandlestickHistoryStore();

  useEffect(() => {
    fetchHistoryAndStats();
  }, [fetchHistoryAndStats]);

  return (
    <div className="space-y-6">
      {/* Historical Statistics Benchmarks Grid */}
      <GlassCard className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h2 className="text-base font-bold font-display text-white">Historical Reliability Benchmarks</h2>
          <Badge variant="emerald">84.8% AVG ACCURACY</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {statistics.map((stat) => (
            <div key={stat.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white font-mono">{stat.patternName}</span>
                <span className="text-emerald-400 font-extrabold font-mono">{stat.historicalSuccessRate}%</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${stat.historicalSuccessRate}%` }} />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 border-t border-white/5 pt-1.5">
                <span>Avg Move: <strong className="text-white">+{stat.avgMovePercent}%</strong></span>
                <span>Sample: <strong className="text-white">{stat.occurrences}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Audit Log Table */}
      <GlassCard className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <History className="w-5 h-5 text-purple-400" />
            <h2 className="text-base font-bold font-display text-white">Candlestick Detection Audit Log</h2>
          </div>
          <Badge variant="purple">AUDIT HISTORY</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-white/10 text-slate-400 uppercase font-sans">
              <tr>
                <th className="pb-3 font-semibold">Symbol</th>
                <th className="pb-3 font-semibold">Pattern</th>
                <th className="pb-3 font-semibold">Confidence</th>
                <th className="pb-3 font-semibold">Outcome</th>
                <th className="pb-3 font-semibold">Realized PnL (%)</th>
                <th className="pb-3 font-semibold text-right font-sans">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-white/5">
                  <td className="py-3 font-bold text-white">{item.symbol}</td>
                  <td className="py-3 font-sans text-purple-300 font-bold">{item.patternName}</td>
                  <td className="py-3 text-purple-400 font-bold">{item.confidenceScore}%</td>
                  <td className="py-3 font-sans font-bold">
                    <span className="flex items-center text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> SUCCESS
                    </span>
                  </td>
                  <td className="py-3 text-emerald-400 font-bold">+{item.realizedPnlPercent}%</td>
                  <td className="py-3 text-right text-slate-400 font-sans">{item.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
