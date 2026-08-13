import { Router } from 'express';
import {
  getPlansController,
  getSubscriptionController,
  upgradeSubscriptionController,
  getInvoicesController,
  validateCouponController,
  webhookController,
} from '../controllers/billing.controller';

const router = Router();

router.get('/plans', getPlansController);
router.get('/subscription', getSubscriptionController);
router.post('/subscription/upgrade', upgradeSubscriptionController);
router.get('/invoices', getInvoicesController);
router.post('/coupons/validate', validateCouponController);
router.post('/webhook', webhookController);

export default router;
