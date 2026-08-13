import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import { AdminService } from '../services/admin/AdminService';

export const getUsersController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const users = await AdminService.getUsers();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const updateUserStatusController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await AdminService.updateUserStatus(id, status);
    return res.status(200).json({ success: true, data: { updated: true } });
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { id } = req.params;
    await AdminService.deleteUser(id);
    return res.status(200).json({ success: true, data: { deleted: true } });
  } catch (error) {
    next(error);
  }
};

export const getSystemHealthController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const health = await AdminService.getSystemHealth();
    return res.status(200).json({ success: true, data: health });
  } catch (error) {
    next(error);
  }
};

export const getProvidersController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const providers = await AdminService.getProviders();
    return res.status(200).json({ success: true, data: providers });
  } catch (error) {
    next(error);
  }
};

export const toggleProviderController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { isEnabled } = req.body;
    await AdminService.toggleProvider(id, isEnabled);
    return res.status(200).json({ success: true, data: { updated: true } });
  } catch (error) {
    next(error);
  }
};

export const getAuditLogsController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const logs = await AdminService.getAuditLogs();
    return res.status(200).json({ success: true, data: logs });
  } catch (error) {
    next(error);
  }
};

export const getFeatureFlagsController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const flags = await AdminService.getFeatureFlags();
    return res.status(200).json({ success: true, data: flags });
  } catch (error) {
    next(error);
  }
};
