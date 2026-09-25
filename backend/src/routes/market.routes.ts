import { Router } from 'express';
import {
  getQuoteController,
  getHistoryController,
  searchSymbolsController,
  getOverviewController,
  getStatusController,
  getMoversController,
  getHeatmapController,
  getInsightsController,
  getEconomicCalendarController,
} from '../controllers/market.controller';

const router = Router();

router.get('/search', searchSymbolsController);
router.get('/quote/:symbol', getQuoteController);
router.get('/history/:symbol', getHistoryController);
router.get('/overview', getOverviewController);
router.get('/status', getStatusController);
router.get('/movers', getMoversController);
router.get('/heatmap', getHeatmapController);
router.get('/insights', getInsightsController);
router.get('/economic-calendar', getEconomicCalendarController);

export default router;
