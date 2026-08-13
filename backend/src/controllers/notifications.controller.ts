import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import {
  getNotificationsService,
  markNotificationsReadService,
  deleteNotificationService,
  getNotificationPreferencesService,
  updateNotificationPreferencesService,
} from '../services/notifications.service';

export const getNotificationsController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const notifications = await getNotificationsService();
    return res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    next(error);
  }
};

export const markNotificationsReadController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    await markNotificationsReadService();
    return res.status(200).json({ success: true, data: { read: true } });
  } catch (error) {
    next(error);
  }
};

export const deleteNotificationController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { id } = req.params;
    await deleteNotificationService(id);
    return res.status(200).json({ success: true, data: { deleted: true } });
  } catch (error) {
    next(error);
  }
};

export const getNotificationPreferencesController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const prefs = await getNotificationPreferencesService();
    return res.status(200).json({ success: true, data: prefs });
  } catch (error) {
    next(error);
  }
};

export const updateNotificationPreferencesController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const prefs = await updateNotificationPreferencesService(req.body);
    return res.status(200).json({ success: true, data: prefs });
  } catch (error) {
    next(error);
  }
};
