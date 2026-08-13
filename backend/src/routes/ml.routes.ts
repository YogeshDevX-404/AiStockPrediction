import { Router } from 'express';
import {
  getModelsController,
  getModelByIdController,
  trainModelController,
  predictController,
  getMetricsController,
} from '../controllers/ml.controller';

const router = Router();

router.get('/models', getModelsController);
router.get('/models/:id', getModelByIdController);
router.post('/train', trainModelController);
router.post('/predict', predictController);
router.get('/metrics', getMetricsController);

export default router;
