import { create } from 'zustand';
import { ChartType } from '@/components/chart/providers/IChartAdapter';

interface ChartState {
  symbol: string;
  chartType: ChartType;
  compareSymbol: string | null;
  isFullscreen: boolean;
  gridLines: boolean;
  crosshair: boolean;
  priceLabels: boolean;
  timeLabels: boolean;
  autoScale: boolean;
  setSymbol: (symbol: string) => void;
  setChartType: (chartType: ChartType) => void;
  setCompareSymbol: (compareSymbol: string | null) => void;
  toggleFullscreen: () => void;
  updateSettings: (settings: Partial<Omit<ChartState, 'setSymbol' | 'setChartType' | 'setCompareSymbol' | 'toggleFullscreen' | 'updateSettings'>>) => void;
}

export const useChartStore = create<ChartState>((set) => ({
  symbol: 'NVDA',
  chartType: 'CANDLESTICK',
  compareSymbol: null,
  isFullscreen: false,
  gridLines: true,
  crosshair: true,
  priceLabels: true,
  timeLabels: true,
  autoScale: true,

  setSymbol: (symbol) => set({ symbol: symbol.toUpperCase() }),
  setChartType: (chartType) => set({ chartType }),
  setCompareSymbol: (compareSymbol) => set({ compareSymbol: compareSymbol ? compareSymbol.toUpperCase() : null }),
  toggleFullscreen: () => set((state) => ({ isFullscreen: !state.isFullscreen })),
  updateSettings: (settings) => set((state) => ({ ...state, ...settings })),
}));
