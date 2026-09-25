import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How accurate are the AI stock price target predictions?',
    answer: 'TradeGenius AI neural models maintain a historical backtested accuracy rating of 94.8% across mega-cap equities and liquid futures. Our multi-layer deep learning architecture evaluates Level-2 order book depth, technical momentum indicators, and SEC filings in real-time.',
  },
  {
    question: 'Does TradeGenius AI support real-time execution via brokerages?',
    answer: 'Yes. Pro Trader and Enterprise tiers support direct API integration with leading brokers including Interactive Brokers, Zerodha Kite, Alpaca, and Tradier for automated trade placement and trailing stop execution.',
  },
  {
    question: 'How does the Screenshot Vision AI chart analysis work?',
    answer: 'Our proprietary computer vision model accepts any chart image (from TradingView, Zerodha, or Thinkorswim). It automatically detects candlestick trendlines, support/resistance zones, and classic chart patterns (head & shoulders, double bottoms, ascending triangles) within seconds.',
  },
  {
    question: 'Can I use TradeGenius AI for cryptocurrency and Indian market equities?',
    answer: 'Absoluty! We provide real-time ticker coverage across US Stocks (NASDAQ/NYSE), Crypto pairs (BTC, ETH, SOL), and Indian Equities (NSE/BSE top 100 tickers including RELIANCE, TCS, INFY, HDFC).',
  },
  {
    question: 'Is paper trading with virtual funds included in all accounts?',
    answer: 'Yes! All accounts include access to our paper trading sandbox pre-loaded with $100,000 in virtual capital so you can test AI neural signals without risking real funds.',
  },
  {
    question: 'How does the ChatGPT-style financial co-pilot process market news?',
    answer: 'Our co-pilot connects directly to Bloomberg, Reuters, SEC EDGAR feeds, and social sentiment channels. It uses real-time Natural Language Processing (NLP) to summarize 10-K quarterly reports and earnings call transcripts into actionable bullet points.',
  },
  {
    question: 'What security measures protect my API keys and personal data?',
    answer: 'We employ 256-bit AES encryption for all stored credentials and TLS 1.3 in transit. Your brokerage API keys are stored in secure hardware security modules (HSM) with zero-knowledge architecture.',
  },
  {
    question: 'Can I upgrade, downgrade, or cancel my subscription at any time?',
    answer: 'Yes, you can manage your plan directly from the account settings tab with zero penalties. All subscriptions come with a 30-day money-back guarantee.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-16">
      <div className="text-center space-y-4">
        <Badge variant="emerald" className="px-4 py-1 text-xs">
          GOT QUESTIONS?
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-foreground tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Everything you need to know about TradeGenius AI technology, pricing, and execution.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <GlassCard
              key={idx}
              className="p-5 border border-border/50 rounded-2xl bg-[#070b1a]/80 cursor-pointer transition-all duration-200 hover:border-emerald-500/30"
              onClick={() => setOpenIdx(isOpen ? null : idx)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-sm sm:text-base font-bold text-foreground font-display">
                  <HelpCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{faq.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-muted-foreground p-1"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-4 border-t border-border/40 mt-3 font-sans">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
};
