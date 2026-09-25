import { Request, Response, NextFunction } from 'express';
import { ApiResponse, AuthRequest } from '../types';
import { AgentRouter } from '../services/copilot/AgentRouter';
import { MemoryManager } from '../services/copilot/MemoryManager';
import { getCopilotHistoryService } from '../services/copilot.service';
import { logger } from '../utils/logger';

export const queryCopilotController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const userPrompt = req.body.query || req.body.prompt;
    const { symbol } = req.body;

    if (!userPrompt || typeof userPrompt !== 'string' || !userPrompt.trim()) {
      logger.warn('[Copilot] Request rejected: empty query or prompt.');
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid question or prompt for the AI assistant.',
      });
    }

    const cleanPrompt = userPrompt.trim();
    logger.info(`[Copilot] Request received: "${cleanPrompt.slice(0, 60)}..."`);
    logger.info('[Copilot] Calling AI service router');

    const userId = (req as AuthRequest).user?.userId;
    const response = await AgentRouter.routeQuery(cleanPrompt, symbol, userId);

    logger.info('[Copilot] AI service returned successfully');
    logger.info(`[Copilot] Generated content length: ${response.executiveSummary?.length || 0}`);
    logger.info('[Copilot] Sending HTTP 200 response');

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ success: true, data: response });
  } catch (error: any) {
    logger.error(`[Copilot] Error in controller execution: ${error.message}`);
    const statusCode = error.status || (error.message?.includes('missing') ? 400 : 502);
    return res.status(statusCode).json({
      success: false,
      error: error.message || 'Failed to process AI Copilot request.',
    });
  }
};

export const getHistoryController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const userId = (req as AuthRequest).user?.userId || '';
    if (!userId) {
      return res.status(200).json({ success: true, data: [] });
    }
    const history = await getCopilotHistoryService(userId);
    return res.status(200).json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
};

export const getReportsController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const mockReports = [
      { id: 'rep-1', title: 'Executive Morning Briefing - Tech Sector', reportType: 'MORNING_BRIEF', createdAt: new Date().toISOString() },
      { id: 'rep-2', title: 'Portfolio Health & Risk Snapshot', reportType: 'PORTFOLIO_HEALTH', createdAt: new Date().toISOString() },
    ];
    return res.status(200).json({ success: true, data: mockReports });
  } catch (error) {
    next(error);
  }
};

export const getWorkspaceController = async (req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const userId = req.user?.userId || (req.user as any)?.id || 'usr-1';
    const memory = await MemoryManager.getUserMemory(userId);
    return res.status(200).json({ success: true, data: { activeTab: 'CHAT', memory } });
  } catch (error) {
    next(error);
  }
};
