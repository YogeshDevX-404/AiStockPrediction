import { Request, Response } from 'express';
import { ApiResponse } from '../types';

export const getHealthCheck = (_req: Request, res: Response<ApiResponse>) => {
  res.status(200).json({
    success: true,
    message: 'TradeGenius AI API Gateway operational',
    data: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      status: 'HEALTHY',
      version: '1.0.0',
    },
  });
};
