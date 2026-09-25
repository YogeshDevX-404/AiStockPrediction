import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/utils/cn';
import { apiClient } from '@/api';

export const AIRecommendationWidget: React.FC = () => {
  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/predictions/NVDA')
      .then((res: any) => {
        setPrediction(res.data);
      })
      .catch(() => setPrediction(null))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <GlassCard className="p-6 space-y-4 text-center text-muted-foreground text-xs">
        <Sparkles className="w-5 h-5 mx-auto animate-spin text-purple-600 dark:text-purple-600 dark:text-purple-400" />
        <p>Loading algorithmic AI signal...</p>
      </GlassCard>
    );
  }

  if (!prediction || !prediction.currentPrice || prediction.currentPrice === 0) {
    return (
      <GlassCard className="p-6 space-y-3 border-amber-500/20 bg-amber-950/10 text-muted-foreground">
        <div className="flex items-center space-x-2 text-amber-500 dark:text-amber-500 dark:text-amber-400 font-bold text-sm">
          <AlertCircle className="w-5 h-5" />
          <span>Algorithmic AI Signal Unavailable</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Market data provider API key is not configured in backend environment. Please set <code className="text-amber-300">FINNHUB_API_KEY</code> or <code className="text-amber-300">MARKET_DATA_API_KEY</code> in your backend <code className="text-amber-300">.env</code> file.
        </p>
      </GlassCard>
    );
  }

  const upsidePercent = prediction.currentPrice > 0
    ? (((prediction.targetPrice - prediction.currentPrice) / prediction.currentPrice) * 100).toFixed(1)
    : '0.0';

  return (
    <GlassCard glow className="p-6 border-purple-500/40 bg-gradient-to-br from-purple-950/40 via-[#0a1128] to-[#060914] space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-600 dark:text-purple-600 dark:text-purple-400 border border-purple-500/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-black text-foreground font-display">Algorithmic AI Technical Signal</h2>
              <Badge variant="purple">{prediction.symbol}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Indicator-driven probability model breakdown</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-600 dark:text-emerald-400 font-display flex items-center justify-end">
            <Zap className="w-5 h-5 mr-1" /> {prediction.signal}
          </span>
          <span className="text-[10px] text-muted-foreground font-bold uppercase">Signal Rating</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Symbol & Price */}
        <div className="p-4 rounded-2xl bg-foreground/5 border border-border/50 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold">Asset</span>
          <div className="text-xl font-extrabold text-foreground font-mono">{prediction.symbol}</div>
          <div className="text-xs text-muted-foreground">{formatCurrency(prediction.currentPrice)}</div>
        </div>

        {/* Target Price */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
          <span className="text-[10px] text-emerald-300 uppercase font-bold">Target Price</span>
          <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-600 dark:text-emerald-400 font-display">{formatCurrency(prediction.targetPrice)}</div>
          <div className="text-xs text-emerald-600 dark:text-emerald-600 dark:text-emerald-400 font-bold">+{upsidePercent}% Projected Target</div>
        </div>

        {/* Stop Loss */}
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-1">
          <span className="text-[10px] text-red-300 uppercase font-bold">Stop Loss</span>
          <div className="text-xl font-extrabold text-red-600 dark:text-red-600 dark:text-red-400 font-display">{formatCurrency(prediction.stopLoss)}</div>
          <div className="text-xs text-red-600 dark:text-red-600 dark:text-red-400 font-bold">Risk Management Floor</div>
        </div>

        {/* Confidence Gauge */}
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-1 text-center">
          <span className="text-[10px] text-purple-300 uppercase font-bold">Calculated Confidence</span>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-600 dark:text-purple-400 font-display">{prediction.confidenceScore}%</div>
          <div className="w-full bg-foreground/10 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-purple-400 h-full" style={{ width: `${Math.min(100, prediction.confidenceScore)}%` }} />
          </div>
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <span className="font-bold text-foreground uppercase tracking-wider text-[11px]">Signal Rationale Breakdown:</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground">
          {(prediction.rationale || []).map((rat: string, idx: number) => (
            <div key={idx} className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{rat}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};
