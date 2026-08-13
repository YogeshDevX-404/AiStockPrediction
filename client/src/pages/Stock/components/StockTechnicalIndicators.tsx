import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { useTechnicalStore } from '@/store/useTechnicalStore';
import { Activity, Gauge, TrendingUp, ShieldAlert } from 'lucide-react';
import { formatCurrency } from '@/utils/cn';

export const StockTechnicalIndicators: React.FC = () => {
  const { indicators } = useTechnicalStore();

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-purple-400" />
          <h2 className="text-base font-bold font-display text-white">Technical Indicators & Support/Resistance</h2>
        </div>
        <Badge variant="purple">{indicators.overallTrend}</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* RSI */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-white uppercase">RSI (14)</span>
            <Badge variant="blue">{indicators.rsi.signal}</Badge>
          </div>
          <div className="text-2xl font-black text-white font-mono">{indicators.rsi.value}</div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-400 h-full" style={{ width: `${indicators.rsi.value}%` }} />
          </div>
        </div>

        {/* MACD */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-white uppercase">MACD</span>
            <Badge variant="emerald">{indicators.macd.signal.replace('_', ' ')}</Badge>
          </div>
          <div className="text-xl font-black text-emerald-400 font-mono">+{indicators.macd.value}</div>
          <p className="text-[10px] text-slate-400">Signal Line: {indicators.macd.signalLine}</p>
        </div>

        {/* Moving Averages */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
          <span className="font-bold text-white uppercase">Exponential Moving Averages</span>
          <div className="space-y-1 pt-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-400">EMA 20:</span>
              <span className="font-bold text-emerald-400 font-mono">{formatCurrency(indicators.ema20)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">EMA 50:</span>
              <span className="font-bold text-white font-mono">{formatCurrency(indicators.ema50)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">EMA 200:</span>
              <span className="font-bold text-purple-400 font-mono">{formatCurrency(indicators.ema200)}</span>
            </div>
          </div>
        </div>

        {/* Bollinger Bands & VWAP */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
          <span className="font-bold text-white uppercase">VWAP & Bollinger</span>
          <div className="space-y-1 pt-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-slate-400">VWAP:</span>
              <span className="font-bold text-white font-mono">{formatCurrency(indicators.vwap)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Upper Band:</span>
              <span className="font-bold text-emerald-400 font-mono">{formatCurrency(indicators.bollingerBands.upper)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Lower Band:</span>
              <span className="font-bold text-red-400 font-mono">{formatCurrency(indicators.bollingerBands.lower)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Support & Resistance Levels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
          <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px]">Key Support Levels</span>
          <div className="flex items-center space-x-2 font-mono font-bold text-white">
            {indicators.supportLevels.map((lvl, idx) => (
              <span key={idx} className="px-2 py-1 rounded bg-white/10">S{idx + 1}: ${lvl}</span>
            ))}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 space-y-1.5">
          <span className="font-bold text-red-400 uppercase tracking-wider text-[10px]">Key Resistance Levels</span>
          <div className="flex items-center space-x-2 font-mono font-bold text-white">
            {indicators.resistanceLevels.map((lvl, idx) => (
              <span key={idx} className="px-2 py-1 rounded bg-white/10">R{idx + 1}: ${lvl}</span>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
