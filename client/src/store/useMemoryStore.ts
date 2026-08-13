import { create } from 'zustand';

interface MemoryStoreState {
  preferredTimeframe: string;
  preferredMarket: string;
  favoriteSymbols: string[];
  learningMode: boolean;
  setLearningMode: (enabled: boolean) => void;
}

export const useMemoryStore = create<MemoryStoreState>((set) => ({
  preferredTimeframe: '1D',
  preferredMarket: 'US_EQUITIES',
  favoriteSymbols: ['NVDA', 'TSLA', 'AAPL'],
  learningMode: true,
  setLearningMode: (enabled) => set({ learningMode: enabled }),
}));
