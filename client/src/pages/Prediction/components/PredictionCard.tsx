import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { DetailedPrediction } from '@/services/api/predictionApi';
import { formatCurrency } from '@/utils/cn';
import { Sparkles, Zap, ArrowRight, CheckCircle2, ShieldAlert, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface PredictionCardProps {
  prediction: DetailedPrediction;
  onOpenConfidenceModal: (symbol: string) => void;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({ prediction, onOpenConfidenceModal }) => {
  const navigate = useNavigate();

  return (
    <GlassCard glow className="p-6 border-purple-500/40 bg-gradient-to-br from-purple-950/30 via-[#090f24] to-[#050814] space-y-6">
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-blue-500 to-purple-600 flex items-center justify-center font-mono font-black text-xl text-foreground shadow-lg">
            {prediction.symbol.slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-extrabold text-foreground font-display">{prediction.symbol}</h2>
              <Badge variant="purple">{prediction.timeframe} HORIZON</Badge>
              <Badge variant="emerald">{prediction.riskLevel} RISK</Badge>
            </div>
            <p className="text-xs text-muted-foreground">{prediction.name}</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-display flex items-center justify-end">
            <Zap className="w-5 h-5 mr-1" /> {prediction.signal.replace('_', ' ')}
          </span>
          <span className="text-[10px] text-muted-foreground font-bold uppercase">Signal Conviction</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Confidence Gauge */}
        <div
          onClick={() => onOpenConfidenceModal(prediction.symbol)}
          className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-1 text-center cursor-pointer hover:border-purple-500/60 transition-all"
        >
          <span className="text-[10px] text-purple-300 uppercase font-bold">Probability Rating</span>
          <div className="text-3xl font-black text-purple-600 dark:text-purple-400 font-display">{prediction.confidenceScore}%</div>
          <div className="w-full bg-foreground/10 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-purple-400 h-full" style={{ width: `${prediction.confidenceScore}%` }} />
          </div>
        </div>

        {/* Target Price */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
          <span className="text-[10px] text-emerald-300 uppercase font-bold">Suggested Target</span>
          <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">{formatCurrency(prediction.targetPrice)}</div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">+17.0% Upside</div>
        </div>

        {/* Stop Loss */}
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-1">
          <span className="text-[10px] text-red-300 uppercase font-bold">Suggested Stop Loss</span>
          <div className="text-xl font-extrabold text-red-600 dark:text-red-400 font-display">{formatCurrency(prediction.stopLoss)}</div>
          <div className="text-xs text-red-600 dark:text-red-400 font-bold">-6.3% Hazard</div>
        </div>

        {/* Risk-Reward Ratio */}
        <div className="p-4 rounded-2xl bg-foreground/5 border border-border/50 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold">Risk-Reward Ratio</span>
          <div className="text-xl font-extrabold text-foreground font-mono">{prediction.riskRewardRatio} : 1</div>
          <div className="text-[10px] text-muted-foreground">Entry: <strong className="text-foreground">${prediction.entryPrice}</strong></div>
        </div>
      </div>

      {/* Rationale Timeline */}
      <div className="space-y-2 text-xs border-t border-border/50 pt-4">
        <span className="font-bold text-foreground uppercase tracking-wider text-[11px]">Model Driver Rationale:</span>
        <div className="space-y-1.5 text-muted-foreground">
          {prediction.rationale.map((reason, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Action Footer */}
      <div className="flex justify-end space-x-3 pt-2">
        <Button
          variant="glass"
          size="sm"
          leftIcon={<LineChart className="w-4 h-4 text-blue-400" />}
          onClick={() => navigate(`/stocks/${prediction.symbol}`)}
        >
          View Chart & Full Details
        </Button>
      </div>
    </GlassCard>
  );
};
