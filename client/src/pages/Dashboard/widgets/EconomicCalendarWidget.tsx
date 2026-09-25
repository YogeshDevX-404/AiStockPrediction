import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Calendar, AlertCircle } from 'lucide-react';
import { apiClient } from '@/api';

export const EconomicCalendarWidget: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/market/economic-calendar')
      .then((res: any) => setEvents(res.data || []))
      .catch(() => setEvents([]))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-amber-500 dark:text-amber-500 dark:text-amber-400" />
          <h2 className="text-base font-bold font-display text-foreground">Economic Calendar</h2>
        </div>
        <Badge variant="emerald">MACRO EVENTS</Badge>
      </div>

      {isLoading ? (
        <div className="p-4 text-center text-xs text-muted-foreground">Loading economic events...</div>
      ) : events.length > 0 ? (
        <div className="space-y-3 text-xs">
          {events.map((event) => (
            <div key={event.id} className="p-3 rounded-2xl bg-foreground/5 border border-border/40 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-foreground flex items-center space-x-1.5">
                  <span>{event.flag || '🌐'}</span>
                  <span>{event.title}</span>
                </span>
                <Badge variant={event.impact === 'HIGH' ? 'red' : 'amber'} className="text-[9px]">
                  {event.impact || 'MEDIUM'} IMPACT
                </Badge>
              </div>

              <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                <span>{event.date}</span>
                <div className="space-x-2 font-mono">
                  <span>Forecast: <strong className="text-foreground">{event.forecast || 'N/A'}</strong></span>
                  <span>Prev: <strong className="text-muted-foreground">{event.previous || 'N/A'}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-foreground/5 text-xs text-muted-foreground flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-500 dark:text-amber-500 dark:text-amber-400 shrink-0" />
          <span>Economic calendar feed unconfigured. Set market provider credentials in backend <code className="text-amber-300">.env</code> file.</span>
        </div>
      )}
    </GlassCard>
  );
};
