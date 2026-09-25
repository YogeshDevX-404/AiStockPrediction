import React, { useEffect, useRef, useState } from 'react';
import { ChartTopToolbar } from './ChartTopToolbar';
import { ChartDrawingToolbar } from './ChartDrawingToolbar';
import { ChartAIOverlayPanel } from './ChartAIOverlayPanel';
import { useChartStore } from '@/store/useChartStore';
import { useIndicatorStore } from '@/store/useIndicatorStore';
import { useChartTimeframeStore } from '@/store/useChartTimeframeStore';
import { ChartAdapterFactory } from './providers/ChartAdapterFactory';
import { formatCurrency } from '@/utils/cn';
import { apiClient } from '@/api';
import { MarketApi } from '@/services/api/marketApi';
export interface TradingChartEngineProps {
  symbol?: string;
  heightClassName?: string;
}

export const TradingChartEngine: React.FC<TradingChartEngineProps> = ({
  symbol: propSymbol,
  heightClassName = 'h-[500px]',
}) => {
  const { symbol: storeSymbol, setSymbol, chartType, compareSymbol, isFullscreen } = useChartStore();
  const { indicators } = useIndicatorStore();
  const { activeTimeframe } = useChartTimeframeStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const [chartError, setChartError] = useState<string | null>(null);

  useEffect(() => {
    if (propSymbol) {
      setSymbol(propSymbol);
    }
  }, [propSymbol, setSymbol]);

  const symbol = propSymbol || storeSymbol;

  useEffect(() => {
    let adapter: any = null;

    if (containerRef.current) {
      setChartError(null);

      try {
        adapter = ChartAdapterFactory.getAdapter('lightweight');
        adapter.renderChart(containerRef.current, {
          symbol,
          chartType,
          theme: 'dark',
          gridLines: true,
          crosshair: true,
          compareSymbol,
        });

        MarketApi.getHistoricalData(symbol, activeTimeframe)
          .then((data) => {
            if (!adapter) return;
            if (!data) {
              setChartError(`API returned falsy data: ${typeof data}`);
              return;
            }
            let points = Array.isArray(data) ? data : (data as any)?.data;
            if (!points || !Array.isArray(points)) {
              if (data && (data as any).t && Array.isArray((data as any).t)) {
                points = (data as any).t.map((t: number, i: number) => ({
                  timestamp: new Date(t * 1000).toISOString(),
                  open: (data as any).o[i],
                  high: (data as any).h[i],
                  low: (data as any).l[i],
                  close: (data as any).c[i],
                  volume: (data as any).v ? (data as any).v[i] : 0,
                }));
              } else {
                setChartError(`API shape mismatch: Expected array, got ${typeof data}`);
                return;
              }
            }

            if (!points || points.length === 0) {
              adapter.updateData([]);
              setChartError('Historical market data is currently unavailable for this timeframe.');
              return;
            }
            
            try {
              const chartData = points.map((d: any) => ({
                timestamp: d.timestamp,
                time: Math.floor(new Date(d.timestamp).getTime() / 1000),
                open: Number(d.open),
                high: Number(d.high),
                low: Number(d.low),
                close: Number(d.close),
                volume: Number(d.volume || 0),
              }));
              adapter.updateData(chartData);
            } catch (err: any) {
              setChartError(`Data mapping error: ${err.message}`);
            }
          })
          .catch((err) => {
            console.error('[TradingChartEngine] failed to load historical data', err);
            if (adapter) adapter.updateData([]);
            setChartError(`API Error: ${err.message || 'Historical market data is currently unavailable.'}`);
          });
      } catch (err: any) {
        console.error('[TradingChartEngine] Error initializing chart:', err);
        setChartError(`Init Error: ${err.message || 'Unable to load the chart.'}`);
      }
    }

    return () => {
      try {
        if (adapter) {
          adapter.destroy();
        } else {
          ChartAdapterFactory.getAdapter('lightweight').destroy();
        }
      } catch (e) {
        console.error('[TradingChartEngine] Cleanup error:', e);
      }
    };
  }, [symbol, chartType, compareSymbol, activeTimeframe]);

  const activeIndicatorNames = indicators.filter((i) => i.enabled).map((i) => i.id);

  return (
    <div
      className={`glass-panel border border-white/15 rounded-3xl bg-[#060a18] flex flex-col overflow-hidden shadow-2xl relative ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : heightClassName
      }`}
    >
      {/* 1. Top Toolbar */}
      <ChartTopToolbar />

      {/* 2. Middle Body (Drawing Bar + Canvas + AI Overlay) */}
      <div className="flex-1 flex relative min-h-0 overflow-hidden">
        {/* Left Drawing Toolbar */}
        <ChartDrawingToolbar />

        {/* Main Canvas Viewport */}
        <div className="flex-1 relative bg-white/[0.01] overflow-hidden select-none">
          {chartError && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-xl text-sm font-medium backdrop-blur-sm shadow-xl">
                {chartError}
              </div>
            </div>
          )}
          <div ref={containerRef} className="absolute inset-0 w-full h-full" />
        </div>

        {/* Floating Right AI Panel */}
        <ChartAIOverlayPanel symbol={symbol} />
      </div>

      {/* 3. Bottom Status Bar */}
      <ChartStatusBar symbol={symbol} activeIndicatorNames={activeIndicatorNames} activeTimeframe={activeTimeframe} />
    </div>
  );
};

const ChartStatusBar: React.FC<{ symbol: string; activeIndicatorNames: string[]; activeTimeframe: string }> = ({
  symbol,
  activeIndicatorNames,
  activeTimeframe,
}) => {
  const [quote, setQuote] = React.useState<any>(null);

  React.useEffect(() => {
    if (symbol) {
      apiClient
        .get(`/market/quote/${symbol}`)
        .then((res: any) => {
          if (res?.data) setQuote(res.data);
        })
        .catch(() => setQuote(null));
    }
  }, [symbol]);

  return (
    <div className="glass-panel px-4 py-1.5 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground font-mono select-none">
      <div className="flex items-center space-x-3">
        <span className="text-foreground font-bold">{symbol}</span>
        {quote ? (
          <>
            <span>O: ${quote.open?.toFixed(2) || 'N/A'}</span>
            <span>H: ${quote.high?.toFixed(2) || 'N/A'}</span>
            <span>L: ${quote.low?.toFixed(2) || 'N/A'}</span>
            <span className={quote.changePercent >= 0 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-red-600 dark:text-red-400 font-bold'}>
              C: ${quote.price?.toFixed(2)} ({quote.changePercent >= 0 ? '+' : ''}
              {quote.changePercent?.toFixed(2)}%)
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">Market Quote Loading / Key Unconfigured</span>
        )}
      </div>

      <div className="hidden sm:flex items-center space-x-2 text-[10px]">
        <span>Indicators: {activeIndicatorNames.join(', ') || 'None'}</span>
        <span>Timeframe: {activeTimeframe}</span>
      </div>
    </div>
  );
};
