import { logger } from '../utils/logger';

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

export class CacheService {
  private static store = new Map<string, CacheEntry<any>>();

  public static get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    logger.debug(`[CacheService HIT] ${key}`);
    return entry.data as T;
  }

  public static set<T>(key: string, data: T, ttlSeconds: number): void {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.store.set(key, { data, expiresAt });
    logger.debug(`[CacheService SET] ${key} (TTL: ${ttlSeconds}s)`);
  }

  public static delete(key: string): void {
    this.store.delete(key);
  }
}
