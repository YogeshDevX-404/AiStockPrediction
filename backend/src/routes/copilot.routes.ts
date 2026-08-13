import { Router } from 'express';
import {
  queryCopilotController,
  getHistoryController,
  getReportsController,
  getWorkspaceController,
} from '../controllers/copilot.controller';

const router = Router();

router.post('/query', queryCopilotController);
router.get('/history', getHistoryController);
router.get('/reports', getReportsController);
router.get('/workspace', getWorkspaceController);

export default router;
