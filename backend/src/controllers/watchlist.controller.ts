import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';
import {
  getWatchlistsService,
  getWatchlistItemsService,
  createWatchlistService,
  addWatchlistItemService,
  deleteWatchlistItemService,
  getAIWatchlistRadarService,
} from '../services/watchlist.service';

export const getWatchlistsController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const watchlists = await getWatchlistsService();
    return res.status(200).json({ success: true, data: watchlists });
  } catch (error) {
    next(error);
  }
};

export const getWatchlistByIdController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { id } = req.params;
    const items = await getWatchlistItemsService(id);
    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

export const createWatchlistController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { name } = req.body;
    const newWl = await createWatchlistService(name || 'New Watchlist');
    return res.status(201).json({ success: true, data: newWl });
  } catch (error) {
    next(error);
  }
};

export const addWatchlistItemController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { watchlistId, symbol } = req.body;
    const item = await addWatchlistItemService(watchlistId || 'w1', symbol);
    return res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const deleteWatchlistItemController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = await deleteWatchlistItemService(id);
    return res.status(200).json({ success: true, data: { deleted } });
  } catch (error) {
    next(error);
  }
};

export const getAIWatchlistRadarController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const radar = await getAIWatchlistRadarService();
    return res.status(200).json({ success: true, data: radar });
  } catch (error) {
    next(error);
  }
};
