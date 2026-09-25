import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

export const prisma = new PrismaClient({
  log: ['warn', 'error'],
});

export const connectDatabase = async () => {
  try {
    await prisma.$connect();
    logger.info('✅ PostgreSQL database connected successfully via Prisma ORM');
  } catch (error) {
    logger.warn('⚠️ Could not connect to PostgreSQL server. Ensure PostgreSQL is running. Fallback error handlers active.', error);
  }
};
