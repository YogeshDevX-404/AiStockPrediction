import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStockDetailsStore } from '@/store/useStockDetailsStore';
import { useFinancialsStore } from '@/store/useFinancialsStore';
import { StockHeader } from './components/StockHeader';
import { StockLivePriceCard } from './components/StockLivePriceCard';
import { StockTradingChart } from './components/StockTradingChart';
import { StockAIRecommendation } from './components/StockAIRecommendation';
import { StockKeyStatistics } from './components/StockKeyStatistics';
import { StockTechnicalIndicators } from './components/StockTechnicalIndicators';
import { StockFinancialsTabbed } from './components/StockFinancialsTabbed';
import { StockShareholdingPattern } from './components/StockShareholdingPattern';
import { StockProfileDividend } from './components/StockProfileDividend';
import { StockAnalystRatings } from './components/StockAnalystRatings';
import { StockRelatedNews } from './components/StockRelatedNews';
import { QuickTradeModal } from '@/components/modals/QuickTradeModal';
import { Skeleton } from '@/components/ui/Skeleton';

export const StockDetailsPage: React.FC = () => {
  const { symbol = 'NVDA' } = useParams();
  const { fetchStockAll, quote, statistics, profile, analystRatings, news, isLoading } = useStockDetailsStore();
  const { fetchFinancials } = useFinancialsStore();

  const [tradeModalOpen, setTradeModalOpen] = useState(false);

  useEffect(() => {
    fetchStockAll(symbol);
    fetchFinancials(symbol);
  }, [fetchStockAll, fetchFinancials, symbol]);

  const upperSymbol = symbol.toUpperCase();

  const currentQuote = quote || {
    symbol: upperSymbol,
    name: `${upperSymbol} Corporation`,
    exchange: 'NASDAQ',
    currency: 'USD',
    price: 132.40,
    change: 4.42,
    changePercent: 3.45,
    open: 128.50,
    high: 133.10,
    low: 127.80,
    previousClose: 127.98,
    volume: 48200000,
    avgVolume: 52000000,
    marketCap: '$3.25 Trillion',
    peRatio: 72.4,
    fiftyTwoWeekHigh: 140.76,
    fiftyTwoWeekLow: 39.23,
    sector: 'Technology',
    industry: 'Semiconductors',
    lastUpdated: new Date().toISOString(),
  };

  const currentStats = statistics || {
    marketCap: '$3.25 Trillion',
    peRatio: 72.4,
    eps: 4.85,
    dividendYield: 0.12,
    beta: 1.68,
    roe: 48.5,
    roce: 42.1,
    fiftyTwoWeekHigh: 140.76,
    fiftyTwoWeekLow: 39.23,
    bookValue: 18.50,
    faceValue: 1.00,
    enterpriseValue: '$3.21 Trillion',
  };

  const currentProfile = profile || {
    about:
      'NVIDIA Corporation designs graphics processing units (GPUs) for the gaming, professional visualization, data center, and automotive markets.',
    ceo: 'Jensen Huang',
    founded: '1993',
    employees: '29,600',
    website: 'https://www.nvidia.com',
    headquarters: 'Santa Clara, California, USA',
    sector: 'Technology',
    industry: 'Semiconductors',
    shareholding: { promoters: 48.5, fii: 24.2, dii: 14.8, retail: 8.5, others: 4.0 },
    dividendHistory: [
      { exDate: '2026-06-10', recordDate: '2026-06-11', dividend: 0.01, yield: 0.03 },
    ],
  };

  const currentRatings = analystRatings || {
    strongBuy: 32,
    buy: 12,
    hold: 4,
    sell: 1,
    strongSell: 0,
    consensusRating: 'STRONG BUY',
    targetPrice: 155.00,
  };

  if (isLoading && !quote) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-80 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Header with Actions */}
      <StockHeader quote={currentQuote} onOpenTrade={() => setTradeModalOpen(true)} />

      {/* 2. Live Price Card */}
      <StockLivePriceCard quote={currentQuote} />

      {/* 3. Interactive Trading Chart */}
      <StockTradingChart symbol={upperSymbol} />

      {/* 4. AI Recommendation Card */}
      <StockAIRecommendation symbol={upperSymbol} />

      {/* 5. Key Statistics Grid */}
      <StockKeyStatistics stats={currentStats} />

      {/* 6. Technical Indicators */}
      <StockTechnicalIndicators />

      {/* 7. Financial Statements & Quarterly Results */}
      <StockFinancialsTabbed symbol={upperSymbol} />

      {/* 8. Shareholding Pattern */}
      <StockShareholdingPattern />

      {/* 9. Company Profile & Dividend History */}
      <StockProfileDividend profile={currentProfile} />

      {/* 10. Analyst Ratings */}
      <StockAnalystRatings ratings={currentRatings} />

      {/* 11. Related Peers & News Feed */}
      <StockRelatedNews news={news} />

      {/* Trade Modal */}
      <QuickTradeModal
        isOpen={tradeModalOpen}
        onClose={() => setTradeModalOpen(false)}
        symbol={upperSymbol}
      />
    </div>
  );
};
