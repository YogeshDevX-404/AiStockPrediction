import React, { useState, useEffect } from 'react';
import { GlassCard } from '../cards/GlassCard';
import { Button } from '../buttons/Button';
import { Badge } from '../ui/Badge';
import { Bot, Bell, Star, FileText, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { useWatchlistStore } from '@/store/useWatchlistStore';
import { apiClient } from '@/api';

export const RightInsightPanel: React.FC = () => {
  const [note, setNote] = useState('');
  const { items: watchlistItems } = useWatchlistStore();
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch real triggered alerts if available
    apiClient.get('/alerts/history')
      .then((res: any) => setAlerts(res.data || []))
      .catch(() => setAlerts([]));
  }, []);

  return (
    <aside className="w-80 h-full flex flex-col space-y-4 select-none shrink-0">
      {/* 1. AI Co-Pilot Widget Card */}
      <GlassCard glow className="p-4 border-purple-500/30 bg-gradient-to-br from-purple-100 via-white to-white dark:from-purple-950/30 dark:via-card dark:to-[#070b1a] space-y-3">
        <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-600 dark:text-purple-400">
          <Bot className="w-5 h-5" />
          <h3 className="text-sm font-extrabold text-foreground font-display">AI Co-Pilot Assistant</h3>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Ask any market question or get instant stock analysis.
        </p>
        <Link to={ROUTES.CHAT}>
          <Button variant="accent" size="sm" className="w-full text-xs" leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
            Open AI Assistant
          </Button>
        </Link>
      </GlassCard>

      {/* 2. Triggered Alerts & Notifications */}
      <GlassCard className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-amber-500 dark:text-amber-500 dark:text-amber-400" />
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Triggered Alerts</h3>
          </div>
          <Badge variant="outline" className="text-[9px] border-border text-foreground">{alerts.length} ACTIVE</Badge>
        </div>

        <div className="space-y-2 text-xs">
          {alerts.length > 0 ? (
            alerts.slice(0, 3).map((item) => (
              <div key={item.id} className="p-2.5 rounded-xl bg-foreground/5 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">{item.symbol} Alert</span>
                  <span className="text-[10px] text-muted-foreground">Triggered</span>
                </div>
                <p className="text-[11px] text-muted-foreground">{item.alertType || item.triggerMessage}</p>
              </div>
            ))
          ) : (
            <p className="text-xs text-muted-foreground py-2 text-center">No triggered alerts</p>
          )}
        </div>
      </GlassCard>

      {/* 3. Quick Trader Notes */}
      <GlassCard className="p-4 space-y-3">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider">Quick Scratch Notes</h3>
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Jot down quick trade ideas or price levels..."
          className="w-full bg-foreground/5 border border-border/50 rounded-xl p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none h-20"
        />
      </GlassCard>

      {/* 4. Favorite Stocks */}
      <GlassCard className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-amber-500 dark:text-amber-500 dark:text-amber-400" />
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Watchlist Favorites</h3>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          {watchlistItems.length > 0 ? (
            watchlistItems.slice(0, 4).map((f) => (
              <div key={f.id || f.symbol} className="flex items-center justify-between p-2 rounded-xl bg-foreground/5">
                <span className="font-bold text-foreground font-mono">{f.symbol}</span>
                <span className="text-muted-foreground">{f.price ? `$${f.price}` : 'N/A'}</span>
                <span className={`font-bold ${f.changePercent >= 0 ? 'text-emerald-600 dark:text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-600 dark:text-red-400'}`}>
                  {f.changePercent >= 0 ? '+' : ''}{f.changePercent}%
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-muted-foreground py-2 text-center">No stocks in watchlist</p>
          )}
        </div>
      </GlassCard>
    </aside>
  );
};
