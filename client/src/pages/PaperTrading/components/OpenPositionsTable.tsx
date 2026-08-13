import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/utils/cn';

export const OpenPositionsTable: React.FC = () => {
  const positions = [
    { id: 'pos-1', symbol: 'NVDA', quantity: 20, avgBuyPrice: 110.0, currentPrice: 135.5, value: 2710.0, pnl: 510.0, pnlPercent: 23.18 },
    { id: 'pos-2', symbol: 'TSLA', quantity: 15, avgBuyPrice: 210.0, currentPrice: 248.6, value: 3729.0, pnl: 579.0, pnlPercent: 18.38 },
  ];

  return (
    <GlassCard className="p-5 space-y-4">
      <h2 className="text-base font-bold text-white font-display border-b border-white/10 pb-3">Open Virtual Positions</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="border-b border-white/10 text-slate-400 uppercase font-sans">
            <tr>
              <th className="pb-3 font-semibold">Symbol</th>
              <th className="pb-3 font-semibold">Qty</th>
              <th className="pb-3 font-semibold">Avg Price</th>
              <th className="pb-3 font-semibold">Current Price</th>
              <th className="pb-3 font-semibold text-right font-sans">Unrealized P&L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {positions.map((pos) => (
              <tr key={pos.id} className="hover:bg-white/5">
                <td className="py-3 font-bold text-white">${pos.symbol}</td>
                <td className="py-3 text-slate-300">{pos.quantity}</td>
                <td className="py-3 text-slate-300">{formatCurrency(pos.avgBuyPrice)}</td>
                <td className="py-3 text-white font-bold">{formatCurrency(pos.currentPrice)}</td>
                <td className="py-3 text-right font-sans font-bold">
                  <Badge variant="emerald">+{formatCurrency(pos.pnl)} (+{pos.pnlPercent}%)</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};
