import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/utils/cn';
import { BarChart3, AlertCircle } from 'lucide-react';
import { apiClient } from '@/api';

export const TradingPerformanceWidget: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/paper/account')
      .then((res: any) => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setIsLoading(false));
  }, []);

  const totalTrades = stats?.totalTrades || 0;
  const winningTrades = stats?.winningTrades || 0;
  const winRate = totalTrades > 0 ? ((winningTrades / totalTrades) * 100).toFixed(1) : '0.0';

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-emerald-500 dark:text-emerald-600 dark:text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-base font-bold font-display text-foreground">Paper Trading Simulation Stats</h2>
        </div>
        <Badge variant="emerald">{winRate}% WIN RATE</Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-3 rounded-2xl bg-foreground/5 space-y-1">
          <div className="text-[10px] text-muted-foreground font-bold uppercase">Total Trades</div>
          <div className="text-lg font-black text-foreground font-display">{totalTrades}</div>
        </div>
        <div className="p-3 rounded-2xl bg-foreground/5 space-y-1">
          <div className="text-[10px] text-muted-foreground font-bold uppercase">Wins</div>
          <div className="text-lg font-black text-emerald-600 dark:text-emerald-600 dark:text-emerald-600 dark:text-emerald-400 font-display">{winningTrades}</div>
        </div>
        <div className="p-3 rounded-2xl bg-foreground/5 space-y-1">
          <div className="text-[10px] text-muted-foreground font-bold uppercase">Virtual Balance</div>
          <div className="text-lg font-black text-emerald-600 dark:text-emerald-600 dark:text-emerald-600 dark:text-emerald-400 font-display">{formatCurrency(stats?.virtualCash || 10000)}</div>
        </div>
        <div className="p-3 rounded-2xl bg-foreground/5 space-y-1">
          <div className="text-[10px] text-muted-foreground font-bold uppercase">Buying Power</div>
          <div className="text-lg font-black text-purple-600 dark:text-purple-600 dark:text-purple-600 dark:text-purple-400 font-display">{formatCurrency(stats?.buyingPower || 10000)}</div>
        </div>
      </div>
    </GlassCard>
  );
};
