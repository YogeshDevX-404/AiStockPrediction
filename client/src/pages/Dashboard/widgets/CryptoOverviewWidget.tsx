import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { mockCryptoItems } from '@/services/mock/mockMarketService';
import { formatCurrency } from '@/utils/cn';
import { Coins, TrendingUp } from 'lucide-react';

export const CryptoOverviewWidget: React.FC = () => {
  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Coins className="w-5 h-5 text-purple-400" />
          <h2 className="text-base font-bold font-display text-white">Crypto Overview</h2>
        </div>
        <Badge variant="purple">24/7 MARKETS</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {mockCryptoItems.map((c) => {
          const isPos = c.changePercent >= 0;
          return (
            <div key={c.symbol} className="p-3 rounded-2xl glass-panel border border-white/5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-xs text-white font-mono">{c.symbol}</span>
                <span className={`text-[10px] font-bold ${isPos ? 'text-emerald-400' : 'text-red-400'}`}>
                  +{c.changePercent}%
                </span>
              </div>
              <div className="text-xs font-bold text-slate-200">{formatCurrency(c.price)}</div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};
