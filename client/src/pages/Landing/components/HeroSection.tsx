import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/buttons/Button';
import { Sparkles, ArrowRight, Play, TrendingUp, ShieldCheck, Zap, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Aurora & Gradient Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-tr from-emerald-600/25 via-blue-600/25 to-purple-600/25 blur-[160px] pointer-events-none rounded-full animate-pulse" />
      <div className="absolute top-1/4 right-10 w-[300px] h-[300px] bg-emerald-500/20 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-purple-500/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Hero Text Content */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-pill border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-wide uppercase shadow-lg shadow-emerald-950/40"
          >
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-spin" />
            <span>Enterprise AI Autonomous Market Intelligence</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-foreground leading-[1.1]"
          >
            AI Powered <br />
            <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Stock Intelligence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed font-sans"
          >
            Analyze Markets, Predict Trends, Build Smarter Investments with real-time neural models, order flow analytics, and automated trade execution signals.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <Link to={ROUTES.REGISTER}>
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto px-8 py-3.5 text-base shadow-xl shadow-emerald-950/50"
                rightIcon={<ArrowRight className="w-5 h-5" />}
              >
                Start Free
              </Button>
            </Link>
            <Link to={ROUTES.DASHBOARD}>
              <Button
                variant="glass"
                size="lg"
                className="w-full sm:w-auto px-8 py-3.5 text-base"
                leftIcon={<Play className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-400" />}
              >
                View Live Demo
              </Button>
            </Link>
          </motion.div>

          {/* Social Proof Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 pt-6 border-t border-border/50"
          >
            <div>
              <div className="text-2xl font-black font-display text-foreground">$14.2B+</div>
              <div className="text-xs text-muted-foreground">Assets Tracked</div>
            </div>
            <div>
              <div className="text-2xl font-black font-display text-emerald-600 dark:text-emerald-400">94.8%</div>
              <div className="text-xs text-muted-foreground">Model Accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-black font-display text-purple-600 dark:text-purple-400">&lt;15ms</div>
              <div className="text-xs text-muted-foreground">Signal Latency</div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Premium Floating Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-6 relative"
        >
          {/* Main Glass Dashboard Shell */}
          <div className="relative glass-card p-5 border border-white/15 rounded-[24px] shadow-2xl bg-[#090e1f]/80 backdrop-blur-2xl space-y-4 overflow-hidden">
            {/* Window Header Dots */}
            <div className="flex items-center justify-between pb-3 border-b border-border/50">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-[11px] font-mono text-muted-foreground">TradeGenius AI • Neural Engine v4.8</div>
              <span className="flex items-center text-[10px] text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 mr-1.5 animate-ping" />
                CONNECTED
              </span>
            </div>

            {/* Live Chart Header */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-black font-display text-foreground">NVDA</span>
                  <span className="text-xs text-muted-foreground">NVIDIA Corp</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    +3.45%
                  </span>
                </div>
                <div className="text-3xl font-black font-display text-foreground mt-1">$132.40</div>
              </div>

              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 space-y-1 text-right">
                <div className="text-[10px] uppercase font-bold text-purple-300">AI Recommendation</div>
                <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 flex items-center justify-end">
                  <Zap className="w-4 h-4 mr-1 text-emerald-600 dark:text-emerald-400" /> STRONG BUY
                </div>
              </div>
            </div>

            {/* Mock Animated Chart Lines */}
            <div className="h-44 w-full relative flex items-end justify-between px-2 pt-4 pb-2 border-b border-border/50 overflow-hidden">
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 120">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,90 Q50,40 100,70 T200,30 T300,50 T400,10 L400,120 L0,120 Z"
                  fill="url(#chartGrad)"
                />
                <path
                  d="M0,90 Q50,40 100,70 T200,30 T300,50 T400,10"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>

              {/* Pulsing Target Dot */}
              <div className="absolute top-[10px] right-[10px] w-4 h-4 rounded-full bg-emerald-500 dark:bg-emerald-400/40 flex items-center justify-center animate-ping">
                <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              </div>
            </div>

            {/* Bottom Row Widgets */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-white/[0.04] border border-border/50 flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground font-bold uppercase">Confidence Score</div>
                  <div className="text-sm font-extrabold text-foreground">94.8% (Extreme High)</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.04] border border-border/50 flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground font-bold uppercase">30D Target</div>
                  <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">$155.00 (+17.0%)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Card Overlay 1: Animated Profit Card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-6 -left-6 glass-card p-4 border border-emerald-500/30 rounded-2xl shadow-2xl bg-[#0b1329]/90 backdrop-blur-xl flex items-center space-x-3 text-left"
          >
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] text-muted-foreground font-bold uppercase">Portfolio Day Profit</div>
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-display">+$3,420.12 (+2.35%)</div>
            </div>
          </motion.div>

          {/* Floating Card Overlay 2: AI Neural Alert */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-6 -right-6 glass-card p-3.5 border border-purple-500/30 rounded-2xl shadow-2xl bg-[#120b29]/90 backdrop-blur-xl flex items-center space-x-3"
          >
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-purple-300 font-bold uppercase">Breakout Detected</div>
              <div className="text-xs font-bold text-foreground">TSLA Bullish MACD Crossover</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
