import React, { useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { useMLStore } from '@/store/useMLStore';
import { Activity, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MetricsPage: React.FC = () => {
  const navigate = useNavigate();
  const { metrics, fetchMetrics } = useMLStore();

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-border/50">
        <div>
          <div className="flex items-center space-x-2">
            <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-black font-display text-foreground">Model Drift & Telemetry Monitoring</h1>
          </div>
          <p className="text-xs text-muted-foreground">Track data drift, prediction drift, accuracy decay, and inference latency telemetry.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/ml')}>
          MLOps Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <GlassCard className="p-4 space-y-1">
          <span className="text-[10px] text-muted-foreground font-bold uppercase">Feature Drift Score</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{metrics.featureDriftScore}</div>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <span className="text-[10px] text-muted-foreground font-bold uppercase">Prediction Drift</span>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">{metrics.predictionDriftScore}</div>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <span className="text-[10px] text-muted-foreground font-bold uppercase">Accuracy Drift</span>
          <div className="text-2xl font-black text-blue-400 font-mono">{metrics.accuracyDriftPercent}%</div>
        </GlassCard>

        <GlassCard className="p-4 space-y-1">
          <span className="text-[10px] text-muted-foreground font-bold uppercase">Avg Inference Latency</span>
          <div className="text-2xl font-black text-amber-500 dark:text-amber-400 font-mono">{metrics.averageLatencyMs}ms</div>
        </GlassCard>
      </div>
    </div>
  );
};
