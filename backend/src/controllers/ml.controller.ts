import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import { MLModelRegistry } from '../services/ml/MLModelRegistry';
import { TrainingPipeline } from '../services/ml/TrainingPipeline';
import { InferencePipeline } from '../services/ml/InferencePipeline';
import { ExplainabilityAdapter } from '../services/ml/ExplainabilityAdapter';
import { DriftMonitor } from '../services/ml/DriftMonitor';

export const getModelsController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const models = MLModelRegistry.getModels();
    return res.status(200).json({ success: true, data: models });
  } catch (error) {
    next(error);
  }
};

export const getModelByIdController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { id } = req.params;
    const models = MLModelRegistry.getModels();
    const model = models.find((m) => m.id === id) || models[0];
    return res.status(200).json({ success: true, data: model });
  } catch (error) {
    next(error);
  }
};

export const trainModelController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { modelId, datasetVersion } = req.body;
    const result = await TrainingPipeline.executeTraining(modelId, datasetVersion);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const predictController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { symbol, timeframe } = req.body;
    const forecast = InferencePipeline.generateForecast(symbol || 'NVDA', timeframe || '1D');
    const shap = ExplainabilityAdapter.getSHAPValues();
    return res.status(200).json({ success: true, data: { forecast, shap } });
  } catch (error) {
    next(error);
  }
};

export const getMetricsController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const telemetry = DriftMonitor.getTelemetry();
    return res.status(200).json({ success: true, data: telemetry });
  } catch (error) {
    next(error);
  }
};
