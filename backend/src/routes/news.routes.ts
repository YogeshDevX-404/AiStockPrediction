import { Router } from 'express';
import {
  getNewsFeedController,
  getCompanyNewsController,
  searchNewsController,
  getNewsByIdController,
  getBookmarksController,
  addBookmarkController,
  removeBookmarkController,
} from '../controllers/news.controller';

const router = Router();

router.get('/', getNewsFeedController);
router.get('/search', searchNewsController);
router.get('/company/:symbol', getCompanyNewsController);
router.get('/bookmarks', getBookmarksController);
router.post('/bookmarks', addBookmarkController);
router.delete('/bookmarks/:id', removeBookmarkController);
router.get('/:id', getNewsByIdController);

export default router;
