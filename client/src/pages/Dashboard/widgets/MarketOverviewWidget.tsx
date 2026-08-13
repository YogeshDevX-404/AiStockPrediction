import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { mockMarketTickers } from '@/services/mock/mockMarketService';
import { TrendingUp, TrendingDown, Globe } from 'lucide-react';

export const MarketOverviewWidget: React.FC = () => {
  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-blue-400" />
          <h2 className="text-base font-bold font-display text-white">Global Markets Overview</h2>
        </div>
        <Badge variant="blue">GLOBAL INDICES</Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {mockMarketTickers.slice(0, 5).map((item) => {
          const isPos = !item.change.startsWith('-');
          return (
            <div
              key={item.symbol}
              className="p-3 rounded-2xl glass-panel border border-white/5 space-y-1 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-white font-mono">{item.symbol}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-sm font-black text-white font-display">{item.price}</div>
              <div className={`text-[11px] font-bold flex items-center ${isPos ? 'text-emerald-400' : 'text-red-400'}`}>
                {isPos ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {item.change} ({item.changePercent}%)
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};
