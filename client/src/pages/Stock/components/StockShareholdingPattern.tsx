import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { PieChart, ShieldCheck } from 'lucide-react';

export const StockShareholdingPattern: React.FC = () => {
  const shareholding = [
    { category: 'Promoters & Insiders', percentage: 48.5, color: '#10b981' },
    { category: 'Foreign Institutional (FII)', percentage: 24.2, color: '#3b82f6' },
    { category: 'Domestic Institutional (DII)', percentage: 14.8, color: '#8b5cf6' },
    { category: 'Public & Retail', percentage: 8.5, color: '#f59e0b' },
    { category: 'Others', percentage: 4.0, color: '#64748b' },
  ];

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center space-x-2 border-b border-white/10 pb-3">
        <PieChart className="w-5 h-5 text-blue-400" />
        <h2 className="text-base font-bold font-display text-white">Institutional & Promoter Shareholding Pattern</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Visual Stacked Progress Bar */}
        <div className="space-y-3">
          <span className="text-xs text-slate-400 font-bold uppercase">Equity Stake Breakdown</span>
          <div className="w-full h-4 rounded-full overflow-hidden flex space-x-0.5 bg-white/10 p-0.5">
            {shareholding.map((item) => (
              <div
                key={item.category}
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                className="h-full rounded-sm transition-all"
                title={`${item.category}: ${item.percentage}%`}
              />
            ))}
          </div>
          <div className="text-[11px] text-slate-400">
            Promoter pledges: <strong className="text-emerald-400 font-bold">0.00% Zero Pledged</strong>
          </div>
        </div>

        {/* Legend Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {shareholding.map((item) => (
            <div key={item.category} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 truncate">{item.category}</span>
              </div>
              <span className="font-bold text-white font-mono">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};
