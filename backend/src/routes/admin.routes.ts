import { Router } from 'express';
import {
  getUsersController,
  updateUserStatusController,
  deleteUserController,
  getSystemHealthController,
  getProvidersController,
  toggleProviderController,
  getAuditLogsController,
  getFeatureFlagsController,
} from '../controllers/admin.controller';

const router = Router();

router.get('/users', getUsersController);
router.put('/users/:id', updateUserStatusController);
router.delete('/users/:id', deleteUserController);
router.get('/system-health', getSystemHealthController);
router.get('/providers', getProvidersController);
router.put('/providers/:id', toggleProviderController);
router.get('/logs', getAuditLogsController);
router.get('/flags', getFeatureFlagsController);

export default router;
