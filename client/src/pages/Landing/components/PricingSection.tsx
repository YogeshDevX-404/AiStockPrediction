import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/cards/GlassCard';
import { Button } from '@/components/buttons/Button';
import { Badge } from '@/components/ui/Badge';
import { Check, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  highlight?: boolean;
  badge?: string;
  features: string[];
  cta: string;
}

const tiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever free',
    description: 'Perfect for beginner traders exploring market quotes and basic watchlists.',
    features: [
      'Real-time delayed stock quotes (15-min)',
      'Up to 3 Custom Watchlists',
      'Basic Technical Analysis Charts',
      'Daily Top 5 Market News Summary',
      'Community Trading Forum Access',
    ],
    cta: 'Get Started Free',
  },
  {
    name: 'Pro Trader',
    price: '$49',
    period: 'per month',
    description: 'For active traders demanding real-time AI predictions and order flow signals.',
    highlight: true,
    badge: 'MOST POPULAR',
    features: [
      'Sub-millisecond Real-Time Market Ticks',
      'Unlimited AI Neural Buy/Sell Signals',
      'Unlimited Watchlists & Portfolios',
      'TradingView Screenshot Vision AI Analysis',
      'ChatGPT-5 Financial Assistant (Unlimited)',
      'Automated Trailing Stop & Risk Controls',
      'Paper Trading Sandbox with $100k Cash',
    ],
    cta: 'Start 14-Day Free Trial',
  },
  {
    name: 'Enterprise',
    price: '$199',
    period: 'per month',
    description: 'Dedicated institutional infrastructure with custom model fine-tuning.',
    features: [
      'Everything in Pro Trader',
      'Dedicated Institutional API Gateway (FIX/REST)',
      'Sub-15ms Low Latency Execution Signals',
      'Custom AI Neural Model Fine-Tuning',
      'Dedicated Quant Analyst Support 24/7',
      'Multi-User Team Sub-Accounts & SLA',
    ],
    cta: 'Contact Sales',
  },
];

export const PricingSection: React.FC = () => {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="emerald" className="px-4 py-1 text-xs">
          TRANSPARENT PRICING
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
          Invest in Your <br />
          <span className="emerald-gradient-text">Unfair Advantage</span>
        </h2>
        <p className="text-slate-400 text-base leading-relaxed">
          No hidden fees. Cancel anytime with a 100% 30-day money-back guarantee.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier, idx) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="flex"
          >
            <GlassCard
              glow={tier.highlight}
              className={`w-full p-8 rounded-[32px] flex flex-col justify-between space-y-8 relative overflow-hidden transition-all duration-300 ${
                tier.highlight
                  ? 'border-2 border-emerald-500/60 bg-gradient-to-b from-emerald-950/40 via-[#0a1226] to-[#060914] shadow-2xl shadow-emerald-950/50 -translate-y-2'
                  : 'border border-white/10 bg-[#070b1a]/70 hover:border-white/20'
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-4 py-1 rounded-bl-2xl shadow-md">
                  {tier.badge}
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black font-display text-white">{tier.name}</h3>
                  <p className="text-xs text-slate-400 min-h-[36px]">{tier.description}</p>
                </div>

                <div className="flex items-baseline space-x-2">
                  <span className="text-4xl sm:text-5xl font-black font-display text-white">{tier.price}</span>
                  <span className="text-xs font-semibold text-slate-400">/{tier.period}</span>
                </div>

                <div className="border-t border-white/10 pt-6 space-y-3">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Included Features:</div>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2.5">
                        <div className={`p-0.5 rounded-full shrink-0 mt-0.5 ${tier.highlight ? 'bg-emerald-500 text-slate-950' : 'bg-white/10 text-emerald-400'}`}>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link to={ROUTES.REGISTER} className="w-full pt-4">
                <Button
                  variant={tier.highlight ? 'primary' : 'glass'}
                  size="lg"
                  className="w-full shadow-lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {tier.cta}
                </Button>
              </Link>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
