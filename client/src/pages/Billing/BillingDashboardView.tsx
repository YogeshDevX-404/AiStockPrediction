import React, { useEffect } from 'react';
import { UsageGaugeWidget } from './components/UsageGaugeWidget';
import { InvoiceTable } from './components/InvoiceTable';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import { useUsageStore } from '@/store/useUsageStore';
import { useInvoiceStore } from '@/store/useInvoiceStore';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { CreditCard, FileText, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BillingDashboardView: React.FC = () => {
  const navigate = useNavigate();
  const { subscription, fetchSubscription } = useSubscriptionStore();
  const { usageMeters, fetchUsage } = useUsageStore();
  const { invoices, fetchInvoices } = useInvoiceStore();

  useEffect(() => {
    fetchSubscription();
    fetchUsage();
    fetchInvoices();
  }, [fetchSubscription, fetchUsage, fetchInvoices]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-card to-emerald-950/20">
        <div>
          <div className="flex items-center space-x-2">
            <CreditCard className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">SaaS Subscription & Billing Platform</h1>
            <Badge variant="purple">{subscription.planTier} TIER ACTIVE</Badge>
          </div>
          <p className="text-xs text-slate-400">Provider-agnostic payment gateway management, resource consumption, and invoice statements.</p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Button variant="accent" size="sm" leftIcon={<Sparkles className="w-4 h-4" />} onClick={() => navigate('/pricing')}>
            Upgrade Plan
          </Button>
          <Button variant="glass" size="sm" leftIcon={<FileText className="w-4 h-4 text-emerald-400" />} onClick={() => navigate('/billing/invoices')}>
            Invoices
          </Button>
        </div>
      </div>

      {/* Grid: Active Plan Details & Usage Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard glow className="p-6 space-y-4 border-purple-500/30">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-white font-display">Active Plan & Entitlements</h2>
            <Badge variant="emerald">{subscription.status}</Badge>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 space-y-2 text-xs">
            <div className="flex justify-between font-mono">
              <span className="text-slate-400">Current Billing Cycle End:</span>
              <span className="text-white font-bold">{new Date(subscription.currentPeriodEnd).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between font-mono">
              <span className="text-slate-400">Payment Gateway Adapter:</span>
              <span className="text-purple-400 font-bold">{subscription.providerName} Provider</span>
            </div>
          </div>

          <Button variant="glass" size="sm" className="w-full" onClick={() => navigate('/subscription/manage')}>
            Manage Subscription Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </GlassCard>

        <UsageGaugeWidget meters={usageMeters} />
      </div>

      <InvoiceTable invoices={invoices} />
    </div>
  );
};
