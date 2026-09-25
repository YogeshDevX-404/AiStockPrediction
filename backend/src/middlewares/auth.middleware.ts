import { Response, NextFunction } from 'express';
import { AuthRequest, AuthenticatedUser } from '../types';
import { verifyToken } from '../utils/security';

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = verifyToken(token) as any;
      const uid = decoded.userId || decoded.id;
      if (!uid) {
        return res.status(401).json({ success: false, message: 'Invalid token payload' });
      }
      req.user = {
        id: uid,
        userId: uid,
        email: decoded.email || '',
        role: decoded.role || 'USER',
      };
      return next();
    } catch {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
  }

  return res.status(401).json({ success: false, message: 'Authorization header missing' });
};
