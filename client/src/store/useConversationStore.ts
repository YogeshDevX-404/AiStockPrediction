import { create } from 'zustand';

export interface ConversationThread {
  id: string;
  title: string;
  messageCount: number;
  lastUpdated: string;
}

interface ConversationState {
  threads: ConversationThread[];
  activeThreadId: string;
  setActiveThreadId: (id: string) => void;
}

export const useConversationStore = create<ConversationState>((set) => ({
  threads: [
    { id: 't1', title: 'Portfolio Risk Audit', messageCount: 4, lastUpdated: '2 hours ago' },
    { id: 't2', title: 'NVDA vs AAPL Comparison', messageCount: 6, lastUpdated: 'Yesterday' },
    { id: 't3', title: 'Breakout Watchlist Review', messageCount: 3, lastUpdated: '3 days ago' },
  ],
  activeThreadId: 't1',

  setActiveThreadId: (activeThreadId) => set({ activeThreadId }),
}));
