import React, { useState } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { Dropdown } from '@/components/ui/Dropdown';
import { SmartWatchlistItem } from '@/services/api/watchlistApi';
import { formatCurrency, formatPercent } from '@/utils/cn';
import { Search, Plus, Trash2, LineChart, Bell, GitCompare, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useComparisonStore } from '@/store/useComparisonStore';
import { toast } from 'react-hot-toast';

export interface SmartWatchlistTableProps {
  items: SmartWatchlistItem[];
  onOpenSearchModal: () => void;
  onDeleteItem: (id: string) => void;
  onOpenCompareModal: () => void;
  onOpenAlertDrawer: (symbol: string) => void;
}

export const SmartWatchlistTable: React.FC<SmartWatchlistTableProps> = ({
  items,
  onOpenSearchModal,
  onDeleteItem,
  onOpenCompareModal,
  onOpenAlertDrawer,
}) => {
  const navigate = useNavigate();
  const { addSymbolToCompare } = useComparisonStore();
  const [search, setSearch] = useState('');

  const filtered = items.filter(
    (i) =>
      i.symbol.toLowerCase().includes(search.toLowerCase()) ||
      i.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCompareAdd = (symbol: string) => {
    addSymbolToCompare(symbol);
    onOpenCompareModal();
  };

  return (
    <GlassCard className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/50 pb-3">
        <div className="flex items-center space-x-2">
          <h2 className="text-base font-bold font-display text-foreground">Smart Watchlist Monitor</h2>
          <Badge variant="outline">{filtered.length} WATCHING</Badge>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Search Filter */}
          <div className="relative flex-1 sm:w-64 glass-panel border border-border/50 rounded-xl px-3 py-1.5 flex items-center">
            <Search className="w-3.5 h-3.5 text-muted-foreground mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search watchlist symbols..."
              className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={onOpenSearchModal}
          >
            Add Stock
          </Button>
        </div>
      </div>

      {/* Watchlist Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-border/50 text-muted-foreground uppercase select-none">
            <tr>
              <th className="pb-3 font-semibold">Stock Ticker</th>
              <th className="pb-3 font-semibold">Price</th>
              <th className="pb-3 font-semibold">24h Change</th>
              <th className="pb-3 font-semibold">Mini Trend</th>
              <th className="pb-3 font-semibold">AI Prediction</th>
              <th className="pb-3 font-semibold">Confidence</th>
              <th className="pb-3 font-semibold">RSI (14)</th>
              <th className="pb-3 font-semibold">MACD</th>
              <th className="pb-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((item) => {
              const isPos = item.changePercent >= 0;
              return (
                <tr key={item.id} className="hover:bg-foreground/5 transition-colors">
                  {/* Symbol / Logo */}
                  <td
                    className="py-3 font-extrabold text-foreground font-mono flex items-center space-x-2.5 cursor-pointer"
                    onClick={() => navigate(`/stocks/${item.symbol}`)}
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-purple-500/20 border border-border/50 flex items-center justify-center text-xs font-bold text-foreground shrink-0">
                      {item.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="hover:text-emerald-600 dark:text-emerald-400 transition-colors flex items-center space-x-1">
                        <span>{item.symbol}</span>
                        {item.hasActiveAlert && <Bell className="w-3 h-3 text-amber-500 dark:text-amber-400 fill-amber-400" />}
                      </div>
                      <div className="text-[10px] text-muted-foreground font-sans font-normal truncate max-w-[110px]">
                        {item.name}
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-3 font-bold text-foreground font-mono">{formatCurrency(item.price)}</td>

                  {/* Change */}
                  <td className="py-3 font-bold">
                    <span className={isPos ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}>
                      {isPos ? '+' : ''}{item.changePercent}%
                    </span>
                  </td>

                  {/* Sparkline Mini Chart */}
                  <td className="py-3 w-24">
                    <div className="h-6 w-20">
                      <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                        <path
                          d={`M0,${30 - item.sparkline[0] / 10} L20,${30 - item.sparkline[1] / 10} L40,${
                            30 - item.sparkline[2] / 10
                          } L60,${30 - item.sparkline[3] / 10} L80,${30 - item.sparkline[4] / 10} L100,${
                            30 - item.sparkline[5] / 10
                          }`}
                          fill="none"
                          stroke={isPos ? '#10b981' : '#ef4444'}
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  </td>

                  {/* AI Signal */}
                  <td className="py-3">
                    <Badge variant={item.signal === 'BUY' ? 'emerald' : 'purple'}>{item.signal}</Badge>
                  </td>

                  {/* Confidence */}
                  <td className="py-3 font-extrabold text-purple-600 dark:text-purple-400 font-display">{item.confidence}%</td>

                  {/* RSI */}
                  <td className="py-3 font-mono font-semibold text-muted-foreground">{item.rsi}</td>

                  {/* MACD */}
                  <td className="py-3">
                    <span className={`font-bold ${item.macdStatus === 'BULLISH_CROSS' ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'}`}>
                      {item.macdStatus.replace('_', ' ')}
                    </span>
                  </td>

                  {/* Actions Dropdown */}
                  <td className="py-3 text-right">
                    <Dropdown
                      trigger={
                        <button className="px-2.5 py-1 rounded-xl glass-panel hover:bg-foreground/10 text-xs font-bold text-muted-foreground cursor-pointer">
                          Options
                        </button>
                      }
                      items={[
                        { label: 'View Interactive Chart', icon: <LineChart className="w-4 h-4 text-blue-400" />, onClick: () => navigate(`/stocks/${item.symbol}`) },
                        { label: 'Set Price Alert', icon: <Bell className="w-4 h-4 text-purple-600 dark:text-purple-400" />, onClick: () => onOpenAlertDrawer(item.symbol) },
                        { label: 'Compare Matrix', icon: <GitCompare className="w-4 h-4 text-amber-500 dark:text-amber-400" />, onClick: () => handleCompareAdd(item.symbol) },
                        { label: 'Remove from Watchlist', icon: <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />, onClick: () => onDeleteItem(item.id), danger: true },
                      ]}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};
