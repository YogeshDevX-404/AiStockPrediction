import React from 'react';
import { StatCard } from '@/components/cards/StatCard';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import { formatCurrency } from '@/utils/cn';
import { PieChart, TrendingUp, DollarSign, Activity } from 'lucide-react';

export const PortfolioOverviewWidget: React.FC = () => {
  const { summary } = usePortfolioStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold font-display text-foreground">Portfolio Overview</h2>
        <span className="text-xs text-muted-foreground font-mono">Live Equity Tracked</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Investment"
          value={formatCurrency(summary.totalInvestment)}
          icon={<DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-600 dark:text-emerald-600 dark:text-emerald-400" />}
          className="bg-emerald-50/50 dark:bg-transparent"
        />
        <StatCard
          title="Current Portfolio Value"
          value={formatCurrency(summary.totalValue)}
          change={summary.todayProfitPercent}
          changePeriod="today"
          icon={<PieChart className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
          className="bg-blue-50/50 dark:bg-transparent"
        />
        <StatCard
          title="Today's Profit / Loss"
          value={formatCurrency(summary.todayProfit)}
          change={summary.todayProfitPercent}
          changePeriod="24h"
          icon={<TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-600 dark:text-emerald-600 dark:text-emerald-400" />}
          className="bg-emerald-50/50 dark:bg-transparent"
        />
        <StatCard
          title="Overall Return"
          value={formatCurrency(summary.overallProfit)}
          change={summary.overallProfitPercent}
          changePeriod="all-time return"
          badgeText="+19.8% Alpha"
          icon={<Activity className="w-5 h-5 text-purple-600 dark:text-purple-600 dark:text-purple-600 dark:text-purple-400" />}
          className="bg-purple-50/50 dark:bg-transparent"
        />
      </div>
    </div>
  );
};
