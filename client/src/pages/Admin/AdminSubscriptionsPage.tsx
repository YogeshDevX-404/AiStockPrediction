import React from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { CreditCard, ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdminSubscriptionsPage: React.FC = () => {
  const navigate = useNavigate();

  const plans = [
    { name: 'Free Tier', price: '$0', users: 1420, features: ['Real-time Quotes', 'Basic Watchlist', 'Daily News Feed'] },
    { name: 'Pro Tier', price: '$49/mo', users: 380, features: ['AI Predictions', 'Pattern Detection', 'Smart Alerts'] },
    { name: 'Enterprise Tier', price: '$199/mo', users: 45, features: ['Unlimited Copilot', 'Vision OCR', 'Quant Risk Analytics'] },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-border/50">
        <div>
          <div className="flex items-center space-x-2">
            <CreditCard className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-2xl font-black font-display text-foreground">Subscription Plans & Billing Overview</h1>
          </div>
          <p className="text-xs text-muted-foreground">Monitor active SaaS subscriptions, tier distribution, and feature entitlments.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/admin')}>
          Console Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((p) => (
          <GlassCard key={p.name} className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-foreground font-display">{p.name}</h2>
              <Badge variant="purple">{p.users} Active Users</Badge>
            </div>
            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{p.price}</div>
            <ul className="space-y-2 text-xs text-muted-foreground border-t border-border/50 pt-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
