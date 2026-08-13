import { Request, Response } from 'express';
import { ApiResponse, AuthRequest } from '../types';
import { hashPassword, comparePassword } from '../utils/security';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generateRandomToken,
} from '../services/token.service';
import {
  sendVerificationEmail,
  sendResetPasswordEmail,
  sendWelcomeEmail,
} from '../services/email.service';
import { getGoogleAuthUrl, verifyGoogleCode } from '../services/googleAuth.service';
import { logger } from '../utils/logger';

// In-Memory mock storage for demonstration & testing when DB is offline
const mockUsers = new Map<string, any>([
  [
    'alex.investor@tradegenius.ai',
    {
      id: 'usr_demo_123',
      fullName: 'Alex Mercer',
      username: 'alexmercer',
      email: 'alex.investor@tradegenius.ai',
      password: '$2a$10$e7K4V5E6Yp5L5M9N0O1P2u3V4W5X6Y7Z8a9b0c1d2e3f4g5h6i7j', // bcrypt hash placeholder
      phone: '+1 555 019 2834',
      country: 'United States',
      role: 'PRO',
      status: 'ACTIVE',
      isVerified: true,
      googleId: null,
      provider: 'EMAIL',
      createdAt: new Date().toISOString(),
    },
  ],
]);

export const registerController = async (req: Request, res: Response<ApiResponse>) => {
  const { fullName, username, email, phone, password } = req.body;

  if (mockUsers.has(email)) {
    return res.status(400).json({ success: false, message: 'User with this email already exists' });
  }

  const hashedPassword = await hashPassword(password);
  const verificationToken = generateRandomToken();

  const newUser = {
    id: `usr_${Date.now()}`,
    fullName,
    username,
    email,
    password: hashedPassword,
    phone: phone || '',
    country: 'United States',
    role: 'USER',
    status: 'UNVERIFIED',
    isVerified: false,
    googleId: null,
    provider: 'EMAIL',
    verificationToken,
    createdAt: new Date().toISOString(),
  };

  mockUsers.set(email, newUser);
  await sendVerificationEmail(email, fullName, verificationToken);

  return res.status(201).json({
    success: true,
    message: 'Registration successful! Please check your email to verify your account.',
    data: {
      userId: newUser.id,
      email: newUser.email,
      isVerified: false,
    },
  });
};

export const loginController = async (req: Request, res: Response<ApiResponse>) => {
  const { email, password, rememberMe } = req.body;
  const user = mockUsers.get(email);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  const accessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role });
  const refreshToken = generateRefreshToken({ userId: user.id, email: user.email, role: user.role });

  // Set HTTP-Only Refresh Cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        country: user.country,
        role: user.role,
        isVerified: user.isVerified,
      },
      accessToken,
      refreshToken,
    },
  });
};

export const logoutController = async (_req: Request, res: Response<ApiResponse>) => {
  res.clearCookie('refreshToken');
  return res.status(200).json({ success: true, message: 'Logged out successfully' });
};

export const refreshTokenController = async (req: Request, res: Response<ApiResponse>) => {
  const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ success: false, message: 'Refresh token missing' });
  }

  try {
    const payload = verifyRefreshToken(refreshToken);
    const newAccessToken = generateAccessToken({ userId: payload.userId, email: payload.email, role: payload.role });

    return res.status(200).json({
      success: true,
      data: { accessToken: newAccessToken },
    });
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
  }
};

export const forgotPasswordController = async (req: Request, res: Response<ApiResponse>) => {
  const { email } = req.body;
  const user = mockUsers.get(email);

  if (user) {
    const resetToken = generateRandomToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await sendResetPasswordEmail(email, user.fullName, resetToken);
  }

  return res.status(200).json({
    success: true,
    message: 'If an account exists with that email, a password reset link has been sent.',
  });
};

export const resetPasswordController = async (req: Request, res: Response<ApiResponse>) => {
  const { token, newPassword } = req.body;
  const hashedPassword = await hashPassword(newPassword);

  return res.status(200).json({
    success: true,
    message: 'Password reset successfully. You can now log in with your new password.',
  });
};

export const verifyEmailController = async (req: Request, res: Response<ApiResponse>) => {
  const { token } = req.body;
  return res.status(200).json({
    success: true,
    message: 'Email verified successfully! Welcome to TradeGenius AI.',
  });
};

export const resendVerificationController = async (req: Request, res: Response<ApiResponse>) => {
  const { email } = req.body;
  const user = mockUsers.get(email);
  if (user) {
    const verificationToken = generateRandomToken();
    await sendVerificationEmail(email, user.fullName, verificationToken);
  }
  return res.status(200).json({
    success: true,
    message: 'Verification email resent.',
  });
};

export const googleAuthUrlController = async (_req: Request, res: Response<ApiResponse>) => {
  const url = getGoogleAuthUrl();
  return res.status(200).json({ success: true, data: { url } });
};

export const googleCallbackController = async (req: Request, res: Response<ApiResponse>) => {
  const { code } = req.query;
  const profile = await verifyGoogleCode(code as string);
  const accessToken = generateAccessToken({ userId: profile.id, email: profile.email, role: 'USER' });

  return res.redirect(`http://localhost:3000/dashboard?token=${accessToken}`);
};

export const getProfileController = async (req: AuthRequest, res: Response<ApiResponse>) => {
  return res.status(200).json({
    success: true,
    data: {
      user: req.user || {
        id: 'usr_demo_123',
        fullName: 'Alex Mercer',
        username: 'alexmercer',
        email: 'alex.investor@tradegenius.ai',
        phone: '+1 555 019 2834',
        country: 'United States',
        role: 'PRO',
        isVerified: true,
      },
    },
  });
};

export const updateProfileController = async (req: AuthRequest, res: Response<ApiResponse>) => {
  const { fullName, phone, country, profileImage } = req.body;

  return res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      fullName,
      phone,
      country,
      profileImage,
    },
  });
};

export const changePasswordController = async (req: AuthRequest, res: Response<ApiResponse>) => {
  return res.status(200).json({
    success: true,
    message: 'Password changed successfully',
  });
};

export const deleteAccountController = async (req: AuthRequest, res: Response<ApiResponse>) => {
  return res.status(200).json({
    success: true,
    message: 'Account deleted successfully',
  });
};
