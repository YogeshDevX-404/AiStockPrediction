import React, { useState } from 'react';
import { GlassCard } from '../cards/GlassCard';
import { Badge } from '../ui/Badge';
import { Bot, Sparkles, Zap, ChevronRight, ChevronLeft, Target, ShieldAlert } from 'lucide-react';
import { formatCurrency } from '@/utils/cn';

export interface ChartAIOverlayPanelProps {
  symbol: string;
}

export const ChartAIOverlayPanel: React.FC<ChartAIOverlayPanelProps> = ({ symbol }) => {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="absolute top-14 right-4 z-20 p-2.5 rounded-2xl glass-panel border border-purple-500/30 text-purple-400 hover:text-white transition-all shadow-xl cursor-pointer"
        title="Open AI Neural Overlay"
      >
        <Sparkles className="w-5 h-5 animate-pulse" />
      </button>
    );
  }

  return (
    <div className="absolute top-14 right-4 z-20 w-72 glass-panel p-4 border border-purple-500/40 rounded-3xl bg-[#070c1e]/95 shadow-2xl backdrop-blur-2xl space-y-3 select-none">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center space-x-2">
          <Bot className="w-4 h-4 text-purple-400" />
          <h3 className="text-xs font-black text-white font-display">AI Chart Radar</h3>
        </div>
        <button
          onClick={() => setCollapsed(true)}
          className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Signal & Trend */}
      <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-purple-950/40 border border-emerald-500/30 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase">Trend Direction</span>
          <div className="text-sm font-black text-emerald-400 font-display">STRONG BULLISH</div>
        </div>
        <Badge variant="emerald">94.8% CONF</Badge>
      </div>

      {/* Target & Stop Loss */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
          <span className="text-[9px] text-slate-400 uppercase font-bold">Target Price</span>
          <div className="font-extrabold text-emerald-400 font-mono">{formatCurrency(155.00)}</div>
        </div>
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 space-y-0.5">
          <span className="text-[9px] text-slate-400 uppercase font-bold">Stop Loss</span>
          <div className="font-extrabold text-red-400 font-mono">{formatCurrency(124.00)}</div>
        </div>
      </div>

      {/* Support & Resistance Levels */}
      <div className="space-y-1.5 text-[11px] pt-1">
        <div className="flex justify-between text-slate-300 font-mono">
          <span>R1 Resistance:</span>
          <span className="font-bold text-red-400">${136.00}</span>
        </div>
        <div className="flex justify-between text-slate-300 font-mono">
          <span>S1 Support:</span>
          <span className="font-bold text-emerald-400">${128.50}</span>
        </div>
      </div>
    </div>
  );
};
