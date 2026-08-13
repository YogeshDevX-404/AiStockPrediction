import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import { AgentRouter } from '../services/copilot/AgentRouter';
import { MemoryManager } from '../services/copilot/MemoryManager';

export const queryCopilotController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { query, symbol } = req.body;
    const response = await AgentRouter.routeQuery(query || 'Should I buy NVDA?', symbol || 'NVDA');
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    next(error);
  }
};

export const getHistoryController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const mockHistory = [
      { id: 'h1', query: 'Analyze NVDA breakout potential', timestamp: new Date().toISOString(), confidence: 91.5 },
      { id: 'h2', query: 'Evaluate TSLA risk profile', timestamp: new Date().toISOString(), confidence: 88.0 },
    ];
    return res.status(200).json({ success: true, data: mockHistory });
  } catch (error) {
    next(error);
  }
};

export const getReportsController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const mockReports = [
      { id: 'rep-1', title: 'Executive Morning Briefing - tech Sector', reportType: 'MORNING_BRIEF', createdAt: new Date().toISOString() },
      { id: 'rep-2', title: 'Portfolio Health & Risk Snapshot', reportType: 'PORTFOLIO_HEALTH', createdAt: new Date().toISOString() },
    ];
    return res.status(200).json({ success: true, data: mockReports });
  } catch (error) {
    next(error);
  }
};

export const getWorkspaceController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const memory = await MemoryManager.getUserMemory(req.user?.id || 'usr-1');
    return res.status(200).json({ success: true, data: { activeTab: 'CHAT', memory } });
  } catch (error) {
    next(error);
  }
};
