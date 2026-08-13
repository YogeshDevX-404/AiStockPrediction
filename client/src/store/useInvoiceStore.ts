import { create } from 'zustand';
import { InvoiceItem, BillingApi } from '@/services/api/billingApi';

interface InvoiceStoreState {
  invoices: InvoiceItem[];
  isLoading: boolean;
  fetchInvoices: () => Promise<void>;
}

export const useInvoiceStore = create<InvoiceStoreState>((set) => ({
  invoices: [
    { id: 'inv-1', invoiceNumber: 'INV-2026-001', amount: 49.0, tax: 4.41, status: 'PAID', createdAt: '2026-08-01T00:00:00Z', pdfUrl: '/invoices/INV-2026-001.pdf' },
    { id: 'inv-2', invoiceNumber: 'INV-2026-002', amount: 49.0, tax: 4.41, status: 'PAID', createdAt: '2026-07-01T00:00:00Z', pdfUrl: '/invoices/INV-2026-002.pdf' },
  ],
  isLoading: false,

  fetchInvoices: async () => {
    try {
      set({ isLoading: true });
      const invoices = await BillingApi.getInvoices();
      set({ invoices, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
}));
