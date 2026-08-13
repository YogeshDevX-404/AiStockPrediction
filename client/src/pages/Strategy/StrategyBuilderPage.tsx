import React, { useState } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { Select } from '@/components/inputs/Select';
import { useStrategyStore } from '@/store/useStrategyStore';
import { Sliders, Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const StrategyBuilderPage: React.FC = () => {
  const navigate = useNavigate();
  const { createStrategy } = useStrategyStore();

  const [name, setName] = useState('RSI & EMA Crossover Strategy');
  const [symbol, setSymbol] = useState('NVDA');
  const [timeframe, setTimeframe] = useState('1D');
  const [indicator, setIndicator] = useState('RSI');
  const [operator, setOperator] = useState('LESS_THAN');
  const [targetValue, setTargetValue] = useState('30');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await createStrategy({
      name,
      symbol: symbol.toUpperCase(),
      timeframe,
      rules: [{ id: 'r1', indicator, operator, targetValue, ruleType: 'ENTRY' }],
    });
    navigate('/strategy');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <Sliders className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">No-Code Visual Strategy Builder</h1>
          </div>
          <p className="text-xs text-slate-400">Configure Entry, Exit, and Risk rules with technical indicator conditions.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/strategy')}>
          Strategy Hub
        </Button>
      </div>

      <GlassCard className="p-6">
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-slate-400 font-bold">Strategy Title Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full glass-panel border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-slate-400 font-bold">Target Symbol</label>
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                className="w-full glass-panel border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none"
              />
            </div>

            <Select
              label="Timeframe"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              options={[
                { value: '15M', label: '15 Minutes' },
                { value: '1H', label: '1 Hour' },
                { value: '1D', label: '1 Day' },
                { value: '1W', label: '1 Week' },
              ]}
            />
          </div>

          {/* Condition Editor */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Entry Rule Condition</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Select
                label="Indicator"
                value={indicator}
                onChange={(e) => setIndicator(e.target.value as any)}
                options={[
                  { value: 'RSI', label: 'RSI Indicator' },
                  { value: 'EMA', label: 'EMA Moving Average' },
                  { value: 'MACD', label: 'MACD Signal' },
                  { value: 'VOLUME', label: 'Volume Ratio' },
                ]}
              />
              <Select
                label="Operator"
                value={operator}
                onChange={(e) => setOperator(e.target.value as any)}
                options={[
                  { value: 'LESS_THAN', label: 'Less Than (<)' },
                  { value: 'GREATER_THAN', label: 'Greater Than (>)' },
                  { value: 'CROSSES_ABOVE', label: 'Crosses Above' },
                  { value: 'CROSSES_BELOW', label: 'Crosses Below' },
                ]}
              />
              <div className="space-y-1">
                <label className="text-slate-400 font-bold">Target Value</label>
                <input
                  type="text"
                  value={targetValue}
                  onChange={(e) => setTargetValue(e.target.value)}
                  className="w-full glass-panel border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none"
                />
              </div>
            </div>
          </div>

          <Button type="submit" variant="accent" size="md" className="w-full" leftIcon={<Plus className="w-4 h-4" />}>
            Save Algorithmic Strategy Rule
          </Button>
        </form>
      </GlassCard>
    </div>
  );
};
