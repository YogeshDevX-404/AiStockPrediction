import React, { useState } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { QuickTradeModal } from '@/components/modals/QuickTradeModal';
import { useWatchlistStore } from '@/store/useWatchlistStore';
import { formatCurrency } from '@/utils/cn';
import { Star, ShoppingCart, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

export const WatchlistWidget: React.FC = () => {
  const { items } = useWatchlistStore();
  const [selectedStock, setSelectedStock] = useState<{ symbol: string; type: 'BUY' | 'SELL' } | null>(null);

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold font-display text-white">Active Watchlist</h2>
        </div>
        <Badge variant="outline">{items.length} TICKERS</Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/10 text-slate-400 uppercase">
            <tr>
              <th className="pb-3 font-semibold">Stock</th>
              <th className="pb-3 font-semibold">Price</th>
              <th className="pb-3 font-semibold">24H Change</th>
              <th className="pb-3 font-semibold">AI Signal</th>
              <th className="pb-3 font-semibold text-right">Quick Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {items.map((stock) => {
              const isPos = stock.changePercent >= 0;
              return (
                <tr key={stock.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 font-extrabold text-white font-mono flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[10px]">
                      {stock.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div>{stock.symbol}</div>
                      <div className="text-[10px] text-slate-400 font-sans font-normal">{stock.name}</div>
                    </div>
                  </td>
                  <td className="py-3 font-semibold text-white">{formatCurrency(stock.price)}</td>
                  <td className="py-3">
                    <span className={`font-bold ${isPos ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isPos ? '+' : ''}{stock.changePercent}%
                    </span>
                  </td>
                  <td className="py-3">
                    <Badge variant={isPos ? 'emerald' : 'purple'}>
                      {isPos ? 'BUY SIGNAL' : 'ACCUMULATE'}
                    </Badge>
                  </td>
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="primary"
                        size="sm"
                        className="px-2.5 py-1 text-[11px]"
                        onClick={() => setSelectedStock({ symbol: stock.symbol, type: 'BUY' })}
                      >
                        Buy
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="px-2.5 py-1 text-[11px]"
                        onClick={() => setSelectedStock({ symbol: stock.symbol, type: 'SELL' })}
                      >
                        Sell
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedStock && (
        <QuickTradeModal
          isOpen={!!selectedStock}
          onClose={() => setSelectedStock(null)}
          symbol={selectedStock.symbol}
          defaultType={selectedStock.type}
        />
      )}
    </GlassCard>
  );
};
