import { z } from 'zod';

// Password policy regex rules
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least 1 number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least 1 special character');

export const registerSchema = z.object({
  body: z
    .object({
      fullName: z.string().min(2, 'Full name is required'),
      username: z.string().optional(),
      email: z.string().email('Invalid email address'),
      phone: z.string().optional(),
      password: passwordSchema,
      confirmPassword: z.string().optional(),
      acceptTerms: z.boolean().optional(),
    })
    .refine(
      (data) => {
        if (data.confirmPassword) {
          return data.password === data.confirmPassword;
        }
        return true;
      },
      {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      }
    ),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean().optional(),
  }),
});

export const googleLoginSchema = z.object({
  body: z.object({
    credential: z.string().optional(),
    code: z.string().optional(),
    idToken: z.string().optional(),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
  }),
});

export const resetPasswordSchema = z.object({
  body: z
    .object({
      token: z.string().min(1, 'Reset token is required'),
      newPassword: passwordSchema,
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),
});

export const updateProfileSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, 'Full name is required').optional(),
    phone: z.string().optional(),
    country: z.string().optional(),
    profileImage: z.string().optional(),
  }),
});

export const changePasswordSchema = z.object({
  body: z
    .object({
      currentPassword: z.string().min(1, 'Current password required'),
      newPassword: passwordSchema,
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    }),
});
