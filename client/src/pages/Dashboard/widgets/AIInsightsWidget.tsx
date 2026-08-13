import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, TrendingUp, TrendingDown, Zap, Eye, Target } from 'lucide-react';

interface Insight {
  title: string;
  badge: string;
  variant: 'emerald' | 'red' | 'purple' | 'blue' | 'amber';
  icon: React.ReactNode;
  summary: string;
  symbols: string[];
}

const insights: Insight[] = [
  {
    title: 'Bullish Sector Trend',
    badge: 'ACCUMULATION',
    variant: 'emerald',
    icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
    summary: 'Institutional buying detected across AI hardware and semiconductors.',
    symbols: ['NVDA', 'AMD', 'TSM'],
  },
  {
    title: 'Bearish Pullback Alert',
    badge: 'WEAKNESS',
    variant: 'red',
    icon: <TrendingDown className="w-5 h-5 text-red-400" />,
    summary: 'Foundry margins facing short-term pressure.',
    symbols: ['INTC', 'MU'],
  },
  {
    title: 'Strong Momentum Breakout',
    badge: 'MOMENTUM',
    variant: 'purple',
    icon: <Zap className="w-5 h-5 text-purple-400" />,
    summary: 'RSI volume spike breaking above 20-day EMA resistance.',
    symbols: ['TSLA', 'PLTR'],
  },
  {
    title: 'Oversold Opportunity',
    badge: 'REBOUND',
    variant: 'blue',
    icon: <Eye className="w-5 h-5 text-blue-400" />,
    summary: 'RSI below 30 with institutional support levels intact.',
    symbols: ['GOOGL', 'AMZN'],
  },
];

export const AIInsightsWidget: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-bold font-display text-white">AI Market Insights</h2>
        </div>
        <Badge variant="purple">NEURAL RADAR</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((item) => (
          <GlassCard key={item.title} glow className="p-4 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  {item.icon}
                </div>
                <Badge variant={item.variant} className="text-[10px]">{item.badge}</Badge>
              </div>

              <h3 className="font-bold text-sm text-white font-display">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.summary}</p>
            </div>

            <div className="flex items-center space-x-1.5 pt-2 border-t border-white/5">
              {item.symbols.map((sym) => (
                <span key={sym} className="px-2 py-0.5 rounded bg-white/5 font-mono text-[10px] font-bold text-white">
                  ${sym}
                </span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
