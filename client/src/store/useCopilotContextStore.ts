import { create } from 'zustand';

interface CopilotContextState {
  currentSymbol: string;
  selectedPortfolio: string;
  selectedWatchlist: string;
  setCurrentSymbol: (sym: string) => void;
  setSelectedPortfolio: (port: string) => void;
  setSelectedWatchlist: (wl: string) => void;
}

export const useCopilotContextStore = create<CopilotContextState>((set) => ({
  currentSymbol: 'NVDA',
  selectedPortfolio: 'Primary Portfolio',
  selectedWatchlist: 'My Watchlist',

  setCurrentSymbol: (currentSymbol) => set({ currentSymbol: currentSymbol.toUpperCase() }),
  setSelectedPortfolio: (selectedPortfolio) => set({ selectedPortfolio }),
  setSelectedWatchlist: (selectedWatchlist) => set({ selectedWatchlist }),
}));
