import React from 'react';
import { Modal } from '@/components/modals/Modal';
import { useComparisonStore } from '@/store/useComparisonStore';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { X, GitCompare } from 'lucide-react';
import { formatCurrency } from '@/utils/cn';

export interface WatchlistCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WatchlistCompareModal: React.FC<WatchlistCompareModalProps> = ({ isOpen, onClose }) => {
  const { selectedSymbols, removeSymbolFromCompare, clearComparison } = useComparisonStore();

  const mockCompareDetails: Record<string, any> = {
    NVDA: { price: 132.40, change: '+3.45%', marketCap: '$3.25T', pe: 72.4, rsi: 64.2, volume: '48.2M', signal: 'BUY' },
    AAPL: { price: 224.50, change: '+1.84%', marketCap: '$3.44T', pe: 34.2, rsi: 58.4, volume: '38.4M', signal: 'ACCUMULATE' },
    TSLA: { price: 248.60, change: '+4.25%', marketCap: '$792B', pe: 64.8, rsi: 71.5, volume: '62.1M', signal: 'BUY' },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Side-by-Side Stock Matrix Comparison">
      <div className="space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Comparing {selectedSymbols.length} Selected Tickers</span>
          <Button variant="ghost" size="sm" onClick={clearComparison} leftIcon={<X className="w-3.5 h-3.5" />}>
            Clear Comparison
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-white/10 text-slate-400 uppercase font-mono">
              <tr>
                <th className="pb-3">Metric</th>
                {selectedSymbols.map((sym) => (
                  <th key={sym} className="pb-3 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <span className="text-white font-extrabold">{sym}</span>
                      <button onClick={() => removeSymbolFromCompare(sym)} className="text-slate-500 hover:text-red-400 cursor-pointer">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              <tr>
                <td className="py-3 text-slate-400 font-sans font-bold">Current Price</td>
                {selectedSymbols.map((sym) => (
                  <td key={sym} className="py-3 text-center text-white font-bold">
                    {formatCurrency(mockCompareDetails[sym]?.price || 150)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-slate-400 font-sans font-bold">24H Change</td>
                {selectedSymbols.map((sym) => (
                  <td key={sym} className="py-3 text-center text-emerald-400 font-bold">
                    {mockCompareDetails[sym]?.change || '+2.5%'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-slate-400 font-sans font-bold">Market Cap</td>
                {selectedSymbols.map((sym) => (
                  <td key={sym} className="py-3 text-center text-slate-200">
                    {mockCompareDetails[sym]?.marketCap || '$100B'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-slate-400 font-sans font-bold">P/E Ratio</td>
                {selectedSymbols.map((sym) => (
                  <td key={sym} className="py-3 text-center text-purple-400">
                    {mockCompareDetails[sym]?.pe || 25.0}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-slate-400 font-sans font-bold">RSI (14)</td>
                {selectedSymbols.map((sym) => (
                  <td key={sym} className="py-3 text-center text-blue-400">
                    {mockCompareDetails[sym]?.rsi || 50.0}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 text-slate-400 font-sans font-bold">AI Signal</td>
                {selectedSymbols.map((sym) => (
                  <td key={sym} className="py-3 text-center">
                    <Badge variant="emerald">{mockCompareDetails[sym]?.signal || 'BUY'}</Badge>
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
