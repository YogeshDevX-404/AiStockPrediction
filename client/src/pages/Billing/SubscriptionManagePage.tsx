import React, { useState } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { useSubscriptionStore } from '@/store/useSubscriptionStore';
import { BillingApi } from '@/services/api/billingApi';
import { ShieldCheck, ArrowLeft, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export const SubscriptionManagePage: React.FC = () => {
  const navigate = useNavigate();
  const { subscription, upgradePlan, isUpgrading } = useSubscriptionStore();

  const [coupon, setCoupon] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupon) return;
    try {
      setIsValidating(true);
      const res = await BillingApi.validateCoupon(coupon);
      setIsValidating(false);
      if (res.isValid) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch {
      setIsValidating(false);
      toast.error('Failed to validate coupon.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-border/50">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-black font-display text-foreground">Subscription Management & Promo Codes</h1>
          </div>
          <p className="text-xs text-muted-foreground">Upgrade or downgrade plan tier, apply promotional discount coupons, or manage renewal status.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/billing')}>
          Billing Hub
        </Button>
      </div>

      <GlassCard className="p-6 space-y-6">
        <h2 className="text-base font-bold text-foreground font-display border-b border-border/50 pb-3">Redeem Promotional Coupon Code</h2>
        <form onSubmit={handleApplyCoupon} className="flex gap-3 text-xs">
          <div className="relative flex-1">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Enter code (e.g. GENIUS20, ALPHA50)"
              className="w-full glass-panel border border-border/50 rounded-xl px-3 py-2 text-foreground font-mono placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <Button type="submit" variant="accent" size="sm" isLoading={isValidating} leftIcon={<Tag className="w-4 h-4" />}>
            Apply Coupon
          </Button>
        </form>
      </GlassCard>
    </div>
  );
};
