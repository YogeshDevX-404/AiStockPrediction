import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    name: z.string().min(2, 'Name is required'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const portfolioItemSchema = z.object({
  body: z.object({
    symbol: z.string().min(1, 'Symbol required'),
    name: z.string().min(1, 'Name required'),
    shares: z.number().positive('Shares must be > 0'),
    avgBuyPrice: z.number().positive('Buy price must be > 0'),
  }),
});
