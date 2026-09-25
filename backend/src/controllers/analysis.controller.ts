import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import {
  analyzeScreenshotService,
  getAnalysisHistoryService,
  getAnalysisByIdService,
  deleteAnalysisRecordService,
} from '../services/analysis.service';

export const analyzeScreenshotController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { imageName, image } = req.body;
    const result = await analyzeScreenshotService(imageName || 'screenshot.png', image || '');
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getAnalysisHistoryController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const history = await getAnalysisHistoryService();
    return res.status(200).json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
};

export const getAnalysisByIdController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const result = await getAnalysisByIdService(id);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const deleteAnalysisRecordController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const deleted = await deleteAnalysisRecordService(id);
    return res.status(200).json({ success: true, data: { deleted } });
  } catch (error) {
    next(error);
  }
};
