import { Request, Response, NextFunction } from 'express';
import { ApiResponse, AuthRequest } from '../types';
import {
  getAlertRulesService,
  createAlertRuleService,
  deleteAlertRuleService,
  getAlertHistoryService,
} from '../services/alerts.service';

export const getAlertRulesController = async (req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const userId = req.user?.userId || (req.user as any)?.id || 'guest';
    const rules = await getAlertRulesService(userId);
    return res.status(200).json({ success: true, data: rules });
  } catch (error) {
    next(error);
  }
};

export const createAlertRuleController = async (req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const userId = req.user?.userId || (req.user as any)?.id || 'guest';
    const rule = await createAlertRuleService(userId, req.body);
    return res.status(200).json({ success: true, data: rule });
  } catch (error) {
    next(error);
  }
};

export const deleteAlertRuleController = async (req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const userId = req.user?.userId || (req.user as any)?.id || 'guest';
    const id = req.params.id as string;
    await deleteAlertRuleService(userId, id);
    return res.status(200).json({ success: true, data: { deleted: true } });
  } catch (error) {
    next(error);
  }
};

export const getAlertHistoryController = async (req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const userId = req.user?.userId || (req.user as any)?.id || 'guest';
    const history = await getAlertHistoryService(userId);
    return res.status(200).json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
};
