import React, { useEffect } from 'react';
import { PricingCard } from './components/PricingCard';
import { useBillingStore } from '@/store/useBillingStore';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { CreditCard, Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const { plans, billingCycle, setBillingCycle, fetchPlans } = useBillingStore();
  const { subscription, upgradePlan } = useSubscriptionStore();

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleUpgrade = async (tier: 'FREE' | 'PRO' | 'ENTERPRISE') => {
    await upgradePlan(tier);
    navigate('/billing');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="purple">FLEXIBLE SAAS PRICING TIERS</Badge>
        <h1 className="text-3xl font-black font-display text-white">Unlock Enterprise AI Quant Intelligence</h1>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Select the optimal plan tier designed for individual retail traders, algorithmic quants, and institutional funds.
        </p>

        {/* Monthly vs Yearly Toggle */}
        <div className="flex items-center justify-center space-x-3 pt-2">
          <span className={`text-xs font-bold ${billingCycle === 'MONTHLY' ? 'text-white' : 'text-slate-400'}`}>Monthly</span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'MONTHLY' ? 'YEARLY' : 'MONTHLY')}
            className="w-12 h-6 rounded-full bg-purple-600/40 p-1 flex items-center transition-all cursor-pointer"
          >
            <div className={`w-4 h-4 rounded-full bg-purple-400 transition-all ${billingCycle === 'YEARLY' ? 'translate-x-6' : ''}`} />
          </button>
          <div className="flex items-center space-x-1">
            <span className={`text-xs font-bold ${billingCycle === 'YEARLY' ? 'text-white' : 'text-slate-400'}`}>Yearly</span>
            <Badge variant="emerald">SAVE 20%</Badge>
          </div>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <PricingCard
            key={p.id}
            plan={p}
            isYearly={billingCycle === 'YEARLY'}
            currentTier={subscription.planTier}
            onUpgrade={handleUpgrade}
          />
        ))}
      </div>
    </div>
  );
};
