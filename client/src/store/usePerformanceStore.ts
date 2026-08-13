import { create } from 'zustand';

interface PerformanceStoreState {
  cagr: number;
  sharpe: number;
  sortino: number;
  maxDrawdown: number;
}

export const usePerformanceStore = create<PerformanceStoreState>((set) => ({
  cagr: 28.4,
  sharpe: 1.85,
  sortino: 2.40,
  maxDrawdown: -12.4,
}));
