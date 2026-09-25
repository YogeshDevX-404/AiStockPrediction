import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStockDetailsStore } from '@/store/useStockDetailsStore';
import { useFinancialsStore } from '@/store/useFinancialsStore';
import { useTechnicalStore } from '@/store/useTechnicalStore';
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
  const { fetchTechnicals } = useTechnicalStore();

  const [tradeModalOpen, setTradeModalOpen] = useState(false);

  useEffect(() => {
    fetchStockAll(symbol);
    fetchFinancials(symbol);
    fetchTechnicals(symbol);
  }, [fetchStockAll, fetchFinancials, fetchTechnicals, symbol]);

  const upperSymbol = symbol.toUpperCase();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-40 w-full rounded-2xl" />
        <Skeleton className="h-80 w-full rounded-2xl" />
      </div>
    );
  }

  if (!quote) {
    return (
      <div className="p-8 rounded-3xl bg-[#0b1226]/80 border border-border/50 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 dark:text-amber-400 mx-auto flex items-center justify-center font-bold text-xl">
          !
        </div>
        <h2 className="text-xl font-bold text-foreground">Stock Data Unavailable</h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Could not fetch real-time market data for <span className="font-mono font-bold text-foreground">{upperSymbol}</span>. Ensure your market data provider API key (e.g. FINNHUB_API_KEY) is configured in your backend <code className="bg-foreground/10 px-1.5 py-0.5 rounded text-amber-300">.env</code> file.
        </p>
      </div>
    );
  }

  const currentStats = statistics || {
    marketCap: quote.marketCap || 'N/A',
    peRatio: 0,
    eps: 0,
    dividendYield: 0,
    beta: 0,
    roe: 0,
    roce: 0,
    fiftyTwoWeekHigh: quote.high || 0,
    fiftyTwoWeekLow: quote.low || 0,
    bookValue: 0,
    faceValue: 0,
    enterpriseValue: 'N/A',
  };

  const currentProfile = profile || {
    about: 'Company profile information unavailable from provider.',
    ceo: 'N/A',
    founded: 'N/A',
    employees: 'N/A',
    website: '',
    headquarters: 'N/A',
    sector: quote.sector || 'N/A',
    industry: 'N/A',
    shareholding: { promoters: 0, fii: 0, dii: 0, retail: 0, others: 0 },
    dividendHistory: [],
  };

  const currentRatings = analystRatings || {
    strongBuy: 0,
    buy: 0,
    hold: 0,
    sell: 0,
    strongSell: 0,
    consensusRating: 'N/A',
    targetPrice: quote.price || 0,
  };

  return (
    <div className="space-y-6">
      {/* 1. Header with Actions */}
      <StockHeader quote={quote} onOpenTrade={() => setTradeModalOpen(true)} />

      {/* 2. Live Price Card */}
      <StockLivePriceCard quote={quote} />

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
