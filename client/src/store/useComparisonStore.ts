import { create } from 'zustand';

interface ComparisonState {
  selectedSymbols: string[];
  addSymbolToCompare: (symbol: string) => void;
  removeSymbolFromCompare: (symbol: string) => void;
  clearComparison: () => void;
}

export const useComparisonStore = create<ComparisonState>((set) => ({
  selectedSymbols: ['NVDA', 'AAPL', 'TSLA'],

  addSymbolToCompare: (symbol) =>
    set((state) => {
      const sym = symbol.toUpperCase();
      if (state.selectedSymbols.includes(sym)) return state;
      return { selectedSymbols: [...state.selectedSymbols, sym].slice(0, 4) };
    }),

  removeSymbolFromCompare: (symbol) =>
    set((state) => ({
      selectedSymbols: state.selectedSymbols.filter((s) => s !== symbol.toUpperCase()),
    })),

  clearComparison: () => set({ selectedSymbols: [] }),
}));
