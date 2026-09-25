import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth.middleware';
import {
  getWatchlistsController,
  getWatchlistByIdController,
  createWatchlistController,
  addWatchlistItemController,
  deleteWatchlistItemController,
  getAIWatchlistRadarController,
} from '../controllers/watchlist.controller';

const router = Router();

router.use(authenticateJWT);

router.get('/', getWatchlistsController);
router.get('/radar', getAIWatchlistRadarController);
router.get('/:id', getWatchlistByIdController);
router.post('/', createWatchlistController);
router.post('/items', addWatchlistItemController);
router.delete('/items/:id', deleteWatchlistItemController);

export default router;
