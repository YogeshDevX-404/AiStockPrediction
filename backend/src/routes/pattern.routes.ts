import { Router } from 'express';
import {
  getPatternsForSymbolController,
  runPatternScanController,
  getPatternHistoryController,
  getPatternStatisticsController,
} from '../controllers/pattern.controller';

const router = Router();

router.get('/history', getPatternHistoryController);
router.get('/statistics', getPatternStatisticsController);
router.get('/:symbol', getPatternsForSymbolController);
router.post('/detect', runPatternScanController);

export default router;
