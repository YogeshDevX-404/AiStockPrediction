import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import {
  getMarketScannerRadarsService,
  screenStocksService,
  getSavedScreenersService,
  saveScreenerPresetService,
  deleteSavedScreenerService,
  getScannerHistoryService,
} from '../services/screener.service';

export const getMarketScannerRadarsController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const radars = await getMarketScannerRadarsService();
    return res.status(200).json({ success: true, data: radars });
  } catch (error) {
    next(error);
  }
};

export const screenStocksController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const criteria = req.body;
    const candidates = await screenStocksService(criteria);
    return res.status(200).json({ success: true, data: candidates });
  } catch (error) {
    next(error);
  }
};

export const getSavedScreenersController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const saved = await getSavedScreenersService();
    return res.status(200).json({ success: true, data: saved });
  } catch (error) {
    next(error);
  }
};

export const saveScreenerPresetController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { name, description, filtersJson } = req.body;
    const preset = await saveScreenerPresetService(name, description, filtersJson);
    return res.status(200).json({ success: true, data: preset });
  } catch (error) {
    next(error);
  }
};

export const deleteSavedScreenerController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { id } = req.params;
    await deleteSavedScreenerService(id);
    return res.status(200).json({ success: true, data: { deleted: true } });
  } catch (error) {
    next(error);
  }
};

export const getScannerHistoryController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const history = await getScannerHistoryService();
    return res.status(200).json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
};
