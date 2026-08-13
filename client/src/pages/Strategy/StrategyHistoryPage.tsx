import React, { useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { useStrategyStore } from '@/store/useStrategyStore';
import { History, ArrowLeft, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StrategyHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { strategies, fetchStrategies } = useStrategyStore();

  useEffect(() => {
    fetchStrategies();
  }, [fetchStrategies]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <History className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">Backtest History Audit & Multi-Strategy Comparison</h1>
          </div>
          <p className="text-xs text-slate-400">Benchmark multiple strategies across Sharpe Ratio, Win Rate, and Max Drawdown metrics.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/strategy')}>
          Strategy Hub
        </Button>
      </div>

      <GlassCard className="p-5 space-y-4">
        <h2 className="text-base font-bold text-white font-display border-b border-white/10 pb-3">Strategy Performance Matrix</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-white/10 text-slate-400 uppercase font-sans">
              <tr>
                <th className="pb-3 font-semibold">Strategy Name</th>
                <th className="pb-3 font-semibold">Symbol</th>
                <th className="pb-3 font-semibold">Win Rate (%)</th>
                <th className="pb-3 font-semibold">Sharpe Ratio</th>
                <th className="pb-3 font-semibold text-right font-sans">Net Return (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {strategies.map((s) => (
                <tr key={s.id} className="hover:bg-white/5">
                  <td className="py-3 font-bold text-white font-sans">{s.name}</td>
                  <td className="py-3 text-purple-300 font-bold">${s.symbol}</td>
                  <td className="py-3 text-emerald-400 font-bold">{s.winRate}%</td>
                  <td className="py-3 text-blue-400 font-bold">{s.sharpeRatio}</td>
                  <td className="py-3 text-right font-sans font-bold">
                    <Badge variant="emerald">+{s.netProfitPercent}%</Badge>
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
