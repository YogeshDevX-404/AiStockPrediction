import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const AIPortfolioHealth: React.FC = () => {
  const data = {
    healthScore: 88,
    topPerformer: { symbol: 'NVDA', profitPercent: 25.85 },
    rebalancingRecommendations: [
      { type: 'BUY', symbol: 'TSM', reason: 'High foundry capacity utilization; increases chip sector moat.' },
      { type: 'SELL', symbol: 'INTC', reason: 'Declining margin trends vs GPU competitors.' },
    ],
  };

  return (
    <GlassCard glow className="p-6 border-purple-500/40 bg-gradient-to-br from-purple-950/40 via-[#0a1128] to-[#060914] space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-black text-white font-display">AI Portfolio Health & Co-Pilot</h2>
              <Badge variant="purple">SCORE 88/100</Badge>
            </div>
            <p className="text-xs text-slate-400">Automated diversification & risk rebalancing radar</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Health Score</span>
          <div className="text-3xl font-black text-emerald-400 font-display">{data.healthScore} / 100</div>
          <p className="text-[10px] text-emerald-400">Strong Risk-Adjusted Return</p>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Top Performer</span>
          <div className="text-xl font-black text-emerald-400 font-mono">{data.topPerformer.symbol} (+{data.topPerformer.profitPercent}%)</div>
          <p className="text-[10px] text-slate-400">Highest Alpha Generator</p>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Suggested Action</span>
          <div className="text-xl font-black text-purple-400 font-display">REBALANCE</div>
          <p className="text-[10px] text-slate-400">Trim overweights</p>
        </div>
      </div>

      {/* Suggested Rebalancing Recommendations */}
      <div className="space-y-2 text-xs border-t border-white/10 pt-4">
        <span className="font-bold text-white uppercase tracking-wider text-[11px]">AI Rebalancing Suggestions:</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.rebalancingRecommendations.map((rec: any) => (
            <div key={rec.symbol} className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{rec.type} ${rec.symbol}</span>
                </span>
                <Badge variant={rec.type === 'BUY' ? 'emerald' : 'red'} className="text-[9px]">{rec.type}</Badge>
              </div>
              <p className="text-[11px] text-slate-400 pl-5.5">{rec.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};
