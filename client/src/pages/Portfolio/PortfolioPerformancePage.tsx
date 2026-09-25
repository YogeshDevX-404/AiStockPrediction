import React, { useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/buttons/Button';
import { useAnalyticsStore } from '@/store/useAnalyticsStore';
import { TrendingUp, ArrowLeft, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PortfolioPerformancePage: React.FC = () => {
  const navigate = useNavigate();
  const { performance, fetchAnalyticsAndPerformance } = useAnalyticsStore();

  useEffect(() => {
    fetchAnalyticsAndPerformance();
  }, [fetchAnalyticsAndPerformance]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between glass-panel p-6 border-border/50">
        <div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h1 className="text-2xl font-black font-display text-foreground">Portfolio Performance & Benchmark ROI</h1>
          </div>
          <p className="text-xs text-muted-foreground">Historical return analysis benchmarked against S&P 500 & NASDAQ index baselines.</p>
        </div>

        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/portfolio/risk')}>
          Risk Center
        </Button>
      </div>

      <GlassCard className="space-y-4 p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="border-b border-border/50 text-muted-foreground uppercase font-sans">
              <tr>
                <th className="pb-3 font-semibold">Horizon Period</th>
                <th className="pb-3 font-semibold">Portfolio Return (%)</th>
                <th className="pb-3 font-semibold">S&P 500 Benchmark (%)</th>
                <th className="pb-3 font-semibold text-right font-sans">Alpha Outperformance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {performance.map((p) => {
                const alpha = (p.portfolioReturn - p.benchmarkReturn).toFixed(2);
                return (
                  <tr key={p.period} className="hover:bg-foreground/5">
                    <td className="py-3 font-bold text-foreground font-sans">{p.period} Return</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400 font-extrabold">+{p.portfolioReturn}%</td>
                    <td className="py-3 text-muted-foreground font-bold">+{p.benchmarkReturn}%</td>
                    <td className="py-3 text-right font-sans font-bold">
                      <Badge variant="emerald">+{alpha}% ALPHA</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
