import React, { useState } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { Dropdown } from '@/components/ui/Dropdown';
import { HoldingItem } from '@/services/api/portfolioApi';
import { formatCurrency, formatPercent } from '@/utils/cn';
import { Search, Plus, Edit, Trash2, LineChart, ShoppingCart, ArrowUpDown, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface HoldingsTableProps {
  holdings: HoldingItem[];
  onOpenAddModal: () => void;
  onEditHolding: (holding: HoldingItem) => void;
  onDeleteHolding: (holding: HoldingItem) => void;
}

export const HoldingsTable: React.FC<HoldingsTableProps> = ({
  holdings,
  onOpenAddModal,
  onEditHolding,
  onDeleteHolding,
}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<'totalValue' | 'profitPercent' | 'changePercent'>('totalValue');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const filtered = holdings.filter(
    (h) =>
      h.symbol.toLowerCase().includes(search.toLowerCase()) ||
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.broker.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    return sortDir === 'asc' ? valA - valB : valB - valA;
  });

  const toggleSort = (field: 'totalValue' | 'profitPercent' | 'changePercent') => {
    if (sortField === field) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  return (
    <GlassCard className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <h2 className="text-base font-bold font-display text-white">Portfolio Holdings</h2>
          <Badge variant="outline">{sorted.length} ASSETS</Badge>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Search Bar */}
          <div className="relative flex-1 sm:w-64 glass-panel border border-white/10 rounded-xl px-3 py-1.5 flex items-center">
            <Search className="w-3.5 h-3.5 text-slate-400 mr-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by symbol, name, broker..."
              className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none"
            />
          </div>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={onOpenAddModal}
          >
            Add Holding
          </Button>
        </div>
      </div>

      {/* Table View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-white/10 text-slate-400 uppercase select-none">
            <tr>
              <th className="pb-3 font-semibold">Asset</th>
              <th className="pb-3 font-semibold">Shares</th>
              <th className="pb-3 font-semibold">Avg Buy</th>
              <th className="pb-3 font-semibold">Current Price</th>
              <th className="pb-3 font-semibold cursor-pointer" onClick={() => toggleSort('changePercent')}>
                <div className="flex items-center space-x-1">
                  <span>24h Change</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="pb-3 font-semibold cursor-pointer" onClick={() => toggleSort('totalValue')}>
                <div className="flex items-center space-x-1">
                  <span>Total Value</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="pb-3 font-semibold cursor-pointer" onClick={() => toggleSort('profitPercent')}>
                <div className="flex items-center space-x-1">
                  <span>Profit / Loss</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="pb-3 font-semibold">AI Signal</th>
              <th className="pb-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sorted.map((item) => {
              const isPos = item.profit >= 0;
              const dayPos = item.changePercent >= 0;

              return (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td
                    className="py-3 font-extrabold text-white font-mono flex items-center space-x-2.5 cursor-pointer"
                    onClick={() => navigate(`/stocks/${item.symbol}`)}
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">
                      {item.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="hover:text-emerald-400 transition-colors">{item.symbol}</div>
                      <div className="text-[10px] text-slate-400 font-sans font-normal truncate max-w-[120px]">
                        {item.name} • {item.broker}
                      </div>
                    </div>
                  </td>

                  <td className="py-3 font-bold text-white font-mono">{item.quantity}</td>
                  <td className="py-3 font-semibold text-slate-300 font-mono">{formatCurrency(item.avgBuyPrice)}</td>
                  <td className="py-3 font-semibold text-white font-mono">{formatCurrency(item.currentPrice)}</td>
                  <td className="py-3 font-bold">
                    <span className={dayPos ? 'text-emerald-400' : 'text-red-400'}>
                      {dayPos ? '+' : ''}{item.changePercent}%
                    </span>
                  </td>
                  <td className="py-3 font-black text-white font-mono">{formatCurrency(item.totalValue)}</td>
                  <td className="py-3">
                    <div className={`font-bold ${isPos ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isPos ? '+' : ''}{formatCurrency(item.profit)} ({formatPercent(item.profitPercent)})
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge variant={item.signal === 'BUY' ? 'emerald' : 'purple'}>{item.signal}</Badge>
                  </td>
                  <td className="py-3 text-right">
                    <Dropdown
                      trigger={
                        <button className="px-2.5 py-1 rounded-xl glass-panel hover:bg-white/10 text-xs font-bold text-slate-300 cursor-pointer">
                          Options
                        </button>
                      }
                      items={[
                        { label: 'View Interactive Chart', icon: <LineChart className="w-4 h-4 text-blue-400" />, onClick: () => navigate(`/stocks/${item.symbol}`) },
                        { label: 'Edit Position', icon: <Edit className="w-4 h-4 text-purple-400" />, onClick: () => onEditHolding(item) },
                        { label: 'Delete Position', icon: <Trash2 className="w-4 h-4 text-red-400" />, onClick: () => onDeleteHolding(item), danger: true },
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
