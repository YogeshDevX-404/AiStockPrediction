import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  review: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: 'Marcus Vance',
    role: 'Managing Partner',
    company: 'Vance Capital Quantitative',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    review: 'TradeGenius AI has cut our technical analysis time by 80%. The level-2 order book predictions are scarily accurate during high-volatility earnings announcements.',
    rating: 5,
  },
  {
    name: 'Elena Rostova',
    role: 'Senior Portfolio Analyst',
    company: 'Apex Horizon Fund',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    review: 'The Screenshot Vision AI feature is a game-changer. I upload chart patterns directly from TradingView and get probabilistic targets within seconds.',
    rating: 5,
  },
  {
    name: 'David Chen',
    role: 'Quantitative Trader',
    company: 'Aether Asset Management',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    review: 'Having the AI Co-Pilot parse SEC 10-K filings and instant sentiment feeds while I manage my portfolio gives me an unbeatable institutional edge.',
    rating: 5,
  },
  {
    name: 'Sarah Jenkins',
    role: 'Retail Investor',
    company: 'Independent Trader',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    review: 'I used to struggle with risk management and emotional trades. TradeGenius AI automated trailing stop-losses saved my portfolio during the recent tech pullback.',
    rating: 5,
  },
  {
    name: 'Rajesh Sharma',
    role: 'Head of Equities',
    company: 'Quantum Wealth India',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
    review: 'Supporting Indian market tickers like RELIANCE, TCS, and INFY alongside US stocks with real-time AI signals makes TradeGenius the ultimate platform.',
    rating: 5,
  },
  {
    name: 'Michael Thorne',
    role: 'Proprietary Trader',
    company: 'Thorne Trading Group',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    review: 'The UI aesthetics alone rival Apple and Stripe, but the underlying neural algorithms and low signal latency are what keep me subscribed for life.',
    rating: 5,
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="purple" className="px-4 py-1 text-xs">
          COMMUNITY PROOF
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-foreground tracking-tight">
          Trusted by Quantitative Funds & <br />
          <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Over 50,000 Traders WorldWide
          </span>
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Here is what institutional money managers and retail traders say about TradeGenius AI.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
          >
            <GlassCard className="p-6 h-full border border-border/50 hover:border-purple-500/30 rounded-[24px] bg-[#070b1a]/80 space-y-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1">
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-amber-500 dark:text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed italic font-sans">
                  "{t.review}"
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-border/40">
                <Avatar src={t.avatar} name={t.name} size="md" />
                <div>
                  <div className="text-sm font-bold text-foreground font-display">{t.name}</div>
                  <div className="text-[11px] text-muted-foreground">{t.role} • {t.company}</div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
