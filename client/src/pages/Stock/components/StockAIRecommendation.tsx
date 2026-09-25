import React, { useMemo } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Target, Zap, ShieldAlert, CheckCircle2, Loader2, Activity } from 'lucide-react';
import { formatCurrency } from '@/utils/cn';
import { useTechnicalStore } from '@/store/useTechnicalStore';
import { useStockDetailsStore } from '@/store/useStockDetailsStore';

export interface StockAIRecommendationProps {
  symbol: string;
}

export const StockAIRecommendation: React.FC<StockAIRecommendationProps> = ({ symbol }) => {
  const { indicators, isLoading } = useTechnicalStore();
  const { quote } = useStockDetailsStore();

  const aiData = useMemo(() => {
    if (!indicators || !quote) return null;

    let score = 0;
    const drivers = [];

    // Trend analysis
    if (indicators.overallTrend.includes('BULL')) {
      score += 30;
      drivers.push(`Moving average alignment confirms ${indicators.overallTrend.replace('_', ' ').toLowerCase()} momentum.`);
    } else if (indicators.overallTrend.includes('BEAR')) {
      score -= 30;
      drivers.push(`Moving average alignment shows ${indicators.overallTrend.replace('_', ' ').toLowerCase()} pressure.`);
    }

    // RSI analysis
    if (indicators.rsi && indicators.rsi.value !== null) {
      if (indicators.rsi.signal === 'OVERSOLD') {
        score += 20;
        drivers.push(`RSI (${indicators.rsi.value.toFixed(1)}) indicates oversold conditions, potential for rebound.`);
      } else if (indicators.rsi.signal === 'OVERBOUGHT') {
        score -= 20;
        drivers.push(`RSI (${indicators.rsi.value.toFixed(1)}) indicates overbought conditions, risk of pullback.`);
      } else {
        score += 5;
        drivers.push(`RSI is neutral, supporting ongoing price action.`);
      }
    }

    // MACD analysis
    if (indicators.macd) {
      if (indicators.macd.signal === 'BULLISH_CROSS' || (indicators.macd.histogram ?? 0) > 0) {
        score += 20;
        drivers.push('MACD histogram shows expanding bullish momentum.');
      } else if (indicators.macd.signal === 'BEARISH_CROSS' || (indicators.macd.histogram ?? 0) < 0) {
        score -= 20;
        drivers.push('MACD histogram indicates bearish divergence.');
      }
    }

    // Support / Resistance Context
    if (indicators.supportLevels.length > 0 && indicators.resistanceLevels.length > 0) {
      const closestSupport = indicators.supportLevels[0];
      const closestResistance = indicators.resistanceLevels[0];
      const distToSupport = (quote.price - closestSupport) / quote.price;
      const distToResistance = (closestResistance - quote.price) / quote.price;

      if (distToSupport < 0.02) {
        score += 15;
        drivers.push('Price is testing major historical support levels.');
      } else if (distToResistance < 0.02) {
        score -= 15;
        drivers.push('Price is approaching heavy technical resistance.');
      }
    }

    // Normalize confidence 0-100%
    const baseConfidence = 50 + (score / 2);
    const confidence = Math.max(10, Math.min(99, baseConfidence));

    let signal = 'NEUTRAL';
    if (confidence > 75) signal = 'STRONG BUY';
    else if (confidence > 60) signal = 'BUY';
    else if (confidence < 25) signal = 'STRONG SELL';
    else if (confidence < 40) signal = 'SELL';

    // Calculate dynamic target and stop based on ATR or percentages
    const currentPrice = quote.price;
    const volatility = indicators.bollingerBands ? (indicators.bollingerBands.upper - indicators.bollingerBands.lower) / currentPrice : 0.05;
    
    let targetPrice = currentPrice;
    let stopLoss = currentPrice;

    if (signal.includes('BUY')) {
      targetPrice = currentPrice * (1 + (volatility * 1.5));
      stopLoss = currentPrice * (1 - (volatility * 0.8));
    } else if (signal.includes('SELL')) {
      targetPrice = currentPrice * (1 - (volatility * 1.5));
      stopLoss = currentPrice * (1 + (volatility * 0.8));
    } else {
      targetPrice = indicators.resistanceLevels[0] || currentPrice * 1.05;
      stopLoss = indicators.supportLevels[0] || currentPrice * 0.95;
    }

    const upside = ((targetPrice - currentPrice) / currentPrice) * 100;
    const downside = ((stopLoss - currentPrice) / currentPrice) * 100;

    return {
      signal,
      confidence,
      targetPrice,
      stopLoss,
      upside,
      downside,
      drivers: drivers.slice(0, 3) // Top 3 drivers
    };
  }, [indicators, quote]);

  if (isLoading) {
    return (
      <GlassCard className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-purple-600 dark:text-purple-400 animate-spin" />
      </GlassCard>
    );
  }

  if (!aiData) {
    return (
      <GlassCard className="p-6 text-center space-y-2">
        <Activity className="w-8 h-8 text-muted-foreground mx-auto" />
        <h2 className="text-foreground font-bold">AI Analysis Unavailable</h2>
        <p className="text-xs text-muted-foreground">Not enough market data to generate prediction for {symbol}.</p>
      </GlassCard>
    );
  }

  const isBullish = aiData.signal.includes('BUY');
  const isBearish = aiData.signal.includes('SELL');

  return (
    <GlassCard glow className={`p-6 border-${isBullish ? 'purple' : isBearish ? 'red' : 'slate'}-500/40 bg-gradient-to-br from-${isBullish ? 'purple' : isBearish ? 'red' : 'slate'}-950/40 via-[#0a1128] to-[#060914] space-y-6`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-2xl bg-${isBullish ? 'purple' : isBearish ? 'red' : 'slate'}-500/20 text-${isBullish ? 'purple' : isBearish ? 'red' : 'slate'}-400 border border-${isBullish ? 'purple' : isBearish ? 'red' : 'slate'}-500/30 flex items-center justify-center`}>
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-black text-foreground font-display">TradeGenius AI Prediction Engine</h2>
              <Badge variant={isBullish ? 'purple' : isBearish ? 'red' : 'outline'}>NEURAL v4.8</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Algorithmic momentum rating for {symbol}</p>
          </div>
        </div>

        <div className="text-right">
          <span className={`text-2xl font-black font-display flex items-center justify-end ${isBullish ? 'text-emerald-600 dark:text-emerald-400' : isBearish ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'}`}>
            <Zap className="w-5 h-5 mr-1" /> {aiData.signal}
          </span>
          <span className="text-[10px] text-muted-foreground font-bold uppercase">AI Recommendation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-4 rounded-2xl bg-${isBullish ? 'purple' : isBearish ? 'red' : 'slate'}-500/10 border border-${isBullish ? 'purple' : isBearish ? 'red' : 'slate'}-500/30 space-y-1 text-center`}>
          <span className={`text-[10px] text-${isBullish ? 'purple' : isBearish ? 'red' : 'slate'}-300 uppercase font-bold`}>Confidence Gauge</span>
          <div className={`text-3xl font-black font-display text-${isBullish ? 'purple' : isBearish ? 'red' : 'slate'}-400`}>{aiData.confidence.toFixed(1)}%</div>
          <div className="w-full bg-foreground/10 h-1.5 rounded-full overflow-hidden mt-1">
            <div className={`bg-${isBullish ? 'purple' : isBearish ? 'red' : 'slate'}-400 h-full`} style={{ width: `${aiData.confidence}%` }} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
          <span className="text-[10px] text-emerald-300 uppercase font-bold">AI Target Price</span>
          <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">{formatCurrency(aiData.targetPrice)}</div>
          <div className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">{aiData.upside > 0 ? '+' : ''}{aiData.upside.toFixed(1)}% {aiData.upside > 0 ? 'Upside' : 'Downside'}</div>
        </div>

        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 space-y-1">
          <span className="text-[10px] text-red-300 uppercase font-bold">Stop Loss</span>
          <div className="text-xl font-extrabold text-red-600 dark:text-red-400 font-display">{formatCurrency(aiData.stopLoss)}</div>
          <div className="text-xs text-red-600 dark:text-red-400 font-bold">{aiData.downside > 0 ? '+' : ''}{aiData.downside.toFixed(1)}% Hazard</div>
        </div>

        <div className="p-4 rounded-2xl bg-foreground/5 border border-border/50 space-y-1">
          <span className="text-[10px] text-muted-foreground uppercase font-bold">Time Horizon</span>
          <div className="text-lg font-bold text-foreground font-mono">2 - 4 WEEKS</div>
          <div className="text-[10px] text-muted-foreground">Risk Profile: <strong className="text-emerald-600 dark:text-emerald-400">DYNAMIC</strong></div>
        </div>
      </div>

      <div className="space-y-2 text-xs border-t border-border/50 pt-4">
        <span className="font-bold text-foreground uppercase tracking-wider text-[11px]">AI Model Conviction Drivers:</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-muted-foreground">
          {aiData.drivers.map((driver, i) => (
            <div key={i} className="flex items-center space-x-2">
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${isBullish ? 'text-emerald-600 dark:text-emerald-400' : isBearish ? 'text-red-600 dark:text-red-400' : 'text-muted-foreground'}`} />
              <span>{driver}</span>
            </div>
          ))}
          {aiData.drivers.length === 0 && (
             <span className="text-muted-foreground italic">No significant technical drivers detected.</span>
          )}
        </div>
      </div>
    </GlassCard>
  );
};
