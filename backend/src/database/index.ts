import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

export const prisma = new PrismaClient({
  log: ['warn', 'error'],
});

export const connectDatabase = async () => {
  try {
    // In actual database connection phase: await prisma.$connect();
    logger.info('Database ORM client initialized (Prisma schema ready)');
  } catch (error) {
    logger.error('Failed to connect to database', error);
  }
};
