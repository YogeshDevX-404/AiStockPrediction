import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import {
  Activity,
  Sparkles,
  PieChart,
  Camera,
  Newspaper,
  Bot,
  Star,
  Gamepad2,
} from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  badge: string;
}

const features: Feature[] = [
  {
    title: 'Live Tracking',
    description: 'High-frequency order book tracking with sub-millisecond execution updates and institutional tick feeds.',
    icon: <Activity className="w-6 h-6 text-emerald-400" />,
    gradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
    badge: 'REALTIME',
  },
  {
    title: 'AI Prediction Signals',
    description: 'Deep neural networks analyzing multi-factor technical indicators to generate probabilistic target prices.',
    icon: <Sparkles className="w-6 h-6 text-purple-400" />,
    gradient: 'from-purple-500/20 via-purple-500/5 to-transparent',
    badge: 'NEURAL AI',
  },
  {
    title: 'Portfolio Analytics',
    description: 'Institutional-grade Sharpe ratio, drawdown risk metrics, and automated asset rebalancing suggestions.',
    icon: <PieChart className="w-6 h-6 text-blue-400" />,
    gradient: 'from-blue-500/20 via-blue-500/5 to-transparent',
    badge: 'ANALYTICS',
  },
  {
    title: 'Screenshot Analysis',
    description: 'Upload any TradingView chart screenshot and get immediate AI vision identification of support/resistance.',
    icon: <Camera className="w-6 h-6 text-amber-400" />,
    gradient: 'from-amber-500/20 via-amber-500/5 to-transparent',
    badge: 'VISION AI',
  },
  {
    title: 'Market News Sentiment',
    description: 'Real-time NLP sentiment analysis across SEC filings, Bloomberg terminals, and social sentiment streams.',
    icon: <Newspaper className="w-6 h-6 text-cyan-400" />,
    gradient: 'from-cyan-500/20 via-cyan-500/5 to-transparent',
    badge: 'SENTIMENT',
  },
  {
    title: 'AI Chat Assistant',
    description: 'ChatGPT-style financial co-pilot trained on macroeconomic data, SEC 10-K filings, and level-2 depth.',
    icon: <Bot className="w-6 h-6 text-indigo-400" />,
    gradient: 'from-indigo-500/20 via-indigo-500/5 to-transparent',
    badge: 'CO-PILOT',
  },
  {
    title: 'Smart Watchlists',
    description: 'Customizable watchlists with volatility alerts, threshold triggers, and real-time news correlation.',
    icon: <Star className="w-6 h-6 text-yellow-400" />,
    gradient: 'from-yellow-500/20 via-yellow-500/5 to-transparent',
    badge: 'SMART ALERTS',
  },
  {
    title: 'Paper Trading',
    description: 'Risk-free simulated execution sandbox with $100k virtual funds to test AI strategies live.',
    icon: <Gamepad2 className="w-6 h-6 text-rose-400" />,
    gradient: 'from-rose-500/20 via-rose-500/5 to-transparent',
    badge: 'SANDBOX',
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 relative">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="purple" className="px-4 py-1 text-xs">
          ENGINEERED FOR ALPHA GENERATION
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white">
          Institutional Capabilities, <br />
          <span className="emerald-gradient-text">Designed for Tomorrow</span>
        </h2>
        <p className="text-slate-400 text-base leading-relaxed">
          TradeGenius AI integrates advanced deep learning models with institutional market infrastructure to give you an unbeatable edge.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feat, idx) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
          >
            <GlassCard
              glow
              className="h-full p-6 space-y-4 border border-white/10 hover:border-white/25 transition-all duration-300 group hover:-translate-y-1 bg-[#090e1f]/70"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${feat.gradient} border border-white/10 shadow-lg group-hover:scale-110 transition-transform`}>
                  {feat.icon}
                </div>
                <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                  {feat.badge}
                </Badge>
              </div>

              <div className="space-y-2 pt-2">
                <h3 className="text-lg font-bold font-display text-white group-hover:text-emerald-400 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {feat.description}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
