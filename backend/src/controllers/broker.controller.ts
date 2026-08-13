import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import { BrokerRoutingEngine } from '../services/broker/BrokerRoutingEngine';

export const getBrokerAccountsController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const accounts = await BrokerRoutingEngine.getAccounts();
    return res.status(200).json({ success: true, data: accounts });
  } catch (error) {
    next(error);
  }
};

export const submitBrokerOrderController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const orderResult = await BrokerRoutingEngine.routeOrder(req.body);
    return res.status(201).json({ success: true, data: orderResult });
  } catch (error) {
    next(error);
  }
};
