import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { mockEconomicEvents } from '@/services/mock/mockMarketService';
import { Calendar, AlertCircle } from 'lucide-react';

export const EconomicCalendarWidget: React.FC = () => {
  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold font-display text-white">Economic Calendar</h2>
        </div>
        <Badge variant="emerald">HIGH IMPACT</Badge>
      </div>

      <div className="space-y-3 text-xs">
        {mockEconomicEvents.map((event) => (
          <div key={event.id} className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center space-x-1.5">
                <span>{event.flag}</span>
                <span>{event.title}</span>
              </span>
              <Badge variant={event.impact === 'HIGH' ? 'red' : 'amber'} className="text-[9px]">
                {event.impact} IMPACT
              </Badge>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>{event.date}</span>
              <div className="space-x-2 font-mono">
                <span>Forecast: <strong className="text-white">{event.forecast}</strong></span>
                <span>Prev: <strong className="text-slate-300">{event.previous}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
