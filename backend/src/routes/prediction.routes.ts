import { Router } from 'express';
import {
  getPredictionBySymbolController,
  getPredictionHistoryController,
  analyzePredictionController,
  getConfidenceBreakdownController,
} from '../controllers/prediction.controller';

const router = Router();

router.get('/history', getPredictionHistoryController);
router.get('/confidence/:symbol', getConfidenceBreakdownController);
router.get('/:symbol', getPredictionBySymbolController);
router.post('/analyze', analyzePredictionController);

export default router;
