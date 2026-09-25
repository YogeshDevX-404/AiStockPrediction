import { Request, Response, NextFunction } from 'express';
import { ApiResponse, AuthRequest } from '../types';
import { SubscriptionEngine } from '../services/billing/SubscriptionEngine';
import { UsageTrackingEngine } from '../services/billing/UsageTrackingEngine';
import { InvoiceEngine } from '../services/billing/InvoiceEngine';
import { CouponEngine } from '../services/billing/CouponEngine';

export const getPlansController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const plans = SubscriptionEngine.getPlans();
    return res.status(200).json({ success: true, data: plans });
  } catch (error) {
    next(error);
  }
};

export const getSubscriptionController = async (req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const userId = req.user?.userId || (req.user as any)?.id || 'usr-1';
    const sub = await SubscriptionEngine.getUserSubscription(userId);
    const usage = UsageTrackingEngine.getUsageMeters();
    return res.status(200).json({ success: true, data: { subscription: sub, usage } });
  } catch (error) {
    next(error);
  }
};

export const upgradeSubscriptionController = async (req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { planTier } = req.body;
    const userId = req.user?.userId || (req.user as any)?.id || 'usr-1';
    const updated = await SubscriptionEngine.upgradePlan(userId, planTier || 'PRO');
    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const getInvoicesController = async (_req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const invoices = InvoiceEngine.getInvoices();
    return res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    next(error);
  }
};

export const validateCouponController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    const { code } = req.body;
    const result = CouponEngine.validateCoupon(code || '');
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const webhookController = async (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
  try {
    return res.status(200).json({ success: true, data: { processed: true, event: req.body?.event || 'payment_intent.succeeded' } });
  } catch (error) {
    next(error);
  }
};
