import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Newspaper, AlertCircle, RefreshCw } from 'lucide-react';
import { apiClient } from '@/api';

export const LatestNewsWidget: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/news')
      .then((res: any) => {
        setNews(res.data || []);
      })
      .catch(() => setNews([]))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Newspaper className="w-5 h-5 text-cyan-400" />
          <h2 className="text-base font-bold font-display text-foreground">Latest Financial News</h2>
        </div>
        <Badge variant="blue">MARKET NEWS</Badge>
      </div>

      {isLoading ? (
        <div className="p-6 text-center text-xs text-muted-foreground flex items-center justify-center space-x-2">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>Fetching market news...</span>
        </div>
      ) : news.length > 0 ? (
        <div className="space-y-3 text-xs">
          {news.slice(0, 4).map((item) => (
            <a
              key={item.id}
              href={item.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-2xl bg-foreground/5 border border-border/40 space-y-1.5 hover:border-border transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground font-bold uppercase">{item.source || 'News'}</span>
                <Badge variant={item.sentiment === 'BULLISH' ? 'emerald' : item.sentiment === 'BEARISH' ? 'red' : 'purple'} className="text-[9px]">
                  {item.sentiment || 'NEUTRAL'}
                </Badge>
              </div>
              <h3 className="font-bold text-foreground hover:text-emerald-600 dark:text-emerald-600 dark:text-emerald-400 transition-colors cursor-pointer">{item.title}</h3>
            </a>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-foreground/5 text-xs text-muted-foreground flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-500 dark:text-amber-500 dark:text-amber-400 shrink-0" />
          <span>News data unavailable. Please configure <code className="text-amber-300">FINNHUB_API_KEY</code> or <code className="text-amber-300">NEWS_API_KEY</code> in backend <code className="text-amber-300">.env</code> file.</span>
        </div>
      )}
    </GlassCard>
  );
};
