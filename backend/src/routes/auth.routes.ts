import { Router } from 'express';
import {
  registerController,
  loginController,
  googleAuthController,
  logoutController,
  refreshTokenController,
  forgotPasswordController,
  resetPasswordController,
  verifyEmailController,
  resendVerificationController,
  googleAuthUrlController,
  googleCallbackController,
  exchangeCodeController,
  getProfileController,
  updateProfileController,
  changePasswordController,
  deleteAccountController,
} from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validate.middleware';
import { authenticateJWT } from '../middlewares/auth.middleware';
import {
  registerSchema,
  loginSchema,
  googleLoginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
  changePasswordSchema,
} from '../validators/auth.validator';

const router = Router();

// Public Authentication Endpoints
router.post('/register', validateRequest(registerSchema), registerController);
router.post('/login', validateRequest(loginSchema), loginController);
router.post('/google', validateRequest(googleLoginSchema), googleAuthController);
router.post('/logout', logoutController);
router.post('/refresh-token', refreshTokenController);
router.post('/forgot-password', validateRequest(forgotPasswordSchema), forgotPasswordController);
router.post('/reset-password', validateRequest(resetPasswordSchema), resetPasswordController);
router.post('/verify-email', verifyEmailController);
router.post('/resend-verification', resendVerificationController);

// Google OAuth Endpoints
router.get('/google', googleAuthUrlController);
router.get('/google/callback', googleCallbackController);
router.post('/google/exchange', exchangeCodeController);

// Authenticated User Endpoints
router.get('/profile', authenticateJWT, getProfileController);
router.put('/profile', authenticateJWT, validateRequest(updateProfileSchema), updateProfileController);
router.put('/change-password', authenticateJWT, validateRequest(changePasswordSchema), changePasswordController);
router.delete('/delete-account', authenticateJWT, deleteAccountController);

export default router;
