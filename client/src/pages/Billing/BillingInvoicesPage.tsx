import React, { useEffect } from 'react';
import { InvoiceTable } from './components/InvoiceTable';
import { useInvoiceStore } from '@/store/useInvoiceStore';
import { Button } from '@/components/buttons/Button';
import { FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BillingInvoicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { invoices, fetchInvoices } = useInvoiceStore();

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">Invoice Statements Workspace</h1>
          </div>
          <p className="text-xs text-slate-400">Download PDF receipts and tax statements for financial accounting.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/billing')}>
          Billing Hub
        </Button>
      </div>

      <InvoiceTable invoices={invoices} />
    </div>
  );
};
