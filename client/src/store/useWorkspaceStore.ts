import { create } from 'zustand';

interface WorkspaceStoreState {
  activeTab: 'CHAT' | 'CHART' | 'WATCHLIST' | 'PORTFOLIO' | 'NEWS' | 'PREDICTION' | 'NOTES';
  pinnedNotes: string[];
  setActiveTab: (tab: 'CHAT' | 'CHART' | 'WATCHLIST' | 'PORTFOLIO' | 'NEWS' | 'PREDICTION' | 'NOTES') => void;
  addNote: (note: string) => void;
}

export const useWorkspaceStore = create<WorkspaceStoreState>((set) => ({
  activeTab: 'CHAT',
  pinnedNotes: [
    'NVDA resistance target: $145.00 with stop loss at $128.50.',
    'Monitor TSLA Q3 earnings sentiment before executing limit order.',
  ],
  setActiveTab: (tab) => set({ activeTab: tab }),
  addNote: (note) => set((state) => ({ pinnedNotes: [note, ...state.pinnedNotes] })),
}));
