import { Router } from 'express';
import { getBrokerAccountsController, submitBrokerOrderController } from '../controllers/broker.controller';

const router = Router();

router.get('/accounts', getBrokerAccountsController);
router.post('/orders', submitBrokerOrderController);

export default router;
