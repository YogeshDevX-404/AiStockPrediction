import React from 'react';
import { TradingChartEngine } from '@/components/chart/TradingChartEngine';

export interface StockTradingChartProps {
  symbol: string;
}

export const StockTradingChart: React.FC<StockTradingChartProps> = ({ symbol }) => {
  return <TradingChartEngine symbol={symbol} heightClassName="h-[520px]" />;
};
