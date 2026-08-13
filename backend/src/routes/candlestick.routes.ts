import { Router } from 'express';
import {
  getCandlesticksForSymbolController,
  analyzeCandlestickController,
  getCandlestickHistoryController,
  getCandlestickStatisticsController,
} from '../controllers/candlestick.controller';

const router = Router();

router.get('/history', getCandlestickHistoryController);
router.get('/statistics', getCandlestickStatisticsController);
router.get('/:symbol', getCandlesticksForSymbolController);
router.post('/analyze', analyzeCandlestickController);

export default router;
