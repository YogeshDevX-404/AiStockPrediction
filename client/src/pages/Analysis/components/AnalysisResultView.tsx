import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { useImageAnalysisStore } from '@/store/useImageAnalysisStore';
import { formatCurrency } from '@/utils/cn';
import { Sparkles, Zap, CheckCircle2, ShieldCheck, LineChart, Target, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AnalysisResultView: React.FC = () => {
  const navigate = useNavigate();
  const { currentAnalysis } = useImageAnalysisStore();

  if (!currentAnalysis) return null;

  return (
    <GlassCard glow className="p-6 border-purple-500/40 bg-gradient-to-br from-purple-950/30 via-[#0a0e24] to-[#060914] space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-emerald-500 flex items-center justify-center font-mono font-black text-xl text-foreground shadow-lg">
            {currentAnalysis.ticker.slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-extrabold text-foreground font-display">{currentAnalysis.ticker} OCR DETECTED</h2>
              <Badge variant="purple">{currentAnalysis.timeframe} CHART</Badge>
              <Badge variant="emerald">{currentAnalysis.chartType}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Scanned Layout: TradingView / Kite • Model: GPT-4 Vision Neural Pipeline</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-display flex items-center justify-end">
            <Zap className="w-5 h-5 mr-1" /> {currentAnalysis.signal.replace('_', ' ')}
          </span>
          <span className="text-[10px] text-muted-foreground font-bold uppercase">Vision Probability Rating</span>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-1">
          <span className="text-[10px] text-purple-300 uppercase font-bold">Neural Confidence</span>
          <div className="text-3xl font-black text-purple-600 dark:text-purple-400 font-display">{currentAnalysis.confidenceScore}%</div>
          <div className="text-[10px] text-purple-300">High Pattern Match</div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
          <span className="text-[10px] text-emerald-300 uppercase font-bold">Target Upside</span>
          <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">{formatCurrency(currentAnalysis.targetPrice)}</div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">Projected Resistance</div>
        </div>

        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-1">
          <span className="text-[10px] text-red-300 uppercase font-bold">Stop Loss Level</span>
          <div className="text-xl font-extrabold text-red-600 dark:text-red-400 font-display">{formatCurrency(currentAnalysis.stopLoss)}</div>
          <div className="text-xs text-red-600 dark:text-red-400 font-bold">Key Support Breach</div>
        </div>

        <div className="p-4 rounded-2xl bg-foreground/5 border border-border/50 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold">Suggested Entry Zone</span>
          <div className="text-base font-extrabold text-foreground font-mono">{currentAnalysis.entryZone}</div>
          <div className="text-[10px] text-muted-foreground">Risk Profile: <strong className="text-emerald-600 dark:text-emerald-400">{currentAnalysis.riskLevel}</strong></div>
        </div>
      </div>

      {/* Detected Patterns & Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Patterns */}
        <div className="p-4 rounded-2xl bg-foreground/5 border border-border/50 space-y-2 text-xs">
          <span className="font-bold text-foreground uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Detected Chart & Candle Patterns ({currentAnalysis.detectedPatterns.length})</span>
          </span>
          <div className="flex flex-wrap gap-2 pt-1">
            {currentAnalysis.detectedPatterns.map((pat, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                {pat}
              </span>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="p-4 rounded-2xl bg-foreground/5 border border-border/50 space-y-2 text-xs">
          <span className="font-bold text-foreground uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
            <LineChart className="w-4 h-4 text-blue-400" />
            <span>Recognized Visible Technical Indicators ({currentAnalysis.detectedIndicators.length})</span>
          </span>
          <div className="flex flex-wrap gap-2 pt-1">
            {currentAnalysis.detectedIndicators.map((ind, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold">
                {ind}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Vision AI Rationale Timeline */}
      <div className="space-y-2 text-xs border-t border-border/50 pt-4">
        <span className="font-bold text-foreground uppercase tracking-wider text-[11px]">Neural Vision Driver Rationale:</span>
        <div className="space-y-2 text-muted-foreground">
          {currentAnalysis.rationale.map((reason, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end space-x-3 pt-2">
        <Button
          variant="glass"
          size="md"
          leftIcon={<LineChart className="w-4 h-4 text-blue-400" />}
          onClick={() => navigate(`/stocks/${currentAnalysis.ticker}`)}
        >
          View Live Ticker Details
        </Button>
      </div>
    </GlassCard>
  );
};
