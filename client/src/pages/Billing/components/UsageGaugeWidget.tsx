import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { UsageMeterItem } from '@/services/api/billingApi';
import { Activity } from 'lucide-react';

export interface UsageGaugeWidgetProps {
  meters: UsageMeterItem[];
}

export const UsageGaugeWidget: React.FC<UsageGaugeWidgetProps> = ({ meters }) => {
  return (
    <GlassCard className="p-5 space-y-4">
      <div className="flex items-center space-x-2 border-b border-border/50 pb-3">
        <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        <h2 className="text-base font-bold text-foreground font-display">Plan Resource Usage Consumed</h2>
      </div>

      <div className="space-y-4">
        {meters.map((m) => (
          <div key={m.metricKey} className="space-y-1 text-xs font-mono">
            <div className="flex justify-between items-center font-bold">
              <span className="text-foreground font-sans">{m.label}</span>
              <span className="text-purple-300">{m.consumed} / {m.limit} ({m.percentage}%)</span>
            </div>
            <div className="w-full bg-foreground/10 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-purple-500 to-amber-400"
                style={{ width: `${m.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
