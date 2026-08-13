import { Router } from 'express';
import {
  getMarketScannerRadarsController,
  screenStocksController,
  getSavedScreenersController,
  saveScreenerPresetController,
  deleteSavedScreenerController,
  getScannerHistoryController,
} from '../controllers/screener.controller';

const router = Router();

router.get('/', getMarketScannerRadarsController);
router.post('/screen', screenStocksController);
router.get('/saved', getSavedScreenersController);
router.post('/saved', saveScreenerPresetController);
router.delete('/saved/:id', deleteSavedScreenerController);
router.get('/history', getScannerHistoryController);

export default router;
