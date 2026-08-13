import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { PieChart } from 'lucide-react';

export const SectorAllocationWidget: React.FC = () => {
  const sectors = [
    { sector: 'Technology & Semiconductors', percentage: 42, color: '#10b981' },
    { sector: 'Consumer Electronics', percentage: 28, color: '#3b82f6' },
    { sector: 'Automotive & EV', percentage: 18, color: '#8b5cf6' },
    { sector: 'Energy & Oil', percentage: 12, color: '#f59e0b' },
  ];

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
        <PieChart className="w-5 h-5 text-purple-400" />
        <h2 className="text-base font-bold font-display text-white">Sector Allocation</h2>
      </div>

      <div className="space-y-3 text-xs">
        <div className="w-full h-3 rounded-full overflow-hidden flex space-x-0.5 bg-white/10 p-0.5">
          {sectors.map((s) => (
            <div
              key={s.sector}
              style={{ width: `${s.percentage}%`, backgroundColor: s.color }}
              className="h-full rounded-sm"
              title={`${s.sector}: ${s.percentage}%`}
            />
          ))}
        </div>

        <div className="space-y-2 pt-1">
          {sectors.map((s) => (
            <div key={s.sector} className="flex justify-between items-center text-slate-300">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="truncate">{s.sector}</span>
              </div>
              <span className="font-bold text-white font-mono">{s.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};
