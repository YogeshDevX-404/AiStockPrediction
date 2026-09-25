import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import {
  getDetailedStockService,
  getStockStatisticsService,
  getStockFinancialsService,
  getStockProfileService,
  getStockNewsService,
  getStockAnalystRatingsService,
} from '../services/stocks.service';

export const getStockDetailsController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const symbol = req.params.symbol as string;
    const stock = await getDetailedStockService(symbol);
    return res.status(200).json({ success: true, data: stock });
  } catch (error) {
    next(error);
  }
};

export const getStockStatisticsController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const symbol = req.params.symbol as string;
    const stats = await getStockStatisticsService(symbol);
    return res.status(200).json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};

export const getStockFinancialsController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const symbol = req.params.symbol as string;
    const financials = await getStockFinancialsService(symbol);
    return res.status(200).json({ success: true, data: financials });
  } catch (error) {
    next(error);
  }
};

export const getStockProfileController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const symbol = req.params.symbol as string;
    const profile = await getStockProfileService(symbol);
    return res.status(200).json({ success: true, data: profile });
  } catch (error) {
    next(error);
  }
};

export const getStockNewsController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const symbol = req.params.symbol as string;
    const news = await getStockNewsService(symbol);
    return res.status(200).json({ success: true, data: news });
  } catch (error) {
    next(error);
  }
};

export const getStockAnalystRatingsController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const symbol = req.params.symbol as string;
    const ratings = await getStockAnalystRatingsService(symbol);
    return res.status(200).json({ success: true, data: ratings });
  } catch (error) {
    next(error);
  }
};
