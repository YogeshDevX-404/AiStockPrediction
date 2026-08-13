import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { Sparkles, Target, ShieldAlert, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '@/utils/cn';

export const AIRecommendationWidget: React.FC = () => {
  const signal = 'STRONG_BUY';
  const confidence = 94.8;
  const symbol = 'NVDA';
  const name = 'NVIDIA Corporation';
  const currentPrice = 132.40;
  const targetPrice = 155.00;
  const stopLoss = 124.00;
  const riskLevel = 'LOW';

  return (
    <GlassCard glow className="p-6 border-purple-500/40 bg-gradient-to-br from-purple-950/40 via-[#0a1128] to-[#060914] space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-black text-white font-display">Featured AI Neural Signal</h2>
              <Badge variant="purple">MODEL v4.8</Badge>
            </div>
            <p className="text-xs text-slate-400">High-conviction order book breakdown signal</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black text-emerald-400 font-display flex items-center justify-end">
            <Zap className="w-5 h-5 mr-1" /> BUY
          </span>
          <span className="text-[10px] text-slate-400 font-bold uppercase">Signal Type</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Symbol & Price */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold">Asset</span>
          <div className="text-xl font-extrabold text-white font-mono">{symbol}</div>
          <div className="text-xs text-slate-300">{formatCurrency(currentPrice)}</div>
        </div>

        {/* Target Price */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
          <span className="text-[10px] text-emerald-300 uppercase font-bold">Target Price</span>
          <div className="text-xl font-extrabold text-emerald-400 font-display">{formatCurrency(targetPrice)}</div>
          <div className="text-xs text-emerald-400 font-bold">+17.0% Upside</div>
        </div>

        {/* Stop Loss */}
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-1">
          <span className="text-[10px] text-red-300 uppercase font-bold">Stop Loss</span>
          <div className="text-xl font-extrabold text-red-400 font-display">{formatCurrency(stopLoss)}</div>
          <div className="text-xs text-red-400 font-bold">-6.3% Hazard</div>
        </div>

        {/* Confidence Gauge */}
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-1 text-center">
          <span className="text-[10px] text-purple-300 uppercase font-bold">AI Confidence</span>
          <div className="text-2xl font-black text-purple-400 font-display">{confidence}%</div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-purple-400 h-full w-[94%]" />
          </div>
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <span className="font-bold text-white uppercase tracking-wider text-[11px]">Signal Rationale Breakdown:</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Blackwell GPU production yields exceeding early forecasts.</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Level-2 Order Depth accumulation above $128.50 key resistance.</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
