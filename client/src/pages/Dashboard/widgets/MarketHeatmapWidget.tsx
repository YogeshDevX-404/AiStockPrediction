import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Flame, AlertCircle } from 'lucide-react';
import { apiClient } from '@/api';

export const MarketHeatmapWidget: React.FC = () => {
  const [heatmap, setHeatmap] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/market/heatmap')
      .then((res: any) => setHeatmap(res.data || []))
      .catch(() => setHeatmap([]))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Flame className="w-5 h-5 text-amber-500 dark:text-amber-500 dark:text-amber-400" />
          <h2 className="text-base font-bold font-display text-foreground">Market Sector Heatmap</h2>
        </div>
        <Badge variant="emerald">SECTOR INTENSITY</Badge>
      </div>

      {isLoading ? (
        <div className="p-4 text-center text-xs text-muted-foreground">Loading sector heatmap...</div>
      ) : heatmap.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {heatmap.map((item) => {
            const isPos = item.changePercent >= 0;
            const absVal = Math.abs(item.changePercent || 0);
            const bgOpacity = Math.min(0.4, 0.1 + (absVal / 10) * 0.3);

            return (
              <div
                key={item.symbol || item.sector}
                className="p-4 rounded-2xl border text-center space-y-1 transition-transform hover:scale-105"
                style={{
                  backgroundColor: isPos
                    ? `rgba(16, 185, 129, ${bgOpacity})`
                    : `rgba(239, 68, 68, ${bgOpacity})`,
                  borderColor: isPos ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                }}
              >
                <div className="font-extrabold text-sm text-foreground font-mono">{item.symbol || item.sector}</div>
                <div className="text-[10px] text-muted-foreground truncate">{item.name || item.sector}</div>
                <div className={`text-xs font-black ${isPos ? 'text-emerald-600 dark:text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-600 dark:text-red-400'}`}>
                  {isPos ? '+' : ''}{item.changePercent}%
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-foreground/5 text-xs text-muted-foreground flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-500 dark:text-amber-500 dark:text-amber-400 shrink-0" />
          <span>Sector heatmap data unconfigured. Please set market data provider API keys in backend environment.</span>
        </div>
      )}
    </GlassCard>
  );
};
