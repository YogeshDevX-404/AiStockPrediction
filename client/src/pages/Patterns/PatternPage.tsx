import React, { useState } from 'react';
import { PatternPanel } from './components/PatternPanel';
import { PatternStatisticsWidget } from './components/PatternStatisticsWidget';
import { PatternHistoryTable } from './components/PatternHistoryTable';
import { usePatternStore } from '@/store/usePatternStore';
import { Button } from '@/components/buttons/Button';
import { Sparkles, RefreshCw, Layers } from 'lucide-react';

export const PatternPage: React.FC = () => {
  const { detectedPatterns, scanPatterns, isScanning } = usePatternStore();
  const [tickerSymbol, setTickerSymbol] = useState('NVDA');

  const handleRunScan = async () => {
    await scanPatterns(tickerSymbol);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-card to-emerald-950/20">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-black font-display text-foreground">AI Technical Pattern Recognition Engine</h1>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              GEOMETRIC VISION ACTIVE
            </span>
          </div>
          <p className="text-xs text-muted-foreground">Automated multi-timeframe pattern scanner for Reversal, Continuation, Triangle, and Candlestick setups.</p>
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
            isLoading={isScanning}
            leftIcon={<RefreshCw className="w-4 h-4" />}
            onClick={handleRunScan}
          >
            Scan Patterns
          </Button>
        </div>
      </div>

      {/* Primary & Secondary Pattern Panels Stream */}
      <div className="space-y-4">
        {detectedPatterns.map((pat, idx) => (
          <PatternPanel key={pat.id} pattern={pat} isPrimary={idx === 0} />
        ))}
      </div>

      {/* Historical Pattern Success Benchmarks */}
      <PatternStatisticsWidget />

      {/* Pattern Recognition Audit Log */}
      <PatternHistoryTable />
    </div>
  );
};
