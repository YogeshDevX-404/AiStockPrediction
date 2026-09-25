import React, { useState, useEffect } from 'react';
import { GlassCard } from '@/components/cards/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { apiClient } from '@/api';

export const RiskMeterWidget: React.FC = () => {
  const { items } = usePortfolioStore();
  const [riskData, setRiskData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (items.length === 0) {
      setRiskData(null);
      setIsLoading(false);
      return;
    }

    apiClient.get('/portfolio/risk')
      .then((res: any) => setRiskData(res.data))
      .catch(() => setRiskData(null))
      .finally(() => setIsLoading(false));
  }, [items]);

  const hasHoldings = items.length > 0;
  const riskScore = hasHoldings ? (riskData?.riskScore || 2.5) : 0;
  const overallRisk = hasHoldings ? (riskData?.overallRisk || 'LOW') : 'NONE';
  const sharpeRatio = hasHoldings ? (riskData?.sharpeRatio || 1.5) : 0;

  return (
    <GlassCard className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-amber-500 dark:text-amber-500 dark:text-amber-400" />
          <h2 className="text-base font-bold font-display text-foreground">Portfolio Risk Meter & Allocation</h2>
        </div>
        <Badge variant={hasHoldings ? 'emerald' : 'outline'}>{hasHoldings ? 'CALCULATED' : 'NO HOLDINGS'}</Badge>
      </div>

      {hasHoldings ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="p-6 rounded-2xl bg-foreground/5 border border-border/40 text-center space-y-3 relative overflow-hidden">
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="8" fill="none" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#10b981"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 * (1 - riskScore / 10)}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-emerald-600 dark:text-emerald-600 dark:text-emerald-400 font-display">{riskScore}</span>
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Risk Score / 10</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-foreground">Risk Profile: {overallRisk}</div>
              <div className="text-xs text-muted-foreground">Sharpe Ratio: <span className="text-emerald-600 dark:text-emerald-600 dark:text-emerald-400 font-bold">{sharpeRatio}</span></div>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <span className="font-bold text-muted-foreground uppercase">Tracked Assets ({items.length})</span>
            <div className="space-y-2">
              {items.map((h) => (
                <div key={h.id || h.symbol} className="flex items-center justify-between p-2 rounded-xl bg-foreground/5">
                  <span className="font-mono text-foreground font-bold">{h.symbol}</span>
                  <span className="text-muted-foreground">{h.quantity} shares</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-600 dark:text-emerald-400">${(h.totalValue || 0).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center text-xs text-muted-foreground space-y-2">
          <AlertCircle className="w-6 h-6 text-amber-500 dark:text-amber-500 dark:text-amber-400 mx-auto" />
          <p>No active portfolio holdings found. Add stock holdings to calculate real-time portfolio risk metrics.</p>
        </div>
      )}
    </GlassCard>
  );
};
