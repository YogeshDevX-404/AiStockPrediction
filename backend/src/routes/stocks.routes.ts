import { Router } from 'express';
import {
  getStockDetailsController,
  getStockStatisticsController,
  getStockFinancialsController,
  getStockProfileController,
  getStockNewsController,
  getStockAnalystRatingsController,
} from '../controllers/stocks.controller';

const router = Router();

router.get('/:symbol', getStockDetailsController);
router.get('/:symbol/statistics', getStockStatisticsController);
router.get('/:symbol/financials', getStockFinancialsController);
router.get('/:symbol/profile', getStockProfileController);
router.get('/:symbol/news', getStockNewsController);
router.get('/:symbol/analyst-ratings', getStockAnalystRatingsController);

export default router;
