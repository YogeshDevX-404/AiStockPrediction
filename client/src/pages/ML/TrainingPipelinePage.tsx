import React, { useState } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { Select } from '@/components/inputs/Select';
import { useTrainingStore } from '@/store/useTrainingStore';
import { Play, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TrainingPipelinePage: React.FC = () => {
  const navigate = useNavigate();
  const { runs, isTraining, triggerTraining } = useTrainingStore();

  const [modelId, setModelId] = useState('ml-1');
  const [datasetVersion, setDatasetVersion] = useState('v2.4');

  const handleTrain = async (e: React.FormEvent) => {
    e.preventDefault();
    await triggerTraining(modelId, datasetVersion);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <Play className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">Model Training Execution Console</h1>
          </div>
          <p className="text-xs text-slate-400">Trigger dataset windowing, feature normalization, sequence building, and loss minimization.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/ml')}>
          MLOps Dashboard
        </Button>
      </div>

      <GlassCard className="p-6">
        <form onSubmit={handleTrain} className="space-y-4 text-xs">
          <Select
            label="Target ML Model Architecture"
            value={modelId}
            onChange={(e) => setModelId(e.target.value)}
            options={[
              { value: 'ml-1', label: 'Temporal Fusion Transformer (TFT-v3)' },
              { value: 'ml-2', label: 'XGBoost Gradient Booster' },
              { value: 'ml-3', label: 'Deep LSTM Recurrent Net' },
            ]}
          />

          <Select
            label="Feature Store Dataset Version"
            value={datasetVersion}
            onChange={(e) => setDatasetVersion(e.target.value)}
            options={[
              { value: 'v2.4', label: 'Dataset v2.4 (OHLC + RSI + FinBERT Sentiment)' },
              { value: 'v2.3', label: 'Dataset v2.3 (OHLC + Technical Indicators)' },
            ]}
          />

          <Button type="submit" variant="accent" size="md" className="w-full" isLoading={isTraining} leftIcon={<Play className="w-4 h-4" />}>
            Execute Training Pipeline Run
          </Button>
        </form>
      </GlassCard>

      {/* Recent Training Runs Table */}
      <GlassCard className="p-5 space-y-4">
        <h2 className="text-sm font-bold text-white font-display border-b border-white/10 pb-3">Training Pipeline Execution Log</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-white/10 text-slate-400 uppercase font-sans">
              <tr>
                <th className="pb-3 font-semibold">Run ID</th>
                <th className="pb-3 font-semibold">Model ID</th>
                <th className="pb-3 font-semibold">Dataset Version</th>
                <th className="pb-3 font-semibold">Loss</th>
                <th className="pb-3 font-semibold text-right font-sans">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {runs.map((r) => (
                <tr key={r.runId} className="hover:bg-white/5">
                  <td className="py-3 font-bold text-white font-sans">{r.runId}</td>
                  <td className="py-3 text-purple-300 font-bold">{r.modelId}</td>
                  <td className="py-3 text-slate-300">{r.datasetVersion}</td>
                  <td className="py-3 text-emerald-400 font-bold">{r.loss}</td>
                  <td className="py-3 text-right font-sans">
                    <Badge variant="emerald">{r.status}</Badge>
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
