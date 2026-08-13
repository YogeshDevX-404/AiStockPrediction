import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
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
    const { category, symbol } = req.query;
    const articles = await getNewsArticlesService(category as string, symbol as string);
    return res.status(200).json({ success: true, data: articles });
  } catch (error) {
    next(error);
  }
};

export const getCompanyNewsController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { symbol } = req.params;
    const articles = await getNewsArticlesService(undefined, symbol);
    return res.status(200).json({ success: true, data: articles });
  } catch (error) {
    next(error);
  }
};

export const searchNewsController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { q } = req.query;
    const articles = await searchNewsArticlesService((q as string) || '');
    return res.status(200).json({ success: true, data: articles });
  } catch (error) {
    next(error);
  }
};

export const getNewsByIdController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { id } = req.params;
    const article = await getNewsArticleByIdService(id);
    return res.status(200).json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

export const getBookmarksController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const bookmarks = await getBookmarksService();
    return res.status(200).json({ success: true, data: bookmarks });
  } catch (error) {
    next(error);
  }
};

export const addBookmarkController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { articleId } = req.body;
    await addBookmarkService(articleId);
    return res.status(200).json({ success: true, data: { bookmarked: true } });
  } catch (error) {
    next(error);
  }
};

export const removeBookmarkController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { id } = req.params;
    await removeBookmarkService(id);
    return res.status(200).json({ success: true, data: { removed: true } });
  } catch (error) {
    next(error);
  }
};
