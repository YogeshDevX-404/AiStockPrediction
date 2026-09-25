import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth.middleware';
import {
  getNotificationsController,
  markNotificationsReadController,
  deleteNotificationController,
  getNotificationPreferencesController,
  updateNotificationPreferencesController,
} from '../controllers/notifications.controller';

const router = Router();

router.use(authenticateJWT);

router.get('/feed', getNotificationsController);
router.put('/read', markNotificationsReadController);
router.delete('/:id', deleteNotificationController);
router.get('/settings', getNotificationPreferencesController);
router.post('/settings', updateNotificationPreferencesController);

export default router;
