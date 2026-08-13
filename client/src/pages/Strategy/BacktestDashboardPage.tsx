import React from 'react';
import { EquityCurveWidget } from './components/EquityCurveWidget';
import { BacktestPerformanceCard } from './components/BacktestPerformanceCard';
import { useBacktestStore } from '@/store/useBacktestStore';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { Play, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BacktestDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentRun, isRunning, runBacktest } = useBacktestStore();

  const handleRun = async () => {
    await runBacktest('strat-1', 10000.0);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <Play className="w-6 h-6 text-emerald-400" />
            <h1 className="text-2xl font-black font-display text-white">Historical Backtest Simulation Dashboard</h1>
          </div>
          <p className="text-xs text-slate-400">Bar-by-bar price replay simulation with slippage, transaction costs, and drawdown metrics.</p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="accent" size="sm" isLoading={isRunning} leftIcon={<Play className="w-4 h-4" />} onClick={handleRun}>
            Run Backtest Simulation
          </Button>
          <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/strategy')}>
            Strategy Hub
          </Button>
        </div>
      </div>

      <BacktestPerformanceCard run={currentRun} />
      <EquityCurveWidget curve={currentRun.equityCurve} />

      {/* Trade List Table */}
      <GlassCard className="p-5 space-y-4">
        <h2 className="text-base font-bold text-white font-display border-b border-white/10 pb-3">Simulated Backtest Executed Trade List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-white/10 text-slate-400 uppercase font-sans">
              <tr>
                <th className="pb-3 font-semibold">Symbol</th>
                <th className="pb-3 font-semibold">Side</th>
                <th className="pb-3 font-semibold">Entry Date / Price</th>
                <th className="pb-3 font-semibold">Exit Date / Price</th>
                <th className="pb-3 font-semibold">Trigger Reason</th>
                <th className="pb-3 font-semibold text-right font-sans">Realized P&L</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {currentRun.trades.map((t) => (
                <tr key={t.id} className="hover:bg-white/5">
                  <td className="py-3 font-bold text-white">${t.symbol}</td>
                  <td className="py-3 font-sans">
                    <Badge variant={t.side === 'BUY' ? 'emerald' : 'red'}>{t.side}</Badge>
                  </td>
                  <td className="py-3 text-slate-300">{t.entryDate} @ ${t.entryPrice}</td>
                  <td className="py-3 text-slate-300">{t.exitDate} @ ${t.exitPrice}</td>
                  <td className="py-3 text-purple-300 font-sans font-bold">{t.reason}</td>
                  <td className="py-3 text-right font-sans font-bold">
                    <Badge variant="emerald">+${t.pnl} (+{t.pnlPercent}%)</Badge>
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
