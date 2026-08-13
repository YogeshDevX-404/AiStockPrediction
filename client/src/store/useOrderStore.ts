import { create } from 'zustand';
import { PaperOrderItem, PaperApi } from '@/services/api/paperApi';
import { toast } from 'react-hot-toast';

interface OrderStoreState {
  orders: PaperOrderItem[];
  isSubmitting: boolean;
  fetchOrders: () => Promise<void>;
  submitOrder: (order: any) => Promise<void>;
  cancelOrder: (id: string) => Promise<void>;
}

export const useOrderStore = create<OrderStoreState>((set, get) => ({
  orders: [
    { id: 'ord-1', symbol: 'NVDA', side: 'BUY', orderType: 'MARKET', quantity: 20, price: 135.5, status: 'EXECUTED', createdAt: '2026-03-25T14:15:00Z' },
    { id: 'ord-2', symbol: 'TSLA', side: 'BUY', orderType: 'LIMIT', quantity: 15, price: 230.0, status: 'PENDING', createdAt: '2026-03-25T12:00:00Z' },
    { id: 'ord-3', symbol: 'AAPL', side: 'SELL', orderType: 'LIMIT', quantity: 10, price: 230.0, status: 'CANCELLED', createdAt: '2026-03-24T16:45:00Z' },
  ],
  isSubmitting: false,

  fetchOrders: async () => {
    try {
      const orders = await PaperApi.getOrders();
      set({ orders });
    } catch {
      // fallback to initial orders
    }
  },

  submitOrder: async (orderInput) => {
    try {
      set({ isSubmitting: true });
      const newOrder = await PaperApi.submitOrder(orderInput);
      set((state) => ({ orders: [newOrder, ...state.orders], isSubmitting: false }));
      toast.success(`Submitted virtual ${newOrder.side} order for $${newOrder.symbol}!`);
    } catch {
      set({ isSubmitting: false });
      toast.error('Failed to submit paper order.');
    }
  },

  cancelOrder: async (id) => {
    try {
      await PaperApi.cancelOrder(id);
      set((state) => ({
        orders: state.orders.map((o) => (o.id === id ? { ...o, status: 'CANCELLED' } : o)),
      }));
      toast.success('Cancelled paper order.');
    } catch {
      toast.error('Failed to cancel order.');
    }
  },
}));
