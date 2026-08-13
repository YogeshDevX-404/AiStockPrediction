import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import {
  getPredictionService,
  getPredictionHistoryService,
  getConfidenceBreakdownService,
} from '../services/prediction.service';

export const getPredictionBySymbolController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { symbol } = req.params;
    const prediction = await getPredictionService(symbol);
    return res.status(200).json({ success: true, data: prediction });
  } catch (error) {
    next(error);
  }
};

export const getPredictionHistoryController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const history = await getPredictionHistoryService();
    return res.status(200).json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
};

export const analyzePredictionController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { symbol } = req.body;
    const prediction = await getPredictionService(symbol || 'NVDA');
    return res.status(200).json({ success: true, data: prediction });
  } catch (error) {
    next(error);
  }
};

export const getConfidenceBreakdownController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { symbol } = req.params;
    const breakdown = await getConfidenceBreakdownService(symbol);
    return res.status(200).json({ success: true, data: breakdown });
  } catch (error) {
    next(error);
  }
};
