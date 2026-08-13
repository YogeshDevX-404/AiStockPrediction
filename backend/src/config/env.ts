import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000'),
  DATABASE_URL: z.string().default('postgresql://postgres:postgres@localhost:5432/tradegenius?schema=public'),
  JWT_SECRET: z.string().default('super_secret_jwt_key_tradegenius_ai'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  CORS_ORIGIN: z.string().default('*'),
});

export const env = envSchema.parse(process.env);
