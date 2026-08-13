import { Router } from 'express';
import {
  getStrategiesController,
  createStrategyController,
  runBacktestController,
  getBacktestReportController,
} from '../controllers/strategy.controller';

const router = Router();

router.get('/', getStrategiesController);
router.post('/', createStrategyController);
router.post('/backtest', runBacktestController);
router.get('/report', getBacktestReportController);

export default router;
