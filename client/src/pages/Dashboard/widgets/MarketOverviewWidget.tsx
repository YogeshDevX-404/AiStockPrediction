import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { TrendingUp, TrendingDown, Globe, AlertCircle, RefreshCw } from 'lucide-react';
import { apiClient } from '@/api';

export const MarketOverviewWidget: React.FC = () => {
  const [indices, setIndices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/market/overview')
      .then((res: any) => {
        setIndices(res.data?.indices || []);
      })
      .catch(() => setIndices([]))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          <h2 className="text-base font-bold font-display text-foreground">Global Markets Overview</h2>
        </div>
        <Badge variant="blue">MARKET INDICES</Badge>
      </div>

      {isLoading ? (
        <div className="p-6 text-center text-xs text-muted-foreground flex items-center justify-center space-x-2">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>Fetching market index rates...</span>
        </div>
      ) : indices.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {indices.map((item) => {
            const isPos = item.changePercent >= 0;
            return (
              <div
                key={item.symbol}
                className="p-3 rounded-2xl glass-panel border border-border/40 space-y-1 hover:border-border transition-all bg-card dark:bg-transparent"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-foreground font-mono">{item.symbol}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-500 dark:bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-sm font-black text-foreground font-display">{item.price}</div>
                <div className={`text-[11px] font-bold flex items-center ${isPos ? 'text-emerald-600 dark:text-emerald-600 dark:text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-600 dark:text-red-600 dark:text-red-400'}`}>
                  {isPos ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                  {item.changePercent}%
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-500 dark:text-amber-500 dark:text-amber-400 flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Market index quotes unavailable. Please configure <code className="text-amber-600 dark:text-amber-300">FINNHUB_API_KEY</code> or market provider credentials in backend <code className="text-amber-600 dark:text-amber-300">.env</code> file.</span>
        </div>
      )}
    </GlassCard>
  );
};
