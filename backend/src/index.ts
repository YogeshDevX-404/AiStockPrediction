import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { env } from './config/env';
import { logger } from './utils/logger';
import { errorHandler } from './middlewares/error.middleware';
import { apiRateLimiter } from './middlewares/rateLimiter.middleware';
import { connectDatabase } from './database';
import apiRouter from './routes';

const app = express();

// Security & Optimization Middlewares
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Cookie Parser Middleware placeholder using simple manual parser if cookie-parser package not imported
app.use((req, _res, next) => {
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    req.cookies = Object.fromEntries(
      cookieHeader.split('; ').map((c) => {
        const [k, ...v] = c.split('=');
        return [k, decodeURIComponent(v.join('='))];
      })
    );
  } else {
    req.cookies = {};
  }
  next();
});

// HTTP Request Logging
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms', {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  })
);

// Rate Limiting
app.use('/api/', apiRateLimiter);

// API Router
app.use('/api/v1', apiRouter);

// Global 404 Handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Resource not found' });
});

// Global Error Handling Middleware
app.use(errorHandler);

// Start Server
const PORT = parseInt(env.PORT, 10);
app.listen(PORT, async () => {
  await connectDatabase();
  logger.info(`🚀 TradeGenius AI Server running on port ${PORT} [${env.NODE_ENV}]`);
});

export default app;
