import { Request, Response } from 'express';
import { ApiResponse, AuthRequest } from '../types';
import { hashPassword, comparePassword } from '../utils/security';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../services/token.service';
import { prisma } from '../database';
import { logger } from '../utils/logger';
import { env } from '../config/env';
import crypto from 'crypto';
import { redisClient } from '../redis';

export const registerController = async (req: Request, res: Response<ApiResponse>) => {
  try {
    const { fullName, username, email, phone, password } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ success: false, message: 'Full name, email, and password are required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanUsername = (username || cleanEmail.split('@')[0]).toLowerCase().trim();

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email: cleanEmail }, { username: cleanUsername }] },
    });

    if (existingUser) {
      if (existingUser.email === cleanEmail) {
        return res.status(400).json({ success: false, message: 'User with this email address already exists' });
      }
      return res.status(400).json({ success: false, message: 'Username is already taken' });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        fullName: fullName.trim(),
        username: cleanUsername,
        email: cleanEmail,
        password: hashedPassword,
        phone: phone ? phone.trim() : '',
        role: 'USER',
        status: 'ACTIVE',
        isVerified: true,
        provider: 'EMAIL',
        portfolios: {
          create: { name: 'Primary Portfolio', isDefault: true, cashBalance: 10000.0 },
        },
        watchlists: {
          create: { name: 'My Watchlist', isPinned: true },
        },
        paperAccount: {
          create: { virtualCash: 10000.0, buyingPower: 10000.0, currency: 'USD' },
        },
        settings: {
          create: { currency: 'USD', soundEnabled: true, emailAlerts: true, pushNotifications: true },
        },
      },
    });

    const accessToken = generateAccessToken({ id: newUser.id, userId: newUser.id, email: newUser.email, role: newUser.role });
    const refreshToken = generateRefreshToken({ id: newUser.id, userId: newUser.id, email: newUser.email, role: newUser.role });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          username: newUser.username,
          email: newUser.email,
          phone: newUser.phone,
          country: newUser.country,
          role: newUser.role,
          isVerified: newUser.isVerified,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error: any) {
    logger.error('[Auth] Registration error:', error.message);
    return res.status(500).json({ success: false, message: error.message || 'Registration failed' });
  }
};

export const loginController = async (req: Request, res: Response<ApiResponse>) => {
  try {
    const { email, password, rememberMe } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({ where: { email: cleanEmail } });

    if (!user || !user.password) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const accessToken = generateAccessToken({ id: user.id, userId: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id, userId: user.id, email: user.email, role: user.role });

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
          profileImage: user.profileImage,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error: any) {
    logger.error('[Auth] Login error:', error.message);
    return res.status(500).json({ success: false, message: error.message || 'Login failed' });
  }
};

