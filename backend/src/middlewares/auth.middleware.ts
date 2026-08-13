import { Response, NextFunction } from 'express';
import { AuthRequest, AuthenticatedUser } from '../types';
import { verifyToken } from '../utils/security';

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = verifyToken(token) as AuthenticatedUser;
      req.user = decoded;
      return next();
    } catch {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
  }

  return res.status(401).json({ success: false, message: 'Authorization header missing' });
};
