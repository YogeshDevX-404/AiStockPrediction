import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import {
  getAlertRulesService,
  createAlertRuleService,
  deleteAlertRuleService,
  getAlertHistoryService,
} from '../services/alerts.service';

export const getAlertRulesController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const rules = await getAlertRulesService();
    return res.status(200).json({ success: true, data: rules });
  } catch (error) {
    next(error);
  }
};

export const createAlertRuleController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const rule = await createAlertRuleService(req.body);
    return res.status(200).json({ success: true, data: rule });
  } catch (error) {
    next(error);
  }
};

export const deleteAlertRuleController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { id } = req.params;
    await deleteAlertRuleService(id);
    return res.status(200).json({ success: true, data: { deleted: true } });
  } catch (error) {
    next(error);
  }
};

export const getAlertHistoryController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const history = await getAlertHistoryService();
    return res.status(200).json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
};
