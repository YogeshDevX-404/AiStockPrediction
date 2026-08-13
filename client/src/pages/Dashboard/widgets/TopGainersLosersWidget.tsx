import React, { useState } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { mockTopGainers, mockTopLosers } from '@/services/mock/mockMarketService';
import { formatCurrency } from '@/utils/cn';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const TopGainersLosersWidget: React.FC = () => {
  const [tab, setTab] = useState<'gainers' | 'losers'>('gainers');
  const items = tab === 'gainers' ? mockTopGainers : mockTopLosers;

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {tab === 'gainers' ? (
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-400" />
          )}
          <h2 className="text-base font-bold font-display text-white">Market Movers</h2>
        </div>

        <div className="flex items-center space-x-1 glass-panel p-1 rounded-xl">
          <button
            onClick={() => setTab('gainers')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              tab === 'gainers' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Gainers
          </button>
          <button
            onClick={() => setTab('losers')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              tab === 'losers' ? 'bg-red-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Losers
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((item) => {
          const isPos = item.changePercent >= 0;
          return (
            <div
              key={item.symbol}
              className="p-3.5 rounded-2xl glass-panel border border-white/5 space-y-2 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-white font-mono">{item.symbol}</span>
                <Badge variant={isPos ? 'emerald' : 'red'} className="text-[10px]">
                  {isPos ? '+' : ''}{item.changePercent}%
                </Badge>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-400 truncate max-w-[100px]">{item.name}</span>
                <span className="text-sm font-bold text-white font-display">{formatCurrency(item.price)}</span>
              </div>

              {/* Sparkline Mini SVG */}
              <div className="h-8 w-full pt-1">
                <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <path
                    d={`M0,${30 - item.sparkline[0] / 10} L20,${30 - item.sparkline[1] / 10} L40,${
                      30 - item.sparkline[2] / 10
                    } L60,${30 - item.sparkline[3] / 10} L80,${30 - item.sparkline[4] / 10} L100,${
                      30 - item.sparkline[5] / 10
                    }`}
                    fill="none"
                    stroke={isPos ? '#10b981' : '#ef4444'}
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};
