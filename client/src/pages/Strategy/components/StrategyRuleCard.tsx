import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { StrategyDefinition } from '@/services/api/strategyApi';
import { Sliders, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface StrategyRuleCardProps {
  strategy: StrategyDefinition;
}

export const StrategyRuleCard: React.FC<StrategyRuleCardProps> = ({ strategy }) => {
  const navigate = useNavigate();

  return (
    <GlassCard className="p-5 space-y-4 hover:border-white/20 transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white font-display">{strategy.name}</h2>
            <p className="text-xs text-slate-400 font-mono">${strategy.symbol} • Timeframe: {strategy.timeframe}</p>
          </div>
        </div>

        <Badge variant="emerald">{strategy.winRate}% WIN RATE</Badge>
      </div>

      <p className="text-xs text-slate-300">{strategy.description}</p>

      <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono">
        <span className="text-emerald-400 font-extrabold">+{strategy.netProfitPercent}% Net Profit</span>
        <button
          onClick={() => navigate('/strategy/backtest')}
          className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 font-sans font-bold cursor-pointer"
        >
          <Play className="w-3.5 h-3.5" />
          <span>Run Backtest</span>
        </button>
      </div>
    </GlassCard>
  );
};
