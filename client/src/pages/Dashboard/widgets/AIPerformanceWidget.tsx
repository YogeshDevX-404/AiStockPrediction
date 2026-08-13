import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { mockAIPerformance } from '@/services/mock/mockAnalyticsService';
import { Cpu, CheckCircle, Target } from 'lucide-react';

export const AIPerformanceWidget: React.FC = () => {
  const { dailyAccuracy, weeklyAccuracy, monthlyAccuracy, totalSignalsGenerated, winningSignals, losingSignals } = mockAIPerformance;

  return (
    <GlassCard glow className="p-6 border-purple-500/30 bg-gradient-to-br from-purple-950/30 via-card to-[#060914] space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Cpu className="w-5 h-5 text-purple-400" />
          <h2 className="text-base font-bold font-display text-white">AI Model Signal Performance</h2>
        </div>
        <Badge variant="purple">NEURAL v4.8</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Daily Accuracy</span>
          <div className="text-2xl font-black text-emerald-400 font-display">{dailyAccuracy}%</div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Weekly Accuracy</span>
          <div className="text-2xl font-black text-purple-400 font-display">{weeklyAccuracy}%</div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Monthly Accuracy</span>
          <div className="text-2xl font-black text-blue-400 font-display">{monthlyAccuracy}%</div>
        </div>
      </div>

      <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
        <div className="space-x-4">
          <span className="text-slate-400">Total Signals: <strong className="text-white">{totalSignalsGenerated}</strong></span>
          <span className="text-slate-400">Wins: <strong className="text-emerald-400">{winningSignals}</strong></span>
          <span className="text-slate-400">Losses: <strong className="text-red-400">{losingSignals}</strong></span>
        </div>
        <span className="text-purple-400 font-bold">93.2% Win Ratio</span>
      </div>
    </GlassCard>
  );
};
