import { Router } from 'express';
import {
  getAlertRulesController,
  createAlertRuleController,
  deleteAlertRuleController,
  getAlertHistoryController,
} from '../controllers/alerts.controller';

const router = Router();

router.get('/', getAlertRulesController);
router.post('/', createAlertRuleController);
router.delete('/:id', deleteAlertRuleController);
router.get('/history', getAlertHistoryController);

export default router;
