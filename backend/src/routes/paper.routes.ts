import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth.middleware';
import {
  getAccountController,
  getOrdersController,
  createOrderController,
  cancelOrderController,
  getTradesController,
  getLeaderboardController,
} from '../controllers/paper.controller';

const router = Router();

router.use(authenticateJWT);

router.get('/account', getAccountController);
router.get('/orders', getOrdersController);
router.post('/orders', createOrderController);
router.delete('/orders/:id', cancelOrderController);
router.get('/trades', getTradesController);
router.get('/leaderboard', getLeaderboardController);

export default router;
