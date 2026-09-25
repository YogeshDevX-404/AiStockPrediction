import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { QuickTradeModal } from '@/components/modals/QuickTradeModal';
import { useWatchlistStore } from '@/store/useWatchlistStore';
import { formatCurrency } from '@/utils/cn';
import { Star } from 'lucide-react';

export const WatchlistWidget: React.FC = () => {
  const { items, fetchWatchlists } = useWatchlistStore();
  const [selectedStock, setSelectedStock] = useState<{ symbol: string; type: 'BUY' | 'SELL' } | null>(null);

  useEffect(() => {
    fetchWatchlists();
  }, [fetchWatchlists]);

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-amber-500 dark:text-amber-500 dark:text-amber-500 dark:text-amber-400" />
          <h2 className="text-base font-bold font-display text-foreground">Active Watchlist</h2>
        </div>
        <Badge variant="outline" className="border-border text-foreground">{items.length} TICKERS</Badge>
      </div>

      {items.length === 0 ? (
        <div className="p-6 text-center text-xs text-muted-foreground space-y-2 rounded-2xl bg-foreground/5 border border-border/50">
          <Star className="w-8 h-8 text-amber-500/40 dark:text-amber-500 dark:text-amber-500 dark:text-amber-400/40 mx-auto" />
          <p className="font-semibold text-foreground">Your watchlist is currently empty.</p>
          <p className="text-[11px] text-muted-foreground">Add stocks to your watchlist to monitor real-time prices and AI trading signals.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/50 text-muted-foreground uppercase">
              <tr>
                <th className="pb-3 font-semibold">Stock</th>
                <th className="pb-3 font-semibold">Price</th>
                <th className="pb-3 font-semibold">24H Change</th>
                <th className="pb-3 font-semibold">AI Signal</th>
                <th className="pb-3 font-semibold text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {items.map((stock) => {
                const isPos = stock.changePercent >= 0;
                return (
                  <tr key={stock.id} className="hover:bg-foreground/5 transition-colors">
                    <td className="py-3 font-extrabold text-foreground font-mono flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-lg bg-foreground/5 flex items-center justify-center text-[10px]">
                        {stock.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <div>{stock.symbol}</div>
                        <div className="text-[10px] text-muted-foreground font-sans font-normal">{stock.name}</div>
                      </div>
                    </td>
                    <td className="py-3 font-semibold text-foreground">{formatCurrency(stock.price)}</td>
                    <td className="py-3">
                      <span className={`font-bold ${isPos ? 'text-emerald-600 dark:text-emerald-600 dark:text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-600 dark:text-red-600 dark:text-red-400'}`}>
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
      )}

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
