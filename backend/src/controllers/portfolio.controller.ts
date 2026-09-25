import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import {
  getPortfoliosService,
  getPortfolioByIdService,
  getPortfolioRiskService,
  getPortfolioAnalyticsService,
  getPortfolioDiversificationService,
  getPortfolioPerformanceService,
} from '../services/portfolio.service';

export const getPortfoliosController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const userId = (req as any).user?.id || 'mock-user-id';
    const portfolios = await getPortfoliosService(userId);
    return res.status(200).json({ success: true, data: portfolios });
  } catch (error) {
    next(error);
  }
};

export const getPortfolioByIdController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const portfolio = await getPortfolioByIdService(id);
    return res.status(200).json({ success: true, data: portfolio });
  } catch (error) {
    next(error);
  }
};

export const getPortfolioRiskController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const risk = await getPortfolioRiskService();
    return res.status(200).json({ success: true, data: risk });
  } catch (error) {
    next(error);
  }
};

export const getPortfolioAnalyticsController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const analytics = await getPortfolioAnalyticsService();
    return res.status(200).json({ success: true, data: analytics });
  } catch (error) {
    next(error);
  }
};

export const getPortfolioDiversificationController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const diversification = await getPortfolioDiversificationService();
    return res.status(200).json({ success: true, data: diversification });
  } catch (error) {
    next(error);
  }
};

export const getPortfolioPerformanceController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const performance = await getPortfolioPerformanceService();
    return res.status(200).json({ success: true, data: performance });
  } catch (error) {
    next(error);
  }
};
