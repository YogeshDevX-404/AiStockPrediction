import React, { useState } from 'react';
import { MultiTimeframeTabs } from './components/MultiTimeframeTabs';
import { PredictionCard } from './components/PredictionCard';
import { PredictionHistoryLog } from './components/PredictionHistoryLog';
import { ConfidenceBreakdownModal } from './components/ConfidenceBreakdownModal';
import { usePredictionStore } from '@/store/usePredictionStore';
import { Button } from '@/components/buttons/Button';
import { Sparkles, RefreshCw, Cpu } from 'lucide-react';

export const PredictionPage: React.FC = () => {
  const { predictions, analyzeSymbolOnDemand } = usePredictionStore();
  const [selectedConfidenceSymbol, setSelectedConfidenceSymbol] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeNew = async () => {
    setIsAnalyzing(true);
    await analyzeSymbolOnDemand('NVDA');
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-card to-emerald-950/20">
        <div>
          <div className="flex items-center space-x-2">
            <Cpu className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-black font-display text-foreground">AI Prediction & Neural Insights</h1>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              PROBABILITY ENGINE v4.8
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Explainable probability-based trading insights driven by multi-indicator neural conviction models.</p>
        </div>

        <Button
          variant="accent"
          size="md"
          isLoading={isAnalyzing}
          leftIcon={<RefreshCw className="w-4 h-4" />}
          onClick={handleAnalyzeNew}
        >
          Run On-Demand Scan
        </Button>
      </div>

      {/* Multi-Timeframe Filter Tabs */}
      <MultiTimeframeTabs />

      {/* High-Conviction Prediction Cards Stream */}
      <div className="space-y-6">
        {predictions.map((pred) => (
          <PredictionCard
            key={pred.id}
            prediction={pred}
            onOpenConfidenceModal={(sym) => setSelectedConfidenceSymbol(sym)}
          />
        ))}
      </div>

      {/* Prediction History Accuracy Log */}
      <PredictionHistoryLog />

      {/* Confidence Breakdown Modal */}
      {selectedConfidenceSymbol && (
        <ConfidenceBreakdownModal
          isOpen={!!selectedConfidenceSymbol}
          onClose={() => setSelectedConfidenceSymbol(null)}
          symbol={selectedConfidenceSymbol}
        />
      )}
    </div>
  );
};
