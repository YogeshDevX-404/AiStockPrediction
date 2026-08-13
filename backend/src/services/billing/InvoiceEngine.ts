export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  amount: number;
  tax: number;
  status: 'PAID' | 'PENDING' | 'FAILED';
  createdAt: string;
  pdfUrl: string;
}

export class InvoiceEngine {
  public static getInvoices(): InvoiceItem[] {
    return [
      { id: 'inv-1', invoiceNumber: 'INV-2026-001', amount: 49.0, tax: 4.41, status: 'PAID', createdAt: '2026-08-01T00:00:00Z', pdfUrl: '/invoices/INV-2026-001.pdf' },
      { id: 'inv-2', invoiceNumber: 'INV-2026-002', amount: 49.0, tax: 4.41, status: 'PAID', createdAt: '2026-07-01T00:00:00Z', pdfUrl: '/invoices/INV-2026-002.pdf' },
    ];
  }
}
