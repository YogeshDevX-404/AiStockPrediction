import React, { useEffect } from 'react';
import { ModelCard } from './components/ModelCard';
import { ProbabilisticForecastWidget } from './components/ProbabilisticForecastWidget';
import { FeatureImportanceWidget } from './components/FeatureImportanceWidget';
import { useModelStore } from '@/store/useModelStore';
import { useInferenceStore } from '@/store/useInferenceStore';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { Cpu, Play, Layers, Activity, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MLDashboardView: React.FC = () => {
  const navigate = useNavigate();
  const { models, fetchModels } = useModelStore();
  const { forecast, shap, runInference } = useInferenceStore();

  useEffect(() => {
    fetchModels();
    runInference('NVDA', '1D');
  }, [fetchModels, runInference]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-card to-emerald-950/20">
        <div>
          <div className="flex items-center space-x-2">
            <Cpu className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-black font-display text-foreground">Machine Learning MLOps Platform</h1>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              CHAMPION: TFT-V3
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Probabilistic forecasting engine, SHAP feature importance, model registry, and dataset training pipelines.</p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Button variant="glass" size="sm" leftIcon={<Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />} onClick={() => navigate('/ml/registry')}>
            Model Registry
          </Button>
          <Button variant="accent" size="sm" leftIcon={<Play className="w-4 h-4" />} onClick={() => navigate('/ml/predict')}>
            Run Inference
          </Button>
        </div>
      </div>

      {/* Main Forecast Widget */}
      <ProbabilisticForecastWidget forecast={forecast} />

      {/* Grid: Champion Models & SHAP Feature Attribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground uppercase tracking-wider">Champion & Challenger Forecasting Models</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/ml/registry')}>
              Registry <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
          {models.slice(0, 2).map((m) => (
            <ModelCard key={m.id} model={m} />
          ))}
        </div>

        <FeatureImportanceWidget shap={shap} />
      </div>
    </div>
  );
};
