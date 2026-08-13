import { logger } from '../utils/logger';

export const redisClient = {
  get: async (key: string) => {
    logger.debug(`[Redis Scaffold] GET ${key}`);
    return null;
  },
  set: async (key: string, value: string, ttlSeconds?: number) => {
    logger.debug(`[Redis Scaffold] SET ${key} (TTL: ${ttlSeconds || 'none'})`);
    return 'OK';
  },
  del: async (key: string) => {
    logger.debug(`[Redis Scaffold] DEL ${key}`);
    return 1;
  },
};
