import React, { useEffect } from 'react';
import { UsageGaugeWidget } from './components/UsageGaugeWidget';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import { useUsageStore } from '@/store/useUsageStore';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SubscriptionPage: React.FC = () => {
  const navigate = useNavigate();
  const { subscription, fetchSubscription } = useSubscriptionStore();
  const { usageMeters, fetchUsage } = useUsageStore();

  useEffect(() => {
    fetchSubscription();
    fetchUsage();
  }, [fetchSubscription, fetchUsage]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-white/10">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">Subscription Entitlements & Features</h1>
            <Badge variant="purple">{subscription.planTier} PLAN</Badge>
          </div>
          <p className="text-xs text-slate-400">View active feature entitlements, query limits, and consumption gauges.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/billing')}>
          Billing Hub
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6 space-y-4">
          <h2 className="text-base font-bold text-white font-display border-b border-white/10 pb-3">Feature Entitlements Matrix</h2>
          <div className="space-y-3 text-xs">
            {Object.entries(subscription.entitlements).map(([key, enabled]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-slate-300 font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <Badge variant={enabled ? 'emerald' : 'red'}>{enabled ? 'ENABLED' : 'DISABLED'}</Badge>
              </div>
            ))}
          </div>
        </GlassCard>

        <UsageGaugeWidget meters={usageMeters} />
      </div>
    </div>
  );
};
