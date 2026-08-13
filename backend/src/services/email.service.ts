import { logger } from '../utils/logger';
import {
  getVerificationEmailTemplate,
  getResetPasswordEmailTemplate,
  getWelcomeEmailTemplate,
} from '../utils/emailTemplates';

export const sendVerificationEmail = async (email: string, name: string, token: string) => {
  const verifyUrl = `http://localhost:3000/auth/verify-email?token=${token}`;
  const html = getVerificationEmailTemplate(name, verifyUrl);
  logger.info(`[Email Service Scaffold] Sending verification email to ${email} (URL: ${verifyUrl})`);
  return { success: true, verifyUrl, html };
};

export const sendResetPasswordEmail = async (email: string, name: string, token: string) => {
  const resetUrl = `http://localhost:3000/auth/reset-password?token=${token}`;
  const html = getResetPasswordEmailTemplate(name, resetUrl);
  logger.info(`[Email Service Scaffold] Sending reset password email to ${email} (URL: ${resetUrl})`);
  return { success: true, resetUrl, html };
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  const html = getWelcomeEmailTemplate(name);
  logger.info(`[Email Service Scaffold] Sending welcome email to ${email}`);
  return { success: true, html };
};
