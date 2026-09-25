import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Coins, AlertCircle } from 'lucide-react';
import { apiClient } from '@/api';

export const CryptoOverviewWidget: React.FC = () => {
  const [cryptoList, setCryptoList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/market/overview')
      .then((res: any) => setCryptoList(res.data?.crypto || []))
      .catch(() => setCryptoList([]))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Coins className="w-5 h-5 text-purple-600 dark:text-purple-600 dark:text-purple-400" />
          <h2 className="text-base font-bold font-display text-foreground">Crypto Market Overview</h2>
        </div>
        <Badge variant="purple">24/7 MARKETS</Badge>
      </div>

      {isLoading ? (
        <div className="p-4 text-center text-xs text-muted-foreground">Loading crypto quotes...</div>
      ) : cryptoList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {cryptoList.map((c) => {
            const isPos = c.changePercent >= 0;
            return (
              <div key={c.symbol} className="p-3 rounded-2xl glass-panel border border-border/40 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-foreground font-mono">{c.symbol}</span>
                  <span className={`text-[10px] font-bold ${isPos ? 'text-emerald-600 dark:text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-600 dark:text-red-400'}`}>
                    {isPos ? '+' : ''}{c.changePercent}%
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-200">{c.price}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-foreground/5 text-xs text-muted-foreground flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-500 dark:text-amber-500 dark:text-amber-400 shrink-0" />
          <span>Crypto rate feeds unconfigured or offline.</span>
        </div>
      )}
    </GlassCard>
  );
};
