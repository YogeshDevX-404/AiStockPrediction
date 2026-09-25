import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/utils/cn';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { apiClient } from '@/api';

export const TopGainersLosersWidget: React.FC = () => {
  const [tab, setTab] = useState<'gainers' | 'losers'>('gainers');
  const [gainers, setGainers] = useState<any[]>([]);
  const [losers, setLosers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/market/movers')
      .then((res: any) => {
        setGainers(res.data?.gainers || []);
        setLosers(res.data?.losers || []);
      })
      .catch(() => {
        setGainers([]);
        setLosers([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const items = tab === 'gainers' ? gainers : losers;

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {tab === 'gainers' ? (
            <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-600 dark:text-emerald-400" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-600 dark:text-red-400" />
          )}
          <h2 className="text-base font-bold font-display text-foreground">Market Movers</h2>
        </div>

        <div className="flex items-center space-x-1 glass-panel p-1 rounded-xl">
          <button
            onClick={() => setTab('gainers')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              tab === 'gainers' ? 'bg-emerald-500 text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Gainers
          </button>
          <button
            onClick={() => setTab('losers')}
            className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              tab === 'losers' ? 'bg-red-500 text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Losers
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="p-6 text-center text-xs text-muted-foreground">Loading market movers...</div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {items.map((item) => {
            const isPos = item.changePercent >= 0;
            return (
              <div
                key={item.symbol}
                className="p-3.5 rounded-2xl glass-panel border border-border/40 space-y-2 hover:border-border transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-foreground font-mono">{item.symbol}</span>
                  <Badge variant={isPos ? 'emerald' : 'red'} className="text-[10px]">
                    {isPos ? '+' : ''}{item.changePercent}%
                  </Badge>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-muted-foreground truncate max-w-[100px]">{item.name}</span>
                  <span className="text-sm font-bold text-foreground font-display">{formatCurrency(item.price)}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-foreground/5 text-xs text-muted-foreground flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-500 dark:text-amber-500 dark:text-amber-400 shrink-0" />
          <span>Market movers data unavailable. Please configure market provider API key in backend <code className="text-amber-300">.env</code>.</span>
        </div>
      )}
    </GlassCard>
  );
};
