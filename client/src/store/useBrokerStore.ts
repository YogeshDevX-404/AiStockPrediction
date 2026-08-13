import { create } from 'zustand';
import { LinkedBrokerItem, BrokerOrderRequest, BrokerApi } from '@/services/api/brokerApi';
import { toast } from 'react-hot-toast';

interface BrokerStoreState {
  accounts: LinkedBrokerItem[];
  isLoading: boolean;
  isSubmittingOrder: boolean;
  fetchAccounts: () => Promise<void>;
  submitOrder: (request: BrokerOrderRequest) => Promise<void>;
}

export const useBrokerStore = create<BrokerStoreState>((set) => ({
  accounts: [
    {
      id: 'brk-1',
      brokerName: 'Zerodha Kite',
      accountName: 'Zerodha Pro Trading Account',
      accountNumber: 'ZR84920',
      cashBalance: 450000.0,
      buyingPower: 900000.0,
      status: 'CONNECTED',
      lastSynced: new Date().toISOString(),
    },
    {
      id: 'brk-2',
      brokerName: 'Alpaca Markets',
      accountName: 'Alpaca US Equity Account',
      accountNumber: 'ALP-90214',
      cashBalance: 15000.0,
      buyingPower: 60000.0,
      status: 'CONNECTED',
      lastSynced: new Date().toISOString(),
    },
  ],
  isLoading: false,
  isSubmittingOrder: false,

  fetchAccounts: async () => {
    try {
      set({ isLoading: true });
      const accounts = await BrokerApi.getAccounts();
      set({ accounts, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  submitOrder: async (request) => {
    try {
      set({ isSubmittingOrder: true });
      const res = await BrokerApi.submitOrder(request);
      set({ isSubmittingOrder: false });
      toast.success(`Routed live ${request.side} order for $${request.symbol} to broker!`);
    } catch {
      set({ isSubmittingOrder: false });
      toast.error('Failed to route broker order.');
    }
  },
}));
