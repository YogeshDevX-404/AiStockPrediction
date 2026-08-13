import { Router } from 'express';
import {
  getQuoteController,
  getHistoryController,
  searchSymbolsController,
  getOverviewController,
  getStatusController,
} from '../controllers/market.controller';

const router = Router();

router.get('/search', searchSymbolsController);
router.get('/quote/:symbol', getQuoteController);
router.get('/history/:symbol', getHistoryController);
router.get('/overview', getOverviewController);
router.get('/status', getStatusController);

export default router;
