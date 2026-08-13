import React, { useEffect } from 'react';
import { RiskGaugeCard } from './components/RiskGaugeCard';
import { ScenarioStressTestWidget } from './components/ScenarioStressTestWidget';
import { useRiskStore } from '@/store/useRiskStore';
import { useAnalyticsStore } from '@/store/useAnalyticsStore';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { ShieldCheck, PieChart, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PortfolioRiskPage: React.FC = () => {
  const navigate = useNavigate();
  const { metrics, fetchRiskMetrics } = useRiskStore();
  const { analytics, fetchAnalyticsAndPerformance } = useAnalyticsStore();

  useEffect(() => {
    fetchRiskMetrics();
    fetchAnalyticsAndPerformance();
  }, [fetchRiskMetrics, fetchAnalyticsAndPerformance]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-card to-emerald-950/20">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-black font-display text-white">Portfolio Risk Command Center</h1>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              QUANT ENGINE ACTIVE
            </span>
          </div>
          <p className="text-xs text-slate-400">Quantitative volatility metrics, Sharpe ratio optimization, Value at Risk (VaR), and stress scenario modeling.</p>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Button variant="glass" size="md" leftIcon={<PieChart className="w-4 h-4 text-purple-400" />} onClick={() => navigate('/portfolio/analytics')}>
            Sector Analytics
          </Button>
          <Button variant="glass" size="md" leftIcon={<TrendingUp className="w-4 h-4 text-emerald-400" />} onClick={() => navigate('/portfolio/performance')}>
            Performance ROI
          </Button>
        </div>
      </div>

      {/* Main Risk Gauge */}
      <RiskGaugeCard metrics={metrics} />

      {/* AI Portfolio Health & Rebalancing Suggestions */}
      <GlassCard className="p-5 space-y-3">
        <div className="flex items-center space-x-2 border-b border-white/10 pb-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h2 className="text-base font-bold text-white font-display">AI Portfolio Rebalancing Guidance</h2>
        </div>
        <div className="space-y-2 text-xs text-slate-300">
          {analytics.rebalancingSuggestions.map((sug, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{sug}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Stress Testing Scenarios */}
      <ScenarioStressTestWidget scenarios={analytics.scenarios} />
    </div>
  );
};
