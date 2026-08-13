import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Bot, Sparkles, User, Send, CheckCircle2, Zap } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

export const AIChatPreview: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="purple" className="px-4 py-1 text-xs">
          FINANCIAL CO-PILOT
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
          Conversational <br />
          <span className="bg-gradient-to-r from-purple-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
            Market Co-Pilot
          </span>
        </h2>
        <p className="text-slate-400 text-base leading-relaxed">
          Ask complex quantitative questions in plain English and receive instant institutional-grade analysis.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="p-6 border border-white/15 rounded-[32px] bg-[#070b1c]/90 shadow-2xl space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-emerald-500 flex items-center justify-center text-white shadow-lg">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white font-display">TradeGenius Financial Assistant</h3>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Neural Model v4.8 Active</span>
                  </div>
                </div>
              </div>
              <Badge variant="purple">CHATGPT-5 ARCHITECTURE</Badge>
            </div>

            {/* Conversation Feed */}
            <div className="space-y-4 text-xs">
              {/* User Message */}
              <div className="flex items-start space-x-3 max-w-xl ml-auto flex-row-reverse space-x-reverse">
                <Avatar name="Alex Mercer" size="sm" />
                <div className="p-4 rounded-2xl bg-primary text-white font-medium rounded-tr-none shadow-lg">
                  Should I buy Tesla (TSLA) right now?
                </div>
              </div>

              {/* AI Response */}
              <div className="flex items-start space-x-3 max-w-2xl">
                <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="p-5 rounded-2xl glass-panel border border-white/10 text-slate-200 rounded-tl-none space-y-3">
                  <p className="leading-relaxed">
                    Based on our real-time multi-factor neural analysis for <strong className="text-white">Tesla, Inc. (TSLA)</strong>:
                  </p>

                  <ul className="space-y-1.5 text-slate-300">
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>Trend Signal:</strong> Current short-term trend is strongly bullish.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>Oscillators:</strong> 14-period RSI is oversold at 32.4 (Rebound Likelihood High).</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span><strong>Momentum:</strong> MACD bullish crossover detected on 4-Hour chart.</span>
                    </li>
                  </ul>

                  {/* Recommendation Card */}
                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                      <Zap className="w-4 h-4" />
                      <span>RECOMMENDATION: BUY</span>
                    </div>
                    <div className="text-xs font-bold text-white">
                      AI Confidence: <span className="text-purple-400 font-mono text-sm">82%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Bar Mock */}
            <div className="p-3 rounded-2xl glass-panel border border-white/10 flex items-center justify-between text-slate-400 text-xs">
              <span>Ask follow up question (e.g., What is the stop loss for TSLA?)...</span>
              <button className="p-2 rounded-xl bg-primary text-white">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};
