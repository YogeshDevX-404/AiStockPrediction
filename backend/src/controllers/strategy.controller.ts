import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import { StrategyRuleEngine } from '../services/strategy/StrategyRuleEngine';
import { BacktestingEngine } from '../services/strategy/BacktestingEngine';
import { AIStrategyInsightEngine } from '../services/strategy/AIStrategyInsightEngine';

export const getStrategiesController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const strategies = StrategyRuleEngine.getStrategies();
    return res.status(200).json({ success: true, data: strategies });
  } catch (error) {
    next(error);
  }
};

export const createStrategyController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const newStrategy = await StrategyRuleEngine.createStrategy(req.body);
    return res.status(201).json({ success: true, data: newStrategy });
  } catch (error) {
    next(error);
  }
};

export const runBacktestController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { strategyId, initialCapital } = req.body;
    const runResult = await BacktestingEngine.executeBacktest(strategyId || 'strat-1', initialCapital || 10000.0);
    return res.status(200).json({ success: true, data: runResult });
  } catch (error) {
    next(error);
  }
};

export const getBacktestReportController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const report = AIStrategyInsightEngine.generateExecutiveReport();
    return res.status(200).json({ success: true, data: report });
  } catch (error) {
    next(error);
  }
};
