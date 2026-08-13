import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { KeyStatistics } from '@/services/api/stocksApi';
import { formatCurrency } from '@/utils/cn';

export interface StockKeyStatisticsProps {
  stats: KeyStatistics;
}

export const StockKeyStatistics: React.FC<StockKeyStatisticsProps> = ({ stats }) => {
  const items = [
    { label: 'Market Cap', value: stats.marketCap },
    { label: 'P/E Ratio', value: stats.peRatio },
    { label: 'EPS (TTM)', value: `$${stats.eps}` },
    { label: 'Dividend Yield', value: `${stats.dividendYield}%` },
    { label: 'Beta (Volatility)', value: stats.beta },
    { label: 'ROE', value: `${stats.roe}%` },
    { label: 'ROCE', value: `${stats.roce}%` },
    { label: '52 Week High', value: formatCurrency(stats.fiftyTwoWeekHigh) },
    { label: '52 Week Low', value: formatCurrency(stats.fiftyTwoWeekLow) },
    { label: 'Book Value', value: formatCurrency(stats.bookValue) },
    { label: 'Face Value', value: formatCurrency(stats.faceValue) },
    { label: 'Enterprise Value', value: stats.enterpriseValue },
  ];

  return (
    <GlassCard className="space-y-4">
      <h2 className="text-base font-bold font-display text-white border-b border-white/10 pb-3">
        Key Financial Statistics
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
        {items.map((stat) => (
          <div key={stat.label} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase">{stat.label}</span>
            <div className="text-base font-extrabold text-white font-mono">{stat.value}</div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
