import { logger } from '../utils/logger';

const store = new Map<string, { value: string; expiry: number | null }>();

export const redisClient = {
  get: async (key: string) => {
    logger.debug(`[Redis Scaffold] GET ${key}`);
    const item = store.get(key);
    if (!item) return null;
    if (item.expiry && Date.now() > item.expiry) {
      store.delete(key);
      return null;
    }
    return item.value;
  },
  set: async (key: string, value: string, ttlSeconds?: number) => {
    logger.debug(`[Redis Scaffold] SET ${key} (TTL: ${ttlSeconds || 'none'})`);
    const expiry = ttlSeconds ? Date.now() + ttlSeconds * 1000 : null;
    store.set(key, { value, expiry });
    return 'OK';
  },
  del: async (key: string) => {
    logger.debug(`[Redis Scaffold] DEL ${key}`);
    return store.delete(key) ? 1 : 0;
  },
};
