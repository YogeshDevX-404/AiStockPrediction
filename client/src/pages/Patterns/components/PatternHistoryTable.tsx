import React, { useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { usePatternHistoryStore } from '@/store/usePatternHistoryStore';
import { History, CheckCircle2 } from 'lucide-react';

export const PatternHistoryTable: React.FC = () => {
  const { history, fetchHistory } = usePatternHistoryStore();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <History className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold font-display text-white">Pattern Recognition Audit History</h2>
        </div>
        <Badge variant="emerald">AUDIT LOG</Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="border-b border-white/10 text-slate-400 uppercase font-sans">
            <tr>
              <th className="pb-3 font-semibold">Symbol</th>
              <th className="pb-3 font-semibold">Detected Pattern</th>
              <th className="pb-3 font-semibold">Confidence</th>
              <th className="pb-3 font-semibold">Actual Outcome</th>
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
  );
};
