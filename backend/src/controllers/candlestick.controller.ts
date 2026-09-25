import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import {
  getCandlesticksForSymbolService,
  analyzeCandlestickService,
  getCandlestickHistoryService,
  getCandlestickStatisticsService,
} from '../services/candlestick.service';

export const getCandlesticksForSymbolController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const symbol = req.params.symbol as string;
    const candlesticks = await getCandlesticksForSymbolService(symbol);
    return res.status(200).json({ success: true, data: candlesticks });
  } catch (error) {
    next(error);
  }
};

export const analyzeCandlestickController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { symbol } = req.body;
    const candlesticks = await analyzeCandlestickService(symbol || 'NVDA');
    return res.status(200).json({ success: true, data: candlesticks });
  } catch (error) {
    next(error);
  }
};

export const getCandlestickHistoryController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const history = await getCandlestickHistoryService();
    return res.status(200).json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
};

export const getCandlestickStatisticsController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const statistics = await getCandlestickStatisticsService();
    return res.status(200).json({ success: true, data: statistics });
  } catch (error) {
    next(error);
  }
};
