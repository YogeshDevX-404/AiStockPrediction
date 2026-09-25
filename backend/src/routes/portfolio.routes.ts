import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth.middleware';
import {
  getPortfoliosController,
  getPortfolioByIdController,
  getPortfolioRiskController,
  getPortfolioAnalyticsController,
  getPortfolioDiversificationController,
  getPortfolioPerformanceController,
} from '../controllers/portfolio.controller';

const router = Router();

router.use(authenticateJWT);

router.get('/', getPortfoliosController);
router.get('/risk', getPortfolioRiskController);
router.get('/analytics', getPortfolioAnalyticsController);
router.get('/diversification', getPortfolioDiversificationController);
router.get('/performance', getPortfolioPerformanceController);
router.get('/:id', getPortfolioByIdController);

export default router;
