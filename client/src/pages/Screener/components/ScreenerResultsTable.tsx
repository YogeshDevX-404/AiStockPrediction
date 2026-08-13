import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { ScreenerCandidate } from '@/services/api/screenerApi';
import { formatCurrency } from '@/utils/cn';
import { Sparkles, Plus, LineChart, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export interface ScreenerResultsTableProps {
  candidates: ScreenerCandidate[];
}

export const ScreenerResultsTable: React.FC<ScreenerResultsTableProps> = ({ candidates }) => {
  const navigate = useNavigate();

  const handleAddToWatchlist = (symbol: string) => {
    toast.success(`Added $${symbol} to active Watchlist!`);
  };

  return (
    <GlassCard className="space-y-4 p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <h2 className="text-base font-bold font-display text-white">Screening Match Candidates</h2>
          <p className="text-xs text-slate-400">Ranked by AI Conviction & Opportunity Scoring</p>
        </div>
        <Badge variant="emerald">{candidates.length} CANDIDATES MATCHED</Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="border-b border-white/10 text-slate-400 uppercase font-sans">
            <tr>
              <th className="pb-3 font-semibold">Ticker</th>
              <th className="pb-3 font-semibold">Price</th>
              <th className="pb-3 font-semibold">Volume</th>
              <th className="pb-3 font-semibold">RSI</th>
              <th className="pb-3 font-semibold">P/E Ratio</th>
              <th className="pb-3 font-semibold">AI Score</th>
              <th className="pb-3 font-semibold">Pattern</th>
              <th className="pb-3 font-semibold text-right font-sans">Quick Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {candidates.map((stock) => (
              <tr key={stock.symbol} className="hover:bg-white/5 transition-colors">
                <td className="py-3.5">
                  <div className="flex items-center space-x-2">
                    <span
                      className="font-black text-white text-sm cursor-pointer hover:text-emerald-400 transition-colors"
                      onClick={() => navigate(`/stocks/${stock.symbol}`)}
                    >
                      {stock.symbol}
                    </span>
                    <span className="text-[10px] text-slate-400 font-sans">{stock.sector}</span>
                  </div>
                </td>
                <td className="py-3.5 font-bold text-white">
                  {formatCurrency(stock.price)}
                  <span className={`ml-1 text-[11px] ${stock.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    ({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%)
                  </span>
                </td>
                <td className="py-3.5 text-slate-300 font-mono">{stock.volume}</td>
                <td className="py-3.5 text-purple-400 font-bold font-mono">{stock.rsi}</td>
                <td className="py-3.5 text-slate-300 font-mono">{stock.peRatio}</td>
                <td className="py-3.5">
                  <div className="flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span className="font-extrabold text-purple-300">{stock.opportunityScore}</span>
                  </div>
                </td>
                <td className="py-3.5 font-sans font-bold text-emerald-400 text-[11px]">{stock.patternMatch || 'Bullish Breakout'}</td>
                <td className="py-3.5 text-right space-x-2">
                  <button
                    onClick={() => handleAddToWatchlist(stock.symbol)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Add to Watchlist"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => navigate(`/stocks/${stock.symbol}`)}
                    className="p-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 transition-colors cursor-pointer"
                    title="Open Stock Details"
                  >
                    <LineChart className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};
