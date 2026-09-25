import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { PlanDefinition } from '@/services/api/billingApi';
import { CheckCircle2, Sparkles } from 'lucide-react';

export interface PricingCardProps {
  plan: PlanDefinition;
  isYearly: boolean;
  currentTier: string;
  onUpgrade: (tier: 'FREE' | 'PRO' | 'ENTERPRISE') => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, isYearly, currentTier, onUpgrade }) => {
  const isCurrent = currentTier === plan.name;
  const isPopular = plan.name === 'PRO';
  const price = isYearly ? Math.round(plan.priceYearly / 12) : plan.priceMonthly;

  return (
    <GlassCard
      glow={isPopular}
      className={`p-6 space-y-6 flex flex-col justify-between transition-all ${
        isPopular ? 'border-purple-500/50 bg-gradient-to-b from-purple-950/40 via-card to-card' : ''
      }`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-foreground font-display">{plan.title}</h2>
          {isPopular && <Badge variant="purple">MOST POPULAR</Badge>}
          {isCurrent && <Badge variant="emerald">CURRENT PLAN</Badge>}
        </div>

        <p className="text-xs text-muted-foreground">{plan.description}</p>

        <div className="flex items-baseline space-x-1 font-mono">
          <span className="text-4xl font-black text-foreground">${price}</span>
          <span className="text-xs text-muted-foreground font-sans">/ month</span>
        </div>

        <div className="space-y-2 border-t border-border/50 pt-4 text-xs">
          {plan.features.map((feat, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant={isCurrent ? 'ghost' : isPopular ? 'primary' : 'accent'}
        size="md"
        className="w-full mt-4"
        disabled={isCurrent}
        onClick={() => onUpgrade(plan.name)}
      >
        {isCurrent ? 'Current Tier' : `Upgrade to ${plan.title}`}
      </Button>
    </GlassCard>
  );
};
