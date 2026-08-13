import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { DollarSign, Calendar } from 'lucide-react';
import { formatCurrency } from '@/utils/cn';

export const DividendTrackerWidget: React.FC = () => {
  const dividends = [
    { symbol: 'NVDA', amount: 2.00, exDate: '2026-06-10', payDate: '2026-06-25', status: 'PAID' },
    { symbol: 'AAPL', amount: 7.20, exDate: '2026-05-12', payDate: '2026-05-28', status: 'PAID' },
    { symbol: 'RELIANCE', amount: 40.00, exDate: '2026-08-15', payDate: '2026-08-30', status: 'UPCOMING' },
  ];

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold font-display text-white">Dividend Tracker & Passive Income</h2>
        </div>
        <Badge variant="emerald">EST YIELD 1.2%</Badge>
      </div>

      <div className="space-y-2.5 text-xs">
        {dividends.map((div, idx) => (
          <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 font-mono font-bold flex items-center justify-center text-xs">
                {div.symbol.slice(0, 2)}
              </div>
              <div>
                <div className="font-bold text-white font-mono">{div.symbol}</div>
                <div className="text-[10px] text-slate-400">Pay Date: {div.payDate}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-emerald-400 font-mono">+{formatCurrency(div.amount)}</div>
              <Badge variant={div.status === 'PAID' ? 'emerald' : 'amber'} className="text-[9px]">
                {div.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