export const googleAuthController = async (req: Request, res: Response<ApiResponse>) => {
  try {
    const { credential, code, idToken } = req.body;
    const tokenToVerify = credential || idToken;

    if (!tokenToVerify && !code) {
      if (!env.GOOGLE_CLIENT_ID) {
        return res.status(400).json({
          success: false,
          message: 'Google OAuth is not configured. Please set GOOGLE_CLIENT_ID in your server .env file.',
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Google authentication token or authorization code is required.',
      });
    }

    let googleUser: { sub: string; email: string; name?: string; picture?: string } | null = null;

    if (tokenToVerify) {
      try {
        const verifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${tokenToVerify}`);
        if (!verifyRes.ok) {
          return res.status(401).json({ success: false, message: 'Google token verification failed' });
        }
        const data: any = await verifyRes.json();
        if (!data.email || !data.sub) {
          return res.status(401).json({ success: false, message: 'Invalid Google token payload' });
        }
        googleUser = {
          sub: data.sub,
          email: data.email.toLowerCase().trim(),
          name: data.name || data.given_name || data.email.split('@')[0],
          picture: data.picture,
        };
      } catch (err: any) {
        return res.status(401).json({ success: false, message: `Google authentication failed: ${err.message}` });
      }
    } else if (code) {
      if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
        return res.status(400).json({
          success: false,
          message: 'GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be configured in .env for OAuth code exchange.',
        });
      }
      try {
        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            code,
            client_id: env.GOOGLE_CLIENT_ID || '',
            client_secret: env.GOOGLE_CLIENT_SECRET || '',
            redirect_uri: env.GOOGLE_REDIRECT_URI || '',
            grant_type: 'authorization_code',
          }),
        });
        if (!tokenRes.ok) {
          return res.status(401).json({ success: false, message: 'Failed to exchange Google OAuth code' });
        }
        const tokenData: any = await tokenRes.json();
        const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });
        if (!userRes.ok) {
          return res.status(401).json({ success: false, message: 'Failed to fetch Google user profile' });
        }
        const userData: any = await userRes.json();
        googleUser = {
          sub: userData.sub,
          email: userData.email.toLowerCase().trim(),
          name: userData.name || userData.given_name || userData.email.split('@')[0],
          picture: userData.picture,
        };
      } catch (err: any) {
        return res.status(401).json({ success: false, message: `Google OAuth code error: ${err.message}` });
      }
    }

    if (!googleUser) {
      return res.status(401).json({ success: false, message: 'Google authentication failed' });
    }

    let user = await prisma.user.findFirst({
      where: {
        OR: [{ googleId: googleUser.sub }, { email: googleUser.email }],
      },
    });

    if (user) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId: user.googleId || googleUser.sub,
          profileImage: user.profileImage || googleUser.picture,
          provider: user.provider === 'EMAIL' && !user.googleId ? 'GOOGLE' : user.provider,
          isVerified: true,
          lastLogin: new Date(),
        },
      });
    } else {
      const cleanUsername = `${googleUser.email.split('@')[0]}_${Math.floor(Math.random() * 1000)}`;
      user = await prisma.user.create({
        data: {
          fullName: googleUser.name || googleUser.email.split('@')[0],
          username: cleanUsername,
          email: googleUser.email,
          googleId: googleUser.sub,
          profileImage: googleUser.picture,
          provider: 'GOOGLE',
          role: 'USER',
          status: 'ACTIVE',
          isVerified: true,
          portfolios: {
            create: { name: 'Primary Portfolio', isDefault: true, cashBalance: 10000.0 },
          },
          watchlists: {
            create: { name: 'My Watchlist', isPinned: true },
          },
          paperAccount: {
            create: { virtualCash: 10000.0, buyingPower: 10000.0, currency: 'USD' },
          },
          settings: {
            create: { currency: 'USD', soundEnabled: true, emailAlerts: true, pushNotifications: true },
          },
        },
      });
    }

    const accessToken = generateAccessToken({ id: user.id, userId: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id, userId: user.id, email: user.email, role: user.role });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: 'Google login successful',
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
          profileImage: user.profileImage,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error: any) {
    logger.error('[Auth] Google Auth error:', error.message);
    return res.status(500).json({ success: false, message: error.message || 'Google authentication failed' });
  }
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
    const uid = payload.userId || payload.id;
    const newAccessToken = generateAccessToken({ id: uid, userId: uid, email: payload.email, role: payload.role });

    return res.status(200).json({
      success: true,
      data: { accessToken: newAccessToken },
    });
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
  }
};

export const getProfileController = async (req: AuthRequest, res: Response<ApiResponse>) => {
  try {
    const userId = req.user?.id || req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        username: true,
        email: true,
        phone: true,
        country: true,
        role: true,
        status: true,
        subscriptionPlan: true,
        isVerified: true,
        profileImage: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, data: { user } });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const forgotPasswordController = async (_req: Request, res: Response<ApiResponse>) => {
  return res.status(200).json({ success: true, message: 'Password reset link sent to your email.' });
};

export const resetPasswordController = async (_req: Request, res: Response<ApiResponse>) => {
  return res.status(200).json({ success: true, message: 'Password reset successfully.' });
};

export const verifyEmailController = async (_req: Request, res: Response<ApiResponse>) => {
  return res.status(200).json({ success: true, message: 'Email verified successfully.' });
};

export const resendVerificationController = async (_req: Request, res: Response<ApiResponse>) => {
  return res.status(200).json({ success: true, message: 'Verification email resent.' });
};

export const googleAuthUrlController = async (_req: Request, res: Response<ApiResponse>) => {
  const googleClientId = env.GOOGLE_CLIENT_ID;
  if (!googleClientId) {
    return res.status(400).json({
      success: false,
      message: 'GOOGLE_CLIENT_ID is not configured in server .env file.',
    });
  }
  const redirectUri = encodeURIComponent(env.GOOGLE_REDIRECT_URI || '');
  const scope = encodeURIComponent('openid profile email');
  const state = crypto.randomBytes(32).toString('hex');
  
  await redisClient.set(`oauth_state:${state}`, 'valid', 600); // 10 mins

  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&state=${state}`;

  return res.status(200).json({ success: true, data: { url } });
};

export const googleCallbackController = async (req: Request, res: Response) => {
  const code = (req.query.code as string) || req.body?.code;
  const state = (req.query.state as string) || req.body?.state;
  const frontendUrl = env.FRONTEND_URL;

  if (!code || !state) {
    return res.redirect(`${frontendUrl}/login?error=missing_oauth_parameters`);
  }

  const isValidState = await redisClient.get(`oauth_state:${state}`);
  if (!isValidState) {
    return res.redirect(`${frontendUrl}/login?error=invalid_oauth_state`);
  }

  await redisClient.del(`oauth_state:${state}`);

  try {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: env.GOOGLE_CLIENT_ID || '',
        client_secret: env.GOOGLE_CLIENT_SECRET || '',
        redirect_uri: env.GOOGLE_REDIRECT_URI || '',
        grant_type: 'authorization_code',
      }),
    });
    
    if (!tokenRes.ok) {
      return res.redirect(`${frontendUrl}/login?error=google_token_exchange_failed`);
    }
    const tokenData: any = await tokenRes.json();
    
    const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    
    if (!userRes.ok) {
      return res.redirect(`${frontendUrl}/login?error=google_profile_failed`);
    }
    const userData: any = await userRes.json();
    const googleUser = {
      sub: userData.sub,
      email: userData.email.toLowerCase().trim(),
      name: userData.name || userData.given_name || userData.email.split('@')[0],
      picture: userData.picture,
    };
    
    let user = await prisma.user.findFirst({
      where: {
        OR: [{ googleId: googleUser.sub }, { email: googleUser.email }],
      },
    });

    if (user) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          googleId: user.googleId || googleUser.sub,
          profileImage: user.profileImage || googleUser.picture,
          provider: user.provider === 'EMAIL' && !user.googleId ? 'GOOGLE' : user.provider,
          isVerified: true,
          lastLogin: new Date(),
        },
      });
    } else {
      const cleanUsername = `${googleUser.email.split('@')[0]}_${Math.floor(Math.random() * 1000)}`;
      user = await prisma.user.create({
        data: {
          fullName: googleUser.name || googleUser.email.split('@')[0],
          username: cleanUsername,
          email: googleUser.email,
          googleId: googleUser.sub,
          profileImage: googleUser.picture,
          provider: 'GOOGLE',
          role: 'USER',
          status: 'ACTIVE',
          isVerified: true,
          portfolios: {
            create: { name: 'Primary Portfolio', isDefault: true, cashBalance: 10000.0 },
          },
          watchlists: {
            create: { name: 'My Watchlist', isPinned: true },
          },
          paperAccount: {
            create: { virtualCash: 10000.0, buyingPower: 10000.0, currency: 'USD' },
          },
          settings: {
            create: { currency: 'USD', soundEnabled: true, emailAlerts: true, pushNotifications: true },
          },
        },
      });
    }

    const accessToken = generateAccessToken({ id: user.id, userId: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ id: user.id, userId: user.id, email: user.email, role: user.role });
    
    const exchangeCode = crypto.randomBytes(32).toString('hex');
    const authData = JSON.stringify({
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        phone: user.phone,
        country: user.country,
        role: user.role,
        isVerified: user.isVerified,
        profileImage: user.profileImage,
      },
      accessToken,
      refreshToken,
    });
    
    await redisClient.set(`oauth_exchange:${exchangeCode}`, authData, 60); // 60 seconds

    return res.redirect(`${frontendUrl}/auth/callback?code=${exchangeCode}`);
  } catch (error: any) {
    logger.error('[Auth] Google Auth error:', error.message);
    return res.redirect(`${frontendUrl}/login?error=internal_auth_error`);
  }
};

