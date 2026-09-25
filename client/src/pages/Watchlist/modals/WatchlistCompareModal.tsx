import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/modals/Modal';
import { useComparisonStore } from '@/store/useComparisonStore';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { X, GitCompare } from 'lucide-react';
import { formatCurrency } from '@/utils/cn';
import { apiClient } from '@/api';

export interface WatchlistCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WatchlistCompareModal: React.FC<WatchlistCompareModalProps> = ({ isOpen, onClose }) => {
  const { selectedSymbols, removeSymbolFromCompare, clearComparison } = useComparisonStore();
  const [compareQuotes, setCompareQuotes] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && selectedSymbols.length > 0) {
      setIsLoading(true);
      Promise.all(
        selectedSymbols.map(async (sym) => {
          try {
            const res: any = await apiClient.get(`/market/quote/${sym}`);
            return { symbol: sym, quote: res?.data || null };
          } catch {
            return { symbol: sym, quote: null };
          }
        })
      ).then((results) => {
        const map: Record<string, any> = {};
        results.forEach((item) => {
          if (item.quote) map[item.symbol] = item.quote;
        });
        setCompareQuotes(map);
        setIsLoading(false);
      });
    }
  }, [isOpen, selectedSymbols]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Side-by-Side Stock Matrix Comparison">
      <div className="space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Comparing {selectedSymbols.length} Selected Tickers</span>
          <Button variant="ghost" size="sm" onClick={clearComparison} leftIcon={<X className="w-3.5 h-3.5" />}>
            Clear Comparison
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-border/50 text-muted-foreground uppercase font-mono">
              <tr>
                <th className="pb-3">Metric</th>
                {selectedSymbols.map((sym) => (
                  <th key={sym} className="pb-3 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <span className="text-foreground font-extrabold">{sym}</span>
                      <button onClick={() => removeSymbolFromCompare(sym)} className="text-muted-foreground hover:text-red-600 dark:text-red-400 cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              <tr>
                <td className="py-3 text-muted-foreground font-sans font-bold">Current Price</td>
                {selectedSymbols.map((sym) => (
                  <td key={sym} className="py-3 text-center text-foreground font-bold">
                    {compareQuotes[sym]?.price ? formatCurrency(compareQuotes[sym].price) : 'N/A'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-muted-foreground font-sans font-bold">24H Change</td>
                {selectedSymbols.map((sym) => (
                  <td key={sym} className={`py-3 text-center font-bold ${compareQuotes[sym]?.changePercent >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                    {compareQuotes[sym]?.changePercent != null ? `${compareQuotes[sym].changePercent > 0 ? '+' : ''}${compareQuotes[sym].changePercent}%` : 'N/A'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-muted-foreground font-sans font-bold">Market Cap</td>
                {selectedSymbols.map((sym) => (
                  <td key={sym} className="py-3 text-center text-slate-200">
                    {compareQuotes[sym]?.marketCap || 'N/A'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-muted-foreground font-sans font-bold">Open Price</td>
                {selectedSymbols.map((sym) => (
                  <td key={sym} className="py-3 text-center text-slate-200">
                    {compareQuotes[sym]?.open ? formatCurrency(compareQuotes[sym].open) : 'N/A'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-muted-foreground font-sans font-bold">High / Low</td>
                {selectedSymbols.map((sym) => (
                  <td key={sym} className="py-3 text-center text-slate-200">
                    {compareQuotes[sym]?.high ? `${formatCurrency(compareQuotes[sym].high)} / ${formatCurrency(compareQuotes[sym].low)}` : 'N/A'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-muted-foreground font-sans font-bold">Sector</td>
                {selectedSymbols.map((sym) => (
                  <td key={sym} className="py-3 text-center text-slate-200 font-sans">
                    {compareQuotes[sym]?.sector || 'N/A'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
};
