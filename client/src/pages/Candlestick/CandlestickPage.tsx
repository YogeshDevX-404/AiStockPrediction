import React, { useState } from 'react';
import { CandlestickCard } from './components/CandlestickCard';
import { CandlestickLearningWidget } from './components/CandlestickLearningWidget';
import { CandlestickHistoryTable } from './components/CandlestickHistoryTable';
import { useCandlestickStore } from '@/store/useCandlestickStore';
import { Button } from '@/components/buttons/Button';
import { Sparkles, RefreshCw, Cpu } from 'lucide-react';

export const CandlestickPage: React.FC = () => {
  const { candlesticks, analyzeSymbol, isAnalyzing } = useCandlestickStore();
  const [tickerSymbol, setTickerSymbol] = useState('NVDA');

  const handleRunScan = async () => {
    await analyzeSymbol(tickerSymbol);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-card to-emerald-950/20">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-black font-display text-foreground">Candlestick Intelligence & Recognition</h1>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              PATTERN ENGINE v3.2
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Probability-based single & multi-candle formation scanner with natural language explanation timelines.</p>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <input
            type="text"
            value={tickerSymbol}
            onChange={(e) => setTickerSymbol(e.target.value.toUpperCase())}
            placeholder="Symbol (e.g. NVDA)"
            className="w-32 glass-panel border border-border/50 rounded-xl px-3 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <Button
            variant="accent"
            size="md"
            isLoading={isAnalyzing}
            leftIcon={<RefreshCw className="w-4 h-4" />}
            onClick={handleRunScan}
          >
            Analyze Candlesticks
          </Button>
        </div>
      </div>

      {/* Primary & Secondary Candlestick Cards Stream */}
      <div className="space-y-4">
        {candlesticks.map((candle, idx) => (
          <CandlestickCard key={candle.id} candlestick={candle} isPrimary={idx === 0} />
        ))}
      </div>

      {/* Educational Learning Hub */}
      <CandlestickLearningWidget />

      {/* Audit History & Reliability Statistics */}
      <CandlestickHistoryTable />
    </div>
  );
};