export const exchangeCodeController = async (req: Request, res: Response<ApiResponse>) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: 'Exchange code is required' });
  }
  
  const authDataStr = await redisClient.get(`oauth_exchange:${code}`);
  if (!authDataStr) {
    return res.status(400).json({ success: false, message: 'Invalid or expired exchange code' });
  }
  
  await redisClient.del(`oauth_exchange:${code}`);
  
  const authData = JSON.parse(authDataStr);
  
  res.cookie('refreshToken', authData.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: 'Google login successful',
    data: {
      user: authData.user,
      accessToken: authData.accessToken,
    },
  });
};

export const updateProfileController = async (req: AuthRequest, res: Response<ApiResponse>) => {
  const userId = req.user?.id || req.user?.userId;
  if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

  try {
    const { fullName, phone, country, profileImage } = req.body;
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { fullName, phone, country, profileImage },
      select: { id: true, fullName: true, username: true, email: true, phone: true, country: true, role: true, isVerified: true, profileImage: true },
    });
    return res.status(200).json({ success: true, data: { user: updated } });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const changePasswordController = async (req: AuthRequest, res: Response<ApiResponse>) => {
  const userId = req.user?.id || req.user?.userId;
  if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

  try {
    const { currentPassword, newPassword } = req.body;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.password) {
      return res.status(400).json({ success: false, message: 'User password not set' });
    }

    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Incorrect current password' });
    }

    const hashedPassword = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return res.status(200).json({ success: true, message: 'Password changed successfully.' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAccountController = async (req: AuthRequest, res: Response<ApiResponse>) => {
  const userId = req.user?.id || req.user?.userId;
  if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

  try {
    await prisma.user.delete({ where: { id: userId } });
    res.clearCookie('refreshToken');
    return res.status(200).json({ success: true, message: 'Account deleted successfully.' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
