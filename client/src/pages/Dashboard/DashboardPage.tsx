import React from 'react';
import { QuickActionsToolbar } from './widgets/QuickActionsToolbar';
import { PortfolioOverviewWidget } from './widgets/PortfolioOverviewWidget';
import { MarketOverviewWidget } from './widgets/MarketOverviewWidget';
import { AIRecommendationWidget } from './widgets/AIRecommendationWidget';
import { TopGainersLosersWidget } from './widgets/TopGainersLosersWidget';
import { WatchlistWidget } from './widgets/WatchlistWidget';
import { RecentActivityWidget } from './widgets/RecentActivityWidget';
import { AIInsightsWidget } from './widgets/AIInsightsWidget';
import { RiskMeterWidget } from './widgets/RiskMeterWidget';
import { LatestNewsWidget } from './widgets/LatestNewsWidget';
import { EconomicCalendarWidget } from './widgets/EconomicCalendarWidget';
import { CryptoOverviewWidget } from './widgets/CryptoOverviewWidget';
import { MarketHeatmapWidget } from './widgets/MarketHeatmapWidget';
import { AIPerformanceWidget } from './widgets/AIPerformanceWidget';
import { TradingPerformanceWidget } from './widgets/TradingPerformanceWidget';
import { RightInsightPanel } from '@/components/layout/RightInsightPanel';

export const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Main Dashboard Grid Stream (15 Sections) */}
      <div className="flex-1 space-y-6 w-full min-w-0">
        {/* Quick Actions Bar */}
        <QuickActionsToolbar />

        {/* Section 1: Portfolio Overview */}
        <PortfolioOverviewWidget />

        {/* Section 2: Market Overview */}
        <MarketOverviewWidget />

        {/* Section 3: AI Recommendation */}
        <AIRecommendationWidget />

        {/* Section 4 & 5: Top Gainers & Top Losers */}
        <TopGainersLosersWidget />

        {/* Section 6: Watchlist */}
        <WatchlistWidget />

        {/* Section 7: Recent Activity */}
        <RecentActivityWidget />

        {/* Section 8: AI Insights */}
        <AIInsightsWidget />

        {/* Section 9: Risk Meter & Allocation */}
        <RiskMeterWidget />

        {/* Section 10: Latest News */}
        <LatestNewsWidget />

        {/* Section 11: Economic Calendar */}
        <EconomicCalendarWidget />

        {/* Section 12: Crypto Overview */}
        <CryptoOverviewWidget />

        {/* Section 13: Market Heatmap */}
        <MarketHeatmapWidget />

        {/* Section 14: AI Model Performance */}
        <AIPerformanceWidget />

        {/* Section 15: Trading Performance & Win Rate */}
        <TradingPerformanceWidget />
      </div>

      {/* Right Insight Sidebar Panel (Desktop) */}
      <div className="hidden xl:block">
        <RightInsightPanel />
      </div>
    </div>
  );
};
