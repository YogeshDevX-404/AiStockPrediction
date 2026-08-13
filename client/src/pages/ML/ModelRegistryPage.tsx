import React, { useEffect } from 'react';
import { ModelCard } from './components/ModelCard';
import { useModelStore } from '@/store/useModelStore';
import { Button } from '@/components/buttons/Button';
import { Layers, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ModelRegistryPage: React.FC = () => {
  const navigate = useNavigate();
  const { models, fetchModels } = useModelStore();

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <Layers className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">Machine Learning Model Registry</h1>
          </div>
          <p className="text-xs text-slate-400">Model versions catalog (Temporal Fusion Transformer, XGBoost, LSTM, CatBoost) with benchmark metrics.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/ml')}>
          MLOps Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {models.map((m) => (
          <ModelCard key={m.id} model={m} />
        ))}
      </div>
    </div>
  );
};
