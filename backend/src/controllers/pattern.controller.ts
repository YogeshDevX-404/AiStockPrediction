import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import {
  getPatternsForSymbolService,
  runPatternScanService,
  getPatternHistoryService,
  getPatternStatisticsService,
} from '../services/pattern.service';

export const getPatternsForSymbolController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { symbol } = req.params;
    const patterns = await getPatternsForSymbolService(symbol);
    return res.status(200).json({ success: true, data: patterns });
  } catch (error) {
    next(error);
  }
};

export const runPatternScanController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { symbol } = req.body;
    const patterns = await runPatternScanService(symbol || 'NVDA');
    return res.status(200).json({ success: true, data: patterns });
  } catch (error) {
    next(error);
  }
};

export const getPatternHistoryController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const history = await getPatternHistoryService();
    return res.status(200).json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
};

export const getPatternStatisticsController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const statistics = await getPatternStatisticsService();
    return res.status(200).json({ success: true, data: statistics });
  } catch (error) {
    next(error);
  }
};
