import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Check, X, Sparkles, TrendingUp } from 'lucide-react';

interface ComparisonRow {
  feature: string;
  tradegenius: string;
  traditional: string;
}

const comparisons: ComparisonRow[] = [
  {
    feature: 'AI Neural Market Insights',
    tradegenius: 'Sub-millisecond multi-model order book predictions',
    traditional: 'Manual chart plotting & delayed news reports',
  },
  {
    feature: 'Trade & Risk Automation',
    tradegenius: 'Autonomous trailing stop-loss & risk factor hedging',
    traditional: 'Fixed manual order entries prone to emotion',
  },
  {
    feature: 'Predictive Price Targets',
    tradegenius: 'Probabilistic target prices with 94.8% accuracy score',
    traditional: 'Guesswork based on lagging 200-day moving averages',
  },
  {
    feature: 'Risk Management',
    tradegenius: 'Real-time Value at Risk (VaR) & Sharpe optimization',
    traditional: 'Basic static asset allocation percentages',
  },
  {
    feature: 'Portfolio Deep Analysis',
    tradegenius: 'Instant SEC filing parsing & macro correlation matrix',
    traditional: 'Superficial backward-looking quarterly statements',
  },
];

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="emerald" className="px-4 py-1 text-xs">
          THE UNFAIR ADVANTAGE
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
          TradeGenius AI vs <br />
          <span className="text-slate-400">Traditional Trading</span>
        </h2>
        <p className="text-slate-400 text-base leading-relaxed">
          See why modern quantitative funds and retail investors are switching to TradeGenius AI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: TradeGenius AI Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7"
        >
          <GlassCard
            glow
            className="p-8 border-2 border-emerald-500/40 rounded-[28px] bg-gradient-to-br from-emerald-950/40 via-[#0b1429] to-[#070b1a] shadow-2xl space-y-6 relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-lg">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-black font-display text-white">TradeGenius AI</h3>
                  <p className="text-xs text-emerald-400 font-semibold">Autonomous Intelligence</p>
                </div>
              </div>
              <Badge variant="emerald">RECOMMENDED</Badge>
            </div>

            <div className="space-y-4">
              {comparisons.map((row, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-emerald-500/[0.05] border border-emerald-500/15 flex items-start space-x-3">
                  <div className="p-1.5 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-300 uppercase tracking-wide">{row.feature}</div>
                    <div className="text-sm font-semibold text-white mt-0.5">{row.tradegenius}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Right Column: Traditional Trading Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5"
        >
          <GlassCard className="p-8 border border-white/10 rounded-[28px] bg-[#070b19]/60 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-2xl font-black font-display text-slate-400">Traditional Brokers</h3>
                <p className="text-xs text-slate-500 font-semibold">Legacy Platforms</p>
              </div>
              <Badge variant="outline">LEGACY</Badge>
            </div>

            <div className="space-y-4">
              {comparisons.map((row, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-start space-x-3">
                  <div className="p-1.5 rounded-full bg-red-500/10 text-red-400 shrink-0 mt-0.5">
                    <X className="w-4 h-4 stroke-[3]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{row.feature}</div>
                    <div className="text-xs font-medium text-slate-400 mt-0.5">{row.traditional}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};
