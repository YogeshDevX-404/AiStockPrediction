import { Router } from 'express';
import {
  getWatchlistsController,
  getWatchlistByIdController,
  createWatchlistController,
  addWatchlistItemController,
  deleteWatchlistItemController,
  getAIWatchlistRadarController,
} from '../controllers/watchlist.controller';

const router = Router();

router.get('/', getWatchlistsController);
router.get('/radar', getAIWatchlistRadarController);
router.get('/:id', getWatchlistByIdController);
router.post('/', createWatchlistController);
router.post('/items', addWatchlistItemController);
router.delete('/items/:id', deleteWatchlistItemController);

export default router;
