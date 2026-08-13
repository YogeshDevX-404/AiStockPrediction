import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import { PaperAccountEngine } from '../services/paper/PaperAccountEngine';
import { OrderExecutionEngine } from '../services/paper/OrderExecutionEngine';
import { TradePnlAuditor } from '../services/paper/TradePnlAuditor';

export const getAccountController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const summary = await PaperAccountEngine.getAccountSummary();
    return res.status(200).json({ success: true, data: summary });
  } catch (error) {
    next(error);
  }
};

export const getOrdersController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const orders = OrderExecutionEngine.getOrders();
    return res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

export const createOrderController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const newOrder = await OrderExecutionEngine.submitOrder(req.body);
    return res.status(201).json({ success: true, data: newOrder });
  } catch (error) {
    next(error);
  }
};

export const cancelOrderController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { id } = req.params;
    await OrderExecutionEngine.cancelOrder(id);
    return res.status(200).json({ success: true, data: { cancelled: true } });
  } catch (error) {
    next(error);
  }
};

export const getTradesController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const trades = TradePnlAuditor.getTradeHistory();
    return res.status(200).json({ success: true, data: trades });
  } catch (error) {
    next(error);
  }
};

export const getLeaderboardController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const leaderboard = TradePnlAuditor.getLeaderboard();
    const achievements = TradePnlAuditor.getAchievements();
    return res.status(200).json({ success: true, data: { leaderboard, achievements } });
  } catch (error) {
    next(error);
  }
};
