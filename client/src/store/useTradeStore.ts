import { create } from 'zustand';
import { PaperTradeItem, PaperApi } from '@/services/api/paperApi';

interface TradeStoreState {
  trades: PaperTradeItem[];
  isLoading: boolean;
  fetchTrades: () => Promise<void>;
}

export const useTradeStore = create<TradeStoreState>((set) => ({
  trades: [
    { id: 'trd-1', symbol: 'NVDA', side: 'BUY', quantity: 20, entryPrice: 110.0, exitPrice: 135.5, realizedPnl: 510.0, pnlPercent: 23.18, aiAgreementScore: 92.5, timestamp: '2026-03-25T14:15:00Z' },
    { id: 'trd-2', symbol: 'TSLA', side: 'BUY', quantity: 15, entryPrice: 210.0, exitPrice: 248.6, realizedPnl: 579.0, pnlPercent: 18.38, aiAgreementScore: 88.0, timestamp: '2026-03-24T11:30:00Z' },
  ],
  isLoading: false,

  fetchTrades: async () => {
    try {
      set({ isLoading: true });
      const trades = await PaperApi.getTrades();
      set({ trades, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
