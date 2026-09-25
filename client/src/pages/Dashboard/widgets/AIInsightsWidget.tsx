import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, TrendingUp, TrendingDown, Zap, Eye, AlertCircle } from 'lucide-react';
import { apiClient } from '@/api';

export const AIInsightsWidget: React.FC = () => {
  const [insights, setInsights] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/market/insights')
      .then((res: any) => setInsights(res.data || []))
      .catch(() => setInsights([]))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-600 dark:text-purple-400" />
          <h2 className="text-lg font-bold font-display text-foreground">Algorithmic Market Insights</h2>
        </div>
        <Badge variant="purple">TECHNICAL RADAR</Badge>
      </div>

      {isLoading ? (
        <div className="p-4 text-center text-xs text-muted-foreground">Loading market insights...</div>
      ) : insights.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {insights.map((item, idx) => (
            <GlassCard key={item.title || idx} glow className="p-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-foreground/5 border border-border/50">
                    <Zap className="w-4 h-4 text-purple-600 dark:text-purple-600 dark:text-purple-400" />
                  </div>
                  <Badge variant="purple" className="text-[10px]">{item.badge || 'INSIGHT'}</Badge>
                </div>

                <h3 className="font-bold text-sm text-foreground font-display">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.summary}</p>
              </div>

              <div className="flex items-center space-x-1.5 pt-2 border-t border-border/40">
                {(item.symbols || []).map((sym: string) => (
                  <span key={sym} className="px-2 py-0.5 rounded bg-foreground/5 font-mono text-[10px] font-bold text-foreground">
                    ${sym}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-foreground/5 border border-border/50 text-xs text-muted-foreground flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-500 dark:text-amber-500 dark:text-amber-400 shrink-0" />
          <span>Market insights unavailable. Please configure market data provider credentials in backend <code className="text-amber-300">.env</code>.</span>
        </div>
      )}
    </div>
  );
};
