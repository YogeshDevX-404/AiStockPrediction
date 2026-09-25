import React, { useState } from 'react';
import { ProbabilisticForecastWidget } from './components/ProbabilisticForecastWidget';
import { FeatureImportanceWidget } from './components/FeatureImportanceWidget';
import { useInferenceStore } from '@/store/useInferenceStore';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { Select } from '@/components/inputs/Select';
import { Play, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const InferencePage: React.FC = () => {
  const navigate = useNavigate();
  const { forecast, shap, isLoading, runInference } = useInferenceStore();

  const [symbol, setSymbol] = useState('NVDA');
  const [timeframe, setTimeframe] = useState('1D');

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    await runInference(symbol.toUpperCase(), timeframe);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-border/50">
        <div>
          <div className="flex items-center space-x-2">
            <Play className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h1 className="text-2xl font-black font-display text-foreground">Probabilistic Inference & Prediction Workspace</h1>
          </div>
          <p className="text-xs text-muted-foreground">Generate multi-horizon statistical probability forecasts with 95% confidence intervals.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/ml')}>
          MLOps Dashboard
        </Button>
      </div>

      <GlassCard className="p-6">
        <form onSubmit={handlePredict} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1">
            <label className="text-muted-foreground font-bold">Stock Symbol Ticker</label>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              className="w-full glass-panel border border-border/50 rounded-xl px-3 py-2 text-foreground font-mono placeholder:text-muted-foreground focus:outline-none"
            />
          </div>

          <Select
            label="Prediction Horizon Timeframe"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            options={[
              { value: '15M', label: '15 Minutes Horizon' },
              { value: '1H', label: '1 Hour Horizon' },
              { value: '4H', label: '4 Hours Horizon' },
              { value: '1D', label: '1 Day Horizon' },
              { value: '1W', label: '1 Week Horizon' },
            ]}
          />

          <div className="flex items-end">
            <Button type="submit" variant="primary" size="md" className="w-full" isLoading={isLoading} leftIcon={<Play className="w-4 h-4" />}>
              Run Batch Inference
            </Button>
          </div>
        </form>
      </GlassCard>

      <ProbabilisticForecastWidget forecast={forecast} />
      <FeatureImportanceWidget shap={shap} />
    </div>
  );
};
