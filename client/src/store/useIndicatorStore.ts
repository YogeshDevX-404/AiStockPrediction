import { create } from 'zustand';

export interface IndicatorConfig {
  id: string;
  name: string;
  category: 'TREND' | 'MOMENTUM' | 'VOLATILITY' | 'VOLUME';
  enabled: boolean;
  color: string;
}

interface IndicatorState {
  indicators: IndicatorConfig[];
  toggleIndicator: (id: string) => void;
  enableIndicator: (id: string) => void;
  disableIndicator: (id: string) => void;
}

export const defaultIndicators: IndicatorConfig[] = [
  { id: 'EMA', name: 'Exponential Moving Average (EMA 20)', category: 'TREND', enabled: true, color: '#8b5cf6' },
  { id: 'SMA', name: 'Simple Moving Average (SMA 50)', category: 'TREND', enabled: false, color: '#3b82f6' },
  { id: 'RSI', name: 'Relative Strength Index (RSI 14)', category: 'MOMENTUM', enabled: true, color: '#10b981' },
  { id: 'MACD', name: 'MACD (12, 26, 9)', category: 'MOMENTUM', enabled: true, color: '#f59e0b' },
  { id: 'VWAP', name: 'Volume Weighted Average Price (VWAP)', category: 'VOLUME', enabled: true, color: '#ec4899' },
  { id: 'BOLLINGER', name: 'Bollinger Bands (20, 2)', category: 'VOLATILITY', enabled: false, color: '#06b6d4' },
  { id: 'ATR', name: 'Average True Range (ATR)', category: 'VOLATILITY', enabled: false, color: '#64748b' },
  { id: 'ADX', name: 'Average Directional Index (ADX)', category: 'MOMENTUM', enabled: false, color: '#a855f7' },
  { id: 'STOCH_RSI', name: 'Stochastic RSI', category: 'MOMENTUM', enabled: false, color: '#14b8a6' },
  { id: 'ICHIMOKU', name: 'Ichimoku Cloud', category: 'TREND', enabled: false, color: '#eab308' },
  { id: 'VOLUME', name: 'Volume Bars', category: 'VOLUME', enabled: true, color: '#10b981' },
  { id: 'MA_CROSS', name: 'Moving Average Cross', category: 'TREND', enabled: false, color: '#ef4444' },
];

export const useIndicatorStore = create<IndicatorState>((set) => ({
  indicators: defaultIndicators,
  toggleIndicator: (id) =>
    set((state) => ({
      indicators: state.indicators.map((ind) =>
        ind.id === id ? { ...ind, enabled: !ind.enabled } : ind
      ),
    })),
  enableIndicator: (id) =>
    set((state) => ({
      indicators: state.indicators.map((ind) =>
        ind.id === id ? { ...ind, enabled: true } : ind
      ),
    })),
  disableIndicator: (id) =>
    set((state) => ({
      indicators: state.indicators.map((ind) =>
        ind.id === id ? { ...ind, enabled: false } : ind
      ),
    })),
}));
