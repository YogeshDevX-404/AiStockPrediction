import { Router } from 'express';
import {
  getNotificationsController,
  markNotificationsReadController,
  deleteNotificationController,
  getNotificationPreferencesController,
  updateNotificationPreferencesController,
} from '../controllers/notifications.controller';

const router = Router();

router.get('/feed', getNotificationsController);
router.put('/read', markNotificationsReadController);
router.delete('/:id', deleteNotificationController);
router.get('/settings', getNotificationPreferencesController);
router.post('/settings', updateNotificationPreferencesController);

export default router;
