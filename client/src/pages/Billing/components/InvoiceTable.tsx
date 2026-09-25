import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { InvoiceItem } from '@/services/api/billingApi';
import { formatCurrency } from '@/utils/cn';
import { Download } from 'lucide-react';

export interface InvoiceTableProps {
  invoices: InvoiceItem[];
}

export const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices }) => {
  return (
    <GlassCard className="p-5 space-y-4">
      <h2 className="text-base font-bold text-foreground font-display border-b border-border/50 pb-3">Billing Invoice Statements</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="border-b border-border/50 text-muted-foreground uppercase font-sans">
            <tr>
              <th className="pb-3 font-semibold">Invoice Number</th>
              <th className="pb-3 font-semibold">Date</th>
              <th className="pb-3 font-semibold">Amount</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold text-right font-sans">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-foreground/5">
                <td className="py-3 font-bold text-foreground">{inv.invoiceNumber}</td>
                <td className="py-3 text-muted-foreground">{new Date(inv.createdAt).toLocaleDateString()}</td>
                <td className="py-3 text-foreground font-bold">{formatCurrency(inv.amount)}</td>
                <td className="py-3 font-sans">
                  <Badge variant={inv.status === 'PAID' ? 'emerald' : 'red'}>{inv.status}</Badge>
                </td>
                <td className="py-3 text-right font-sans">
                  <a
                    href={inv.pdfUrl}
                    download
                    className="inline-flex items-center space-x-1 text-purple-600 dark:text-purple-400 hover:text-purple-300 font-bold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
};
