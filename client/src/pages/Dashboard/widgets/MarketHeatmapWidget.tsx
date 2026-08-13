import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { mockHeatmapItems } from '@/services/mock/mockMarketService';
import { Flame } from 'lucide-react';

export const MarketHeatmapWidget: React.FC = () => {
  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Flame className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold font-display text-white">Market Sector Heatmap</h2>
        </div>
        <Badge variant="emerald">REAL-TIME INTENSITY</Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {mockHeatmapItems.map((item) => {
          const isPos = item.changePercent >= 0;
          const absVal = Math.abs(item.changePercent);
          const bgOpacity = Math.min(0.4, 0.1 + (absVal / 10) * 0.3);

          return (
            <div
              key={item.symbol}
              className="p-4 rounded-2xl border text-center space-y-1 transition-transform hover:scale-105"
              style={{
                backgroundColor: isPos
                  ? `rgba(16, 185, 129, ${bgOpacity})`
                  : `rgba(239, 68, 68, ${bgOpacity})`,
                borderColor: isPos ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
              }}
            >
              <div className="font-extrabold text-sm text-white font-mono">{item.symbol}</div>
              <div className="text-[10px] text-slate-300 truncate">{item.name}</div>
              <div className={`text-xs font-black ${isPos ? 'text-emerald-400' : 'text-red-400'}`}>
                {isPos ? '+' : ''}{item.changePercent}%
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};
