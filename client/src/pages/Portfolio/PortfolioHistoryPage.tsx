import React, { useState } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { Badge } from '@/components/ui/Badge';
import { useTransactionStore } from '@/store/useTransactionStore';
import { formatCurrency } from '@/utils/cn';
import { Search, Download, History, ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const PortfolioHistoryPage: React.FC = () => {
  const { transactions } = useTransactionStore();
  const [search, setSearch] = useState('');

  const filtered = transactions.filter(
    (tx) => tx.symbol.toLowerCase().includes(search.toLowerCase()) || tx.broker.toLowerCase().includes(search.toLowerCase())
  );

  const handleExportCSV = () => {
    const headers = 'ID,Symbol,Type,Quantity,Price,TotalAmount,Broker,Timestamp\n';
    const rows = filtered
      .map(
        (t) => `${t.id},${t.symbol},${t.type},${t.quantity},${t.price},${t.totalAmount},${t.broker},${t.timestamp}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tradegenius-portfolio-history-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('Exported transaction log to CSV file!');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <History className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-black font-display text-white">Portfolio Transaction Log</h1>
          </div>
          <p className="text-xs text-slate-400">Complete historical audit log of trades, dividends, splits, and bonuses.</p>
        </div>

        <Button variant="primary" size="md" leftIcon={<Download className="w-4 h-4" />} onClick={handleExportCSV}>
          Export to CSV
        </Button>
      </div>

      <GlassCard className="space-y-4">
        {/* Search */}
        <div className="relative flex-1 glass-panel border border-white/10 rounded-xl px-3 py-2 flex items-center">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search log by symbol, broker..."
            className="w-full bg-transparent text-xs text-white placeholder:text-slate-500 focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/10 text-slate-400 uppercase">
              <tr>
                <th className="pb-3 font-semibold">Symbol</th>
                <th className="pb-3 font-semibold">Type</th>
                <th className="pb-3 font-semibold">Shares</th>
                <th className="pb-3 font-semibold">Price ($)</th>
                <th className="pb-3 font-semibold">Total Amount</th>
                <th className="pb-3 font-semibold">Broker</th>
                <th className="pb-3 font-semibold text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/5">
                  <td className="py-3 font-bold text-white">{tx.symbol}</td>
                  <td className="py-3">
                    <Badge variant={tx.type === 'BUY' ? 'emerald' : tx.type === 'SELL' ? 'red' : 'purple'}>
                      {tx.type}
                    </Badge>
                  </td>
                  <td className="py-3 text-slate-200">{tx.quantity}</td>
                  <td className="py-3 text-slate-200">{formatCurrency(tx.price)}</td>
                  <td className="py-3 font-bold text-white">{formatCurrency(tx.totalAmount)}</td>
                  <td className="py-3 text-slate-400 font-sans">{tx.broker}</td>
                  <td className="py-3 text-right text-slate-400 font-sans">
                    {new Date(tx.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
