import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { AnalystRatingsResponse } from '@/services/api/stocksApi';
import { formatCurrency } from '@/utils/cn';
import { Target, Users } from 'lucide-react';

export interface StockAnalystRatingsProps {
  ratings: AnalystRatingsResponse;
}

export const StockAnalystRatings: React.FC<StockAnalystRatingsProps> = ({ ratings }) => {
  const totalAnalysts = ratings.strongBuy + ratings.buy + ratings.hold + ratings.sell + ratings.strongSell;

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-emerald-400" />
          <h2 className="text-base font-bold font-display text-white">Wall Street Analyst Recommendations</h2>
        </div>
        <Badge variant="emerald">{ratings.consensusRating}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Side: Rating Bars */}
        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between items-center text-slate-300">
            <span>Strong Buy ({ratings.strongBuy})</span>
            <div className="w-48 bg-white/10 h-2 rounded-full overflow-hidden ml-2">
              <div className="bg-emerald-500 h-full" style={{ width: `${(ratings.strongBuy / totalAnalysts) * 100}%` }} />
            </div>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span>Buy ({ratings.buy})</span>
            <div className="w-48 bg-white/10 h-2 rounded-full overflow-hidden ml-2">
              <div className="bg-blue-500 h-full" style={{ width: `${(ratings.buy / totalAnalysts) * 100}%` }} />
            </div>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span>Hold ({ratings.hold})</span>
            <div className="w-48 bg-white/10 h-2 rounded-full overflow-hidden ml-2">
              <div className="bg-amber-500 h-full" style={{ width: `${(ratings.hold / totalAnalysts) * 100}%` }} />
            </div>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span>Sell ({ratings.sell})</span>
            <div className="w-48 bg-white/10 h-2 rounded-full overflow-hidden ml-2">
              <div className="bg-red-500 h-full" style={{ width: `${(ratings.sell / totalAnalysts) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Right Side: Consensus Target */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 text-center">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Consensus 12-Month Price Target</div>
          <div className="text-3xl font-black text-emerald-400 font-display">{formatCurrency(ratings.targetPrice)}</div>
          <p className="text-xs text-slate-300">Based on 49 Wall Street analyst price projections</p>
        </div>
      </div>
    </GlassCard>
  );
};
