import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { useWatchlistStore } from '@/store/useWatchlistStore';
import { Sparkles, Zap, TrendingDown, Eye, Activity, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AIWatchlistRadar: React.FC = () => {
  const navigate = useNavigate();
  const { radar } = useWatchlistStore();

  const data = radar || {
    bestBuyToday: { symbol: 'NVDA', confidence: 94.8, upside: '+17.0%' },
    bestSellToday: { symbol: 'INTC', confidence: 82.4, downside: '-8.5%' },
    breakoutCandidate: { symbol: 'TSLA', resistance: '$250.00' },
    oversoldStock: { symbol: 'GOOGL', rsi: 28.4 },
    volumeSpikeStock: { symbol: 'NVDA', volumeMultiplier: '2.8x Avg' },
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <h2 className="text-base font-bold font-display text-foreground">AI Watchlist Scanner Radar</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Best Buy Today */}
        <GlassCard
          glow
          className="p-3.5 border-purple-500/30 bg-purple-950/20 space-y-1 hover:border-purple-500/60 cursor-pointer"
          onClick={() => navigate(`/stocks/${data.bestBuyToday.symbol}`)}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground uppercase font-bold">Best Buy Signal</span>
            <Badge variant="emerald" className="text-[9px]">BUY</Badge>
          </div>
          <div className="text-base font-extrabold text-foreground font-mono">{data.bestBuyToday.symbol}</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">{data.bestBuyToday.upside} Target Upside</div>
        </GlassCard>

        {/* Best Sell Today */}
        <GlassCard
          className="p-3.5 border-red-500/20 bg-red-950/20 space-y-1 hover:border-red-500/50 cursor-pointer"
          onClick={() => navigate(`/stocks/${data.bestSellToday.symbol}`)}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground uppercase font-bold">Sell Alert</span>
            <Badge variant="red" className="text-[9px]">SELL</Badge>
          </div>
          <div className="text-base font-extrabold text-foreground font-mono">{data.bestSellToday.symbol}</div>
          <div className="text-[11px] text-red-600 dark:text-red-400 font-bold">{data.bestSellToday.downside} Risk</div>
        </GlassCard>

        {/* Breakout Candidate */}
        <GlassCard
          className="p-3.5 space-y-1 hover:border-border cursor-pointer"
          onClick={() => navigate(`/stocks/${data.breakoutCandidate.symbol}`)}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground uppercase font-bold">Breakout Radar</span>
            <Zap className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-base font-extrabold text-foreground font-mono">{data.breakoutCandidate.symbol}</div>
          <div className="text-[11px] text-purple-600 dark:text-purple-400 font-bold">Over {data.breakoutCandidate.resistance}</div>
        </GlassCard>

        {/* Oversold Opportunity */}
        <GlassCard
          className="p-3.5 space-y-1 hover:border-border cursor-pointer"
          onClick={() => navigate(`/stocks/${data.oversoldStock.symbol}`)}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground uppercase font-bold">Oversold RSI</span>
            <Eye className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-base font-extrabold text-foreground font-mono">{data.oversoldStock.symbol}</div>
          <div className="text-[11px] text-blue-400 font-bold">RSI: {data.oversoldStock.rsi}</div>
        </GlassCard>

        {/* Volume Spike */}
        <GlassCard
          className="p-3.5 space-y-1 hover:border-border cursor-pointer"
          onClick={() => navigate(`/stocks/${data.volumeSpikeStock.symbol}`)}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground uppercase font-bold">Volume Spike</span>
            <Activity className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
          </div>
          <div className="text-base font-extrabold text-foreground font-mono">{data.volumeSpikeStock.symbol}</div>
          <div className="text-[11px] text-amber-500 dark:text-amber-400 font-bold">{data.volumeSpikeStock.volumeMultiplier}</div>
        </GlassCard>
      </div>
    </div>
  );
};
