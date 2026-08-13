import { create } from 'zustand';
import { TransactionItem, PortfolioApi } from '@/services/api/portfolioApi';

interface TransactionState {
  transactions: TransactionItem[];
  isLoading: boolean;
  fetchTransactions: () => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [
    {
      id: 'tx1',
      symbol: 'NVDA',
      type: 'BUY',
      quantity: 50,
      price: 105.20,
      totalAmount: 5260.00,
      broker: 'Zerodha',
      timestamp: '2026-03-15T10:30:00Z',
    },
    {
      id: 'tx2',
      symbol: 'AAPL',
      type: 'BUY',
      quantity: 30,
      price: 195.00,
      totalAmount: 5850.00,
      broker: 'Groww',
      timestamp: '2026-02-10T14:15:00Z',
    },
    {
      id: 'tx3',
      symbol: 'NVDA',
      type: 'DIVIDEND',
      quantity: 50,
      price: 0.04,
      totalAmount: 2.00,
      broker: 'Zerodha',
      timestamp: '2025-12-04T09:00:00Z',
    },
  ],
  isLoading: false,

  fetchTransactions: async () => {
    try {
      set({ isLoading: true });
      const transactions = await PortfolioApi.getHistory();
      set({ transactions, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
