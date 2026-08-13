import { create } from 'zustand';

export type TimeframePeriod =
  | '1m'
  | '5m'
  | '15m'
  | '30m'
  | '1h'
  | '4h'
  | '1d'
  | '1w'
  | '1M';

interface TimeframeState {
  activeTimeframe: TimeframePeriod;
  setTimeframe: (tf: TimeframePeriod) => void;
}

export const useChartTimeframeStore = create<TimeframeState>((set) => ({
  activeTimeframe: '1d',
  setTimeframe: (activeTimeframe) => set({ activeTimeframe }),
}));
