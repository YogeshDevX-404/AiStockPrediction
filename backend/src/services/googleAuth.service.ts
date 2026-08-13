import { logger } from '../utils/logger';

export interface GoogleUserProfile {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export const getGoogleAuthUrl = (): string => {
  const clientId = process.env.GOOGLE_CLIENT_ID || 'placeholder_google_client_id';
  const redirectUri = 'http://localhost:5000/api/v1/auth/google/callback';
  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=profile%20email`;
};

export const verifyGoogleCode = async (code: string): Promise<GoogleUserProfile> => {
  logger.info(`[Google OAuth Scaffold] Verifying auth code: ${code}`);
  return {
    id: `google_${Date.now()}`,
    email: 'google.trader@tradegenius.ai',
    name: 'Google Trader',
    picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  };
};
