import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { StockQuote } from '@/types';
import { formatCurrency, formatPercent } from '@/utils/cn';
import { TrendingUp, TrendingDown, Clock, Activity } from 'lucide-react';

export interface StockLivePriceCardProps {
  quote: StockQuote;
}

export const StockLivePriceCard: React.FC<StockLivePriceCardProps> = ({ quote }) => {
  const isPos = quote.changePercent >= 0;

  return (
    <GlassCard className="p-6 space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="text-4xl font-black text-white font-display tracking-tight">
            {formatCurrency(quote.price)}
          </div>
          <div className={`text-sm font-extrabold flex items-center mt-1 ${isPos ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPos ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            {isPos ? '+' : ''}{quote.change} ({formatPercent(quote.changePercent)}) Today
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1" />
            MARKET OPEN
          </div>
          <span className="text-slate-400 flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1 text-slate-500" />
            Updated {new Date(quote.lastUpdated || Date.now()).toLocaleTimeString()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold">Day High</span>
          <div className="text-sm font-bold text-emerald-400 font-mono">{formatCurrency(quote.high)}</div>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold">Day Low</span>
          <div className="text-sm font-bold text-red-400 font-mono">{formatCurrency(quote.low)}</div>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold">Open</span>
          <div className="text-sm font-bold text-white font-mono">{formatCurrency(quote.open)}</div>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold">Prev Close</span>
          <div className="text-sm font-bold text-slate-300 font-mono">{formatCurrency(quote.previousClose)}</div>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold">Volume</span>
          <div className="text-sm font-bold text-white font-mono">{quote.volume.toLocaleString()}</div>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold">Avg Volume</span>
          <div className="text-sm font-bold text-white font-mono">{quote.avgVolume?.toLocaleString() || '52.0M'}</div>
        </div>
      </div>
    </GlassCard>
  );
};
