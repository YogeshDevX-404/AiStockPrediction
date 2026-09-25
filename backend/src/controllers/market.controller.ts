import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import {
  getStockQuoteService,
  getHistoricalDataService,
  searchSymbolsService,
  getMarketOverviewService,
  getMarketStatusService,
  getMarketMoversService,
  getMarketHeatmapService,
  getMarketInsightsService,
  getEconomicCalendarService,
} from '../services/market.service';

export const getQuoteController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const symbol = req.params.symbol as string;
    const quote = await getStockQuoteService(symbol);
    return res.status(200).json({ success: true, data: quote });
  } catch (error) {
    next(error);
  }
};

export const getHistoryController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const symbol = req.params.symbol as string;
    const timeframe = (req.query.timeframe as string) || '1D';
    const history = await getHistoricalDataService(symbol, timeframe);
    return res.status(200).json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
};

export const searchSymbolsController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const query = (req.query.q as string) || '';
    const results = await searchSymbolsService(query);
    return res.status(200).json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
};

export const getOverviewController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const overview = await getMarketOverviewService();
    return res.status(200).json({ success: true, data: overview });
  } catch (error) {
    next(error);
  }
};

export const getStatusController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const status = await getMarketStatusService();
    return res.status(200).json({ success: true, data: status });
  } catch (error) {
    next(error);
  }
};

export const getMoversController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const movers = await getMarketMoversService();
    return res.status(200).json({ success: true, data: movers });
  } catch (error) {
    next(error);
  }
};

export const getHeatmapController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const heatmap = await getMarketHeatmapService();
    return res.status(200).json({ success: true, data: heatmap });
  } catch (error) {
    next(error);
  }
};

export const getInsightsController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const insights = await getMarketInsightsService();
    return res.status(200).json({ success: true, data: insights });
  } catch (error) {
    next(error);
  }
};

export const getEconomicCalendarController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const events = await getEconomicCalendarService();
    return res.status(200).json({ success: true, data: events });
  } catch (error) {
    next(error);
  }
};
