import { Request, Response, NextFunction } from 'express';
import { ApiResponse, AuthRequest } from '../types';
import {
  getNewsArticlesService,
  getNewsArticleByIdService,
  searchNewsArticlesService,
  getBookmarksService,
  addBookmarkService,
  removeBookmarkService,
} from '../services/news.service';

export const getNewsFeedController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const category = req.query.category as string | undefined;
    const symbol = req.query.symbol as string | undefined;
    const articles = await getNewsArticlesService(category, symbol);
    return res.status(200).json({ success: true, data: articles });
  } catch (error) {
    next(error);
  }
};

export const getCompanyNewsController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const symbol = req.params.symbol as string;
    const articles = await getNewsArticlesService(undefined, symbol);
    return res.status(200).json({ success: true, data: articles });
  } catch (error) {
    next(error);
  }
};

export const searchNewsController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const q = (req.query.q as string) || '';
    const articles = await searchNewsArticlesService(q);
    return res.status(200).json({ success: true, data: articles });
  } catch (error) {
    next(error);
  }
};

export const getNewsByIdController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const article = await getNewsArticleByIdService(id);
    return res.status(200).json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

export const getBookmarksController = async (req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const userId = req.user?.userId || (req.user as any)?.id || 'guest';
    const bookmarks = await getBookmarksService(userId);
    return res.status(200).json({ success: true, data: bookmarks });
  } catch (error) {
    next(error);
  }
};

export const addBookmarkController = async (req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { articleId } = req.body;
    const userId = req.user?.userId || (req.user as any)?.id || 'guest';
    await addBookmarkService(userId, articleId);
    return res.status(200).json({ success: true, data: { bookmarked: true } });
  } catch (error) {
    next(error);
  }
};

export const removeBookmarkController = async (req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const id = req.params.id as string;
    const userId = req.user?.userId || (req.user as any)?.id || 'guest';
    await removeBookmarkService(userId, id);
    return res.status(200).json({ success: true, data: { removed: true } });
  } catch (error) {
    next(error);
  }
};
