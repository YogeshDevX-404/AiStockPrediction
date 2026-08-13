import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/cards/StatCard';
import { formatCurrency, formatPercent } from '@/utils/cn';
import {
  TrendingUp,
  PieChart,
  Activity,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Zap,
  Star,
  Flame,
} from 'lucide-react';

export const DashboardPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'heatmap' | 'analytics'>('overview');

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="blue" className="px-4 py-1 text-xs">
          COMMAND CENTER
        </Badge>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
          Next-Generation <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Trader Operating System
          </span>
        </h2>
        <p className="text-slate-400 text-base leading-relaxed">
          Everything you need to analyze, monitor, and execute positions in one unified interface.
        </p>
      </div>

      {/* Control Tabs */}
      <div className="flex justify-center">
        <div className="glass-panel p-1.5 rounded-2xl flex space-x-2 border border-white/10">
          {[
            { id: 'overview', label: 'Portfolio & AI Signals' },
            { id: 'heatmap', label: 'Market Heatmap' },
            { id: 'analytics', label: 'Risk Meter & Analytics' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Large Dashboard Frame */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-card p-6 border border-white/15 rounded-[32px] bg-[#070c1d]/90 shadow-2xl space-y-6"
      >
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Stat Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Portfolio Value"
                value={formatCurrency(148920.45)}
                change={2.35}
                changePeriod="today"
                icon={<PieChart className="w-5 h-5 text-emerald-400" />}
              />
              <StatCard
                title="Total Profit"
                value={formatCurrency(28450.8)}
                change={23.6}
                changePeriod="all time"
                icon={<TrendingUp className="w-5 h-5 text-blue-400" />}
              />
              <StatCard
                title="AI Recommendation"
                value="NVDA STRONG BUY"
                badgeText="Target $155.00"
                icon={<Zap className="w-5 h-5 text-purple-400" />}
              />
              <StatCard
                title="Risk Index"
                value="2.1 / 10"
                badgeText="Low Hazard"
                icon={<ShieldCheck className="w-5 h-5 text-amber-400" />}
              />
            </div>

            {/* Middle Grid: Profit Graph & Watchlist */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Profit Graph (8 cols) */}
              <GlassCard className="lg:col-span-8 space-y-4 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white font-display">Portfolio Equity Curve</h3>
                    <p className="text-xs text-slate-400">Real-time performance benchmarked against S&P 500</p>
                  </div>
                  <Badge variant="emerald">+23.6% Alpha</Badge>
                </div>

                <div className="h-56 w-full relative flex items-end justify-between px-2 pt-6 pb-2 border-b border-white/10 overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 150">
                    <path
                      d="M0,120 Q100,80 200,95 T350,30 T500,10 L500,150 L0,150 Z"
                      fill="rgba(16, 185, 129, 0.15)"
                    />
                    <path
                      d="M0,120 Q100,80 200,95 T350,30 T500,10"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                    />
                  </svg>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                  <span>Jan 2026</span>
                  <span>Mar 2026</span>
                  <span>May 2026</span>
                  <span>Jul 2026</span>
                </div>
              </GlassCard>

              {/* Watchlist Quick Panel (4 cols) */}
              <GlassCard className="lg:col-span-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-amber-400" />
                    <h3 className="text-base font-bold text-white font-display">Priority Watchlist</h3>
                  </div>
                  <Badge variant="outline">4 ASSETS</Badge>
                </div>

                <div className="space-y-2.5">
                  {[
                    { sym: 'NVDA', price: '$132.40', chg: '+3.45%', pos: true },
                    { sym: 'AAPL', price: '$224.50', chg: '+1.84%', pos: true },
                    { sym: 'TSLA', price: '$248.60', chg: '+4.25%', pos: true },
                    { sym: 'GOOGL', price: '$172.80', chg: '-0.45%', pos: false },
                  ].map((w) => (
                    <div key={w.sym} className="p-3 rounded-xl glass-panel flex items-center justify-between hover:bg-white/5 transition-colors">
                      <div className="font-extrabold text-sm text-white font-mono">{w.sym}</div>
                      <div className="text-xs font-semibold text-slate-300">{w.price}</div>
                      <span className={`text-xs font-bold ${w.pos ? 'text-emerald-400' : 'text-red-400'}`}>
                        {w.chg}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        )}

        {activeTab === 'heatmap' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-display flex items-center space-x-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <span>Sector Sentiment Market Heatmap</span>
              </h3>
              <Badge variant="purple">LIVE DEPTH</Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-1">
                <div className="text-xs font-bold text-emerald-300">SEMICONDUCTORS</div>
                <div className="text-2xl font-black text-emerald-400 font-display">+4.85%</div>
                <div className="text-[10px] text-slate-300">NVDA, AMD, TSM</div>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center space-y-1">
                <div className="text-xs font-bold text-emerald-300">CLOUD & SAAS</div>
                <div className="text-2xl font-black text-emerald-400 font-display">+2.40%</div>
                <div className="text-[10px] text-slate-300">MSFT, AMZN, ORCL</div>
              </div>
              <div className="p-6 rounded-2xl bg-red-500/20 border border-red-500/40 text-center space-y-1">
                <div className="text-xs font-bold text-red-300">ENERGY & OIL</div>
                <div className="text-2xl font-black text-red-400 font-display">-1.85%</div>
                <div className="text-[10px] text-slate-300">XOM, CVX</div>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-1">
                <div className="text-xs font-bold text-emerald-300">EV & AUTOMOTIVE</div>
                <div className="text-2xl font-black text-emerald-400 font-display">+3.90%</div>
                <div className="text-[10px] text-slate-300">TSLA, RIVN</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="space-y-4">
              <h3 className="text-base font-bold text-white font-display">Value at Risk (VaR) Breakdown</h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">99% Confidence 1-Day VaR</span>
                  <span className="text-white font-bold">$1,240.00 (0.83%)</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[15%]" />
                </div>

                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">Sharpe Ratio</span>
                  <span className="text-emerald-400 font-bold">2.84 (Exceptional)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sortino Ratio</span>
                  <span className="text-emerald-400 font-bold">3.45</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="space-y-4">
              <h3 className="text-base font-bold text-white font-display">Neural Model Health Meter</h3>
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-center space-y-2">
                <div className="text-3xl font-black text-purple-400 font-display">94.8%</div>
                <div className="text-xs font-bold text-white">Prediction Signal Reliability</div>
                <p className="text-[11px] text-slate-400">Trained on over 1.2 Billion market depth ticks.</p>
              </div>
            </GlassCard>
          </div>
        )}
      </motion.div>
    </section>
  );
};
