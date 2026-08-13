import React, { useEffect, useRef } from 'react';
import { ChartTopToolbar } from './ChartTopToolbar';
import { ChartDrawingToolbar } from './ChartDrawingToolbar';
import { ChartAIOverlayPanel } from './ChartAIOverlayPanel';
import { useChartStore } from '@/store/useChartStore';
import { useIndicatorStore } from '@/store/useIndicatorStore';
import { useChartTimeframeStore } from '@/store/useChartTimeframeStore';
import { ChartAdapterFactory } from './providers/ChartAdapterFactory';
import { formatCurrency } from '@/utils/cn';

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

  useEffect(() => {
    if (propSymbol) {
      setSymbol(propSymbol);
    }
  }, [propSymbol, setSymbol]);

  const symbol = propSymbol || storeSymbol;

  useEffect(() => {
    if (containerRef.current) {
      const adapter = ChartAdapterFactory.getAdapter('lightweight');
      adapter.renderChart(containerRef.current, {
        symbol,
        chartType,
        theme: 'dark',
        gridLines: true,
        crosshair: true,
        compareSymbol,
      });
    }
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
        <div ref={containerRef} className="flex-1 relative bg-white/[0.01] overflow-hidden select-none">
          <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 800 350">
            <defs>
              <linearGradient id="chartBg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line x1="0" y1="70" x2="800" y2="70" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 2" />
            <line x1="0" y1="140" x2="800" y2="140" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 2" />
            <line x1="0" y1="210" x2="800" y2="210" stroke="rgba(255,255,255,0.05)" strokeDasharray="2 2" />

            {/* Main Area / Candlestick Path */}
            {chartType === 'AREA' || chartType === 'LINE' ? (
              <>
                <path d="M0,280 Q200,140 400,200 T600,80 T800,40 L800,350 L0,350 Z" fill="url(#chartBg)" />
                <path d="M0,280 Q200,140 400,200 T600,80 T800,40" fill="none" stroke="#10b981" strokeWidth="2.5" />
              </>
            ) : (
              // Candlesticks Representation
              <g>
                <line x1="100" y1="220" x2="100" y2="280" stroke="#10b981" strokeWidth="2" />
                <rect x="92" y="235" width="16" height="35" fill="#10b981" rx="2" />

                <line x1="220" y1="180" x2="220" y2="250" stroke="#ef4444" strokeWidth="2" />
                <rect x="212" y="195" width="16" height="40" fill="#ef4444" rx="2" />

                <line x1="340" y1="140" x2="340" y2="210" stroke="#10b981" strokeWidth="2" />
                <rect x="332" y="150" width="16" height="45" fill="#10b981" rx="2" />

                <line x1="460" y1="110" x2="460" y2="180" stroke="#10b981" strokeWidth="2" />
                <rect x="452" y="120" width="16" height="45" fill="#10b981" rx="2" />

                <line x1="580" y1="70" x2="580" y2="140" stroke="#10b981" strokeWidth="2" />
                <rect x="572" y="80" width="16" height="45" fill="#10b981" rx="2" />

                <line x1="700" y1="30" x2="700" y2="100" stroke="#10b981" strokeWidth="2" />
                <rect x="692" y="40" width="16" height="45" fill="#10b981" rx="2" />
              </g>
            )}

            {/* EMA Overlay if enabled */}
            {activeIndicatorNames.includes('EMA') && (
              <path d="M0,290 Q200,160 400,210 T600,90 T800,50" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="4 4" />
            )}

            {/* Compare Overlay Symbol if selected */}
            {compareSymbol && (
              <path d="M0,250 Q200,200 400,160 T600,120 T800,90" fill="none" stroke="#3b82f6" strokeWidth="2" />
            )}

            {/* Volume Panel Bars */}
            {activeIndicatorNames.includes('VOLUME') && (
              <g opacity="0.4">
                <rect x="92" y="300" width="16" height="40" fill="#10b981" />
                <rect x="212" y="315" width="16" height="25" fill="#ef4444" />
                <rect x="332" y="290" width="16" height="50" fill="#10b981" />
                <rect x="452" y="285" width="16" height="55" fill="#10b981" />
                <rect x="572" y="275" width="16" height="65" fill="#10b981" />
                <rect x="692" y="260" width="16" height="80" fill="#10b981" />
              </g>
            )}
          </svg>
        </div>

        {/* Floating Right AI Panel */}
        <ChartAIOverlayPanel symbol={symbol} />
      </div>

      {/* 3. Bottom Status Bar */}
      <div className="glass-panel px-4 py-1.5 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono select-none">
        <div className="flex items-center space-x-3">
          <span className="text-white font-bold">{symbol}</span>
          <span>O: $128.50</span>
          <span>H: $133.10</span>
          <span>L: $127.80</span>
          <span className="text-emerald-400 font-bold">C: $132.40 (+3.45%)</span>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-[10px]">
          <span>Indicators: {activeIndicatorNames.join(', ') || 'None'}</span>
          <span>Timeframe: {activeTimeframe}</span>
        </div>
      </div>
    </div>
  );
};
