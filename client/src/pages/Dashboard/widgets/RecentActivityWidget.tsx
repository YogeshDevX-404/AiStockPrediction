import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { apiClient } from '@/api';

export const RecentActivityWidget: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      apiClient.get('/alerts/history'),
      apiClient.get('/portfolio/history'),
    ])
      .then(([alertsRes, portRes]) => {
        const alertList = alertsRes.status === 'fulfilled' ? alertsRes.value.data || [] : [];
        const portList = portRes.status === 'fulfilled' ? portRes.value.data || [] : [];

        const combined = [
          ...alertList.map((a: any) => ({
            id: a.id,
            title: `Alert: ${a.symbol}`,
            time: new Date(a.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            details: a.alertType || a.triggerMessage || 'Triggered alert',
            isPos: true,
          })),
          ...portList.map((p: any) => ({
            id: p.id,
            title: `Trade: ${p.type} ${p.quantity} ${p.symbol}`,
            time: new Date(p.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            details: `Executed at $${p.price}`,
            isPos: p.type === 'BUY',
          })),
        ];

        setActivities(combined);
      })
      .catch(() => setActivities([]))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-base font-bold font-display text-foreground">Recent Activity & Logs</h2>
        </div>
        <Badge variant="outline">{activities.length} EVENTS</Badge>
      </div>

      {isLoading ? (
        <div className="p-4 text-center text-xs text-muted-foreground">Loading activity logs...</div>
      ) : activities.length > 0 ? (
        <div className="space-y-3 text-xs">
          {activities.slice(0, 5).map((item) => (
            <div key={item.id} className="p-3 rounded-2xl bg-foreground/5 border border-border/40 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground flex items-center space-x-1.5">
                  {item.isPos ? (
                    <ArrowUpRight className="w-4 h-4 text-emerald-600 dark:text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600 dark:text-red-600 dark:text-red-400 shrink-0" />
                  )}
                  <span>{item.title}</span>
                </span>
                <span className="text-[10px] text-muted-foreground">{item.time}</span>
              </div>
              <p className="text-muted-foreground pl-5">{item.details}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-xs text-muted-foreground">No recent activity recorded</div>
      )}
    </GlassCard>
  );
};
