import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Camera, Sparkles, TrendingUp, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const ScreenshotAnalysis: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="emerald" className="px-4 py-1 text-xs">
          COMPUTER VISION AI
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
          Instant Chart <br />
          <span className="emerald-gradient-text">Screenshot Analysis</span>
        </h2>
        <p className="text-slate-400 text-base leading-relaxed">
          Drop any TradingView chart screenshot or technical pattern image. Our multi-modal vision model detects support, resistance, and breakouts in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Mock TradingView Chart Screenshot */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7"
        >
          <div className="relative glass-card p-4 border border-white/15 rounded-[28px] bg-[#080d1f] shadow-2xl space-y-3 overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center space-x-2">
                <Camera className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white font-mono">TradingView_AAPL_1D_Chart.png</span>
              </div>
              <Badge variant="emerald">VISION ANALYZED</Badge>
            </div>

            {/* Simulated Chart Image View */}
            <div className="h-64 w-full bg-[#0d1428] rounded-2xl relative flex flex-col justify-between p-4 border border-white/5 overflow-hidden">
              <div className="flex justify-between items-center text-[11px] font-mono text-slate-400">
                <span>AAPL • 1D • NASDAQ</span>
                <span className="text-emerald-400 font-bold">Pattern Identified: Ascending Triangle Breakout</span>
              </div>

              {/* Chart lines */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 150">
                {/* Support line */}
                <line x1="50" y1="120" x2="350" y2="40" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" />
                {/* Resistance line */}
                <line x1="50" y1="40" x2="350" y2="40" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
                {/* Price candles path */}
                <path
                  d="M50,110 L90,95 L130,105 L170,65 L210,75 L250,45 L290,50 L340,20"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                />
              </svg>

              <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-400 pt-32">
                <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                  Key Support: $215.00
                </span>
                <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/30">
                  Key Resistance: $225.00
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: AI Explanation Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5"
        >
          <GlassCard glow className="p-6 border border-emerald-500/30 rounded-[28px] bg-gradient-to-br from-emerald-950/30 to-[#070b1a] space-y-6">
            <div className="flex items-center space-x-2 text-emerald-400">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-xl font-bold font-display text-white">AI Vision Analysis Output</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-slate-400 font-semibold">Identified Trend</span>
                <span className="text-emerald-400 font-bold flex items-center">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" /> Bullish Ascending Triangle
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-slate-400 font-semibold">Primary Support</span>
                <span className="text-white font-mono font-bold">$215.00</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-slate-400 font-semibold">Primary Resistance</span>
                <span className="text-white font-mono font-bold">$225.00</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-slate-400 font-semibold">Signal Recommendation</span>
                <Badge variant="emerald">BUY BREAKOUT</Badge>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-slate-400 font-semibold">Confidence Score</span>
                <span className="text-purple-400 font-bold">92.4% High Conviction</span>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                <span className="text-slate-400 font-semibold">Breakout Probability</span>
                <span className="text-emerald-400 font-bold">88% Chance within 48H</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};
