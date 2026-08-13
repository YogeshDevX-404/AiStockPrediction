import { Router } from 'express';
import { getHealthCheck } from '../controllers/health.controller';
import authRoutes from './auth.routes';
import marketRoutes from './market.routes';
import stocksRoutes from './stocks.routes';
import portfolioRoutes from './portfolio.routes';
import watchlistRoutes from './watchlist.routes';
import predictionRoutes from './prediction.routes';
import analysisRoutes from './analysis.routes';
import patternRoutes from './pattern.routes';
import candlestickRoutes from './candlestick.routes';
import copilotRoutes from './copilot.routes';
import newsRoutes from './news.routes';
import screenerRoutes from './screener.routes';
import alertsRoutes from './alerts.routes';
import notificationsRoutes from './notifications.routes';
import adminRoutes from './admin.routes';
import mlRoutes from './ml.routes';
import paperRoutes from './paper.routes';
import strategyRoutes from './strategy.routes';
import brokerRoutes from './broker.routes';
import billingRoutes from './billing.routes';

const router = Router();

// Health Check
router.get('/health', getHealthCheck);

// Authentication Sub-Router
router.use('/auth', authRoutes);

// Market Data Sub-Router
router.use('/market', marketRoutes);

// Stock Details Sub-Router
router.use('/stocks', stocksRoutes);

// Portfolio Sub-Router
router.use('/portfolio', portfolioRoutes);

// AI Smart Watchlist Sub-Router
router.use('/watchlists', watchlistRoutes);

// AI Predictions & Recommendations Sub-Router
router.use('/predictions', predictionRoutes);

// AI Vision Chart Screenshot Analysis Sub-Router
router.use('/analysis', analysisRoutes);

// AI Pattern Recognition Sub-Router
router.use('/patterns', patternRoutes);

// AI Candlestick Intelligence Sub-Router
router.use('/candlesticks', candlestickRoutes);

// AI Trading Copilot Sub-Router
router.use('/copilot', copilotRoutes);

// AI Financial News Intelligence Sub-Router
router.use('/news', newsRoutes);

// AI Stock Screener & Scanner Sub-Router
router.use('/scanner', screenerRoutes);

// Smart Alerts Sub-Router
router.use('/alerts', alertsRoutes);

// Notifications Sub-Router
router.use('/notifications', notificationsRoutes);

// Operations Console & Admin Sub-Router
router.use('/admin', adminRoutes);

// Machine Learning Prediction Platform Sub-Router
router.use('/ml', mlRoutes);

// Paper Trading Sub-Router
router.use('/paper', paperRoutes);

// Strategy Builder & Backtesting Engine Sub-Router
router.use('/strategy', strategyRoutes);
router.use('/backtest', strategyRoutes);

// Multi-Broker API Gateway Sub-Router
router.use('/broker', brokerRoutes);

// SaaS Subscription & Billing Sub-Router
router.use('/billing', billingRoutes);
router.use('/subscription', billingRoutes);

export default router;
