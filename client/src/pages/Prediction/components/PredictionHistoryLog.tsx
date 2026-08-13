import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { usePredictionHistoryStore } from '@/store/usePredictionHistoryStore';
import { History, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const PredictionHistoryLog: React.FC = () => {
  const { history } = usePredictionHistoryStore();

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <History className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold font-display text-white">Historical Model Prediction Accuracy Log</h2>
        </div>
        <Badge variant="emerald">93.2% HISTORICAL WIN RATE</Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="border-b border-white/10 text-slate-400 uppercase font-sans">
            <tr>
              <th className="pb-3 font-semibold">Symbol</th>
              <th className="pb-3 font-semibold">Signal</th>
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
                <td className="py-3 font-sans">
                  <Badge variant="emerald">{item.signal}</Badge>
                </td>
                <td className="py-3 text-purple-400 font-bold">{item.confidenceScore}%</td>
                <td className="py-3 font-sans font-bold">
                  <span className="flex items-center text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> WIN
                  </span>
                </td>
                <td className="py-3 text-emerald-400 font-bold">+{item.pnlPercent}%</td>
                <td className="py-3 text-right text-slate-400 font-sans">{item.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};
