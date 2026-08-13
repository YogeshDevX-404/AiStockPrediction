import { Router } from 'express';
import {
  analyzeScreenshotController,
  getAnalysisHistoryController,
  getAnalysisByIdController,
  deleteAnalysisRecordController,
} from '../controllers/analysis.controller';

const router = Router();

router.post('/upload', analyzeScreenshotController);
router.post('/analyze', analyzeScreenshotController);
router.get('/history', getAnalysisHistoryController);
router.get('/:id', getAnalysisByIdController);
router.delete('/:id', deleteAnalysisRecordController);

export default router;
