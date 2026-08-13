import React, { useEffect } from 'react';
import { StrategyRuleCard } from './components/StrategyRuleCard';
import { useStrategyStore } from '@/store/useStrategyStore';
import { Button } from '@/components/buttons/Button';
import { Sliders, Plus, Play, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StrategyDashboardView: React.FC = () => {
  const navigate = useNavigate();
  const { strategies, fetchStrategies } = useStrategyStore();

  useEffect(() => {
    fetchStrategies();
  }, [fetchStrategies]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-card to-emerald-950/20">
        <div>
          <div className="flex items-center space-x-2">
            <Sliders className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">Strategy Builder & Backtesting Engine</h1>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              QUANT SIMULATOR ACTIVE
            </span>
          </div>
          <p className="text-xs text-slate-400">Design no-code algorithmic strategies, replay historical market data, and generate AI overfitting reports.</p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Button variant="accent" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => navigate('/strategy/builder')}>
            Build Strategy
          </Button>
          <Button variant="glass" size="sm" leftIcon={<Play className="w-4 h-4 text-purple-400" />} onClick={() => navigate('/strategy/backtest')}>
            Backtest Console
          </Button>
          <Button variant="glass" size="sm" leftIcon={<FileText className="w-4 h-4 text-emerald-400" />} onClick={() => navigate('/strategy/reports')}>
            Executive Report
          </Button>
        </div>
      </div>

      {/* Strategies List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {strategies.map((s) => (
          <StrategyRuleCard key={s.id} strategy={s} />
        ))}
      </div>
    </div>
  );
};
