import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { useTechnicalStore } from '@/store/useTechnicalStore';
import { Activity, Gauge, TrendingUp, ShieldAlert, Loader2 } from 'lucide-react';
import { formatCurrency } from '@/utils/cn';

export const StockTechnicalIndicators: React.FC = () => {
  const { indicators, isLoading } = useTechnicalStore();

  if (isLoading) {
    return (
      <GlassCard className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-spin" />
      </GlassCard>
    );
  }

  if (!indicators) {
    return (
      <GlassCard className="p-6 text-center space-y-2">
        <Activity className="w-8 h-8 text-muted-foreground mx-auto" />
        <h2 className="text-foreground font-bold">Technical Data Unavailable</h2>
        <p className="text-xs text-muted-foreground">Not enough historical data to calculate indicators.</p>
      </GlassCard>
    );
  }

  const formatNum = (val: number | null, decimals = 2) => val !== null ? val.toFixed(decimals) : 'N/A';

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-base font-bold font-display text-foreground">Technical Indicators & Support/Resistance</h2>
        </div>
        <Badge variant={indicators.overallTrend.includes('BULL') ? 'emerald' : indicators.overallTrend.includes('BEAR') ? 'red' : 'purple'}>
          {indicators.overallTrend.replace('_', ' ')}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* RSI */}
        <div className="p-4 rounded-2xl bg-foreground/5 border border-border/40 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-foreground uppercase">RSI (14)</span>
            {indicators.rsi && <Badge variant={indicators.rsi.signal === 'OVERBOUGHT' ? 'red' : indicators.rsi.signal === 'OVERSOLD' ? 'emerald' : 'blue'}>{indicators.rsi.signal}</Badge>}
          </div>
          <div className="text-2xl font-black text-foreground font-mono">{indicators.rsi ? formatNum(indicators.rsi.value, 1) : 'N/A'}</div>
          {indicators.rsi && indicators.rsi.value !== null && (
            <div className="w-full bg-foreground/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-400 h-full" style={{ width: `${Math.min(100, Math.max(0, indicators.rsi.value))}%` }} />
            </div>
          )}
        </div>

        {/* MACD */}
        <div className="p-4 rounded-2xl bg-foreground/5 border border-border/40 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-foreground uppercase">MACD</span>
            {indicators.macd && <Badge variant={indicators.macd.signal.includes('BULLISH') ? 'emerald' : indicators.macd.signal.includes('BEARISH') ? 'red' : 'purple'}>{indicators.macd.signal.replace('_', ' ')}</Badge>}
          </div>
          <div className={`text-xl font-black font-mono ${indicators.macd?.value && indicators.macd.value >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
            {indicators.macd?.value && indicators.macd.value > 0 ? '+' : ''}{formatNum(indicators.macd?.value ?? null)}
          </div>
          <p className="text-[10px] text-muted-foreground">Signal Line: {formatNum(indicators.macd?.signalLine ?? null)}</p>
        </div>

        {/* Moving Averages */}
        <div className="p-4 rounded-2xl bg-foreground/5 border border-border/40 space-y-1">
          <span className="font-bold text-foreground uppercase">Exponential Moving Averages</span>
          <div className="space-y-1 pt-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">EMA 20:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{indicators.ema20 ? formatCurrency(indicators.ema20) : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">EMA 50:</span>
              <span className="font-bold text-foreground font-mono">{indicators.ema50 ? formatCurrency(indicators.ema50) : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">EMA 200:</span>
              <span className="font-bold text-purple-600 dark:text-purple-400 font-mono">{indicators.ema200 ? formatCurrency(indicators.ema200) : 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Bollinger Bands & VWAP */}
        <div className="p-4 rounded-2xl bg-foreground/5 border border-border/40 space-y-1">
          <span className="font-bold text-foreground uppercase">VWAP & Bollinger</span>
          <div className="space-y-1 pt-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">VWAP:</span>
              <span className="font-bold text-foreground font-mono">{indicators.vwap ? formatCurrency(indicators.vwap) : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Upper Band:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{indicators.bollingerBands ? formatCurrency(indicators.bollingerBands.upper) : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lower Band:</span>
              <span className="font-bold text-red-600 dark:text-red-400 font-mono">{indicators.bollingerBands ? formatCurrency(indicators.bollingerBands.lower) : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Support & Resistance Levels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
          <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider text-[10px]">Key Support Levels</span>
          <div className="flex items-center space-x-2 font-mono font-bold text-foreground">
            {indicators.supportLevels.length > 0 ? indicators.supportLevels.map((lvl, idx) => (
              <span key={idx} className="px-2 py-1 rounded bg-foreground/10">S{idx + 1}: ${lvl.toFixed(2)}</span>
            )) : <span className="text-muted-foreground font-sans">N/A</span>}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 space-y-1.5">
          <span className="font-bold text-red-600 dark:text-red-400 uppercase tracking-wider text-[10px]">Key Resistance Levels</span>
          <div className="flex items-center space-x-2 font-mono font-bold text-foreground">
            {indicators.resistanceLevels.length > 0 ? indicators.resistanceLevels.map((lvl, idx) => (
              <span key={idx} className="px-2 py-1 rounded bg-foreground/10">R{idx + 1}: ${lvl.toFixed(2)}</span>
            )) : <span className="text-muted-foreground font-sans">N/A</span>}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
