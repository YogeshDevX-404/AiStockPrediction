import React from 'react';
import { StatCard } from '@/components/cards/StatCard';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { formatCurrency, formatPercent } from '@/utils/cn';
import { PieChart, TrendingUp, DollarSign, Activity, ShieldCheck, Layers, Landmark } from 'lucide-react';

export const PortfolioSummaryCards: React.FC = () => {
  const { summary } = usePortfolioStore();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Investment"
          value={formatCurrency(summary.totalInvestment)}
          icon={<DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />
        <StatCard
          title="Current Portfolio Value"
          value={formatCurrency(summary.totalValue)}
          change={summary.todayProfitPercent}
          changePeriod="today"
          icon={<PieChart className="w-5 h-5 text-blue-400" />}
        />
        <StatCard
          title="Today's Profit / Loss"
          value={formatCurrency(summary.todayProfit)}
          change={summary.todayProfitPercent}
          changePeriod="24h gain"
          icon={<TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />
        <StatCard
          title="Overall Return (ROI %)"
          value={formatCurrency(summary.overallProfit)}
          change={summary.overallProfitPercent}
          changePeriod="all-time ROI"
          badgeText="+19.8% ROI"
          icon={<Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-2xl glass-panel border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground font-bold uppercase flex items-center">
            <Layers className="w-3.5 h-3.5 text-blue-400 mr-1" /> Active Positions
          </span>
          <div className="text-base font-extrabold text-foreground font-mono">{summary.totalHoldings} Holdings</div>
        </div>

        <div className="p-3 rounded-2xl glass-panel border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground font-bold uppercase flex items-center">
            <Landmark className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 mr-1" /> Available Cash
          </span>
          <div className="text-base font-extrabold text-foreground font-mono">{formatCurrency(summary.cashBalance)}</div>
        </div>

        <div className="p-3 rounded-2xl glass-panel border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground font-bold uppercase flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mr-1" /> Risk Profile
          </span>
          <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">2.1 LOW HAZARD</div>
        </div>

        <div className="p-3 rounded-2xl glass-panel border border-border/40 space-y-1">
          <span className="text-[10px] text-muted-foreground font-bold uppercase flex items-center">
            <Activity className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 mr-1" /> Diversification
          </span>
          <div className="text-base font-extrabold text-purple-600 dark:text-purple-400 font-mono">88 / 100 SCORE</div>
        </div>
      </div>
    </div>
  );
};
