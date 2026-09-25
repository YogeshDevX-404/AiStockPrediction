import { prisma } from '../database';
import { logger } from '../utils/logger';

export interface AlertRuleItem {
  id: string;
  userId: string;
  symbol: string;
  condition: string;
  targetValue: number;
  isEnabled: boolean;
  createdAt: string;
}

export interface AlertHistoryRecord {
  id: string;
  symbol: string;
  alertType: string;
  triggerValue: string;
  timestamp: string;
  deliveryStatus: string;
}

export const getAlertRulesService = async (userId: string): Promise<AlertRuleItem[]> => {
  try {
    const alerts = await prisma.alert.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return alerts.map((a) => ({
      id: a.id,
      userId: a.userId,
      symbol: a.symbol,
      condition: a.condition,
      targetValue: a.targetValue,
      isEnabled: !a.triggered,
      createdAt: a.createdAt.toISOString(),
    }));
  } catch (err: any) {
    logger.warn('[AlertsService] DB query error:', err.message);
    return [];
  }
};

export const createAlertRuleService = async (userId: string, data: any): Promise<AlertRuleItem> => {
  const newAlert = await prisma.alert.create({
    data: {
      userId,
      symbol: data.symbol.toUpperCase(),
      condition: data.condition || 'GREATER_THAN',
      targetValue: parseFloat(data.targetValue),
      triggered: false,
    },
  });

  return {
    id: newAlert.id,
    userId: newAlert.userId,
    symbol: newAlert.symbol,
    condition: newAlert.condition,
    targetValue: newAlert.targetValue,
    isEnabled: true,
    createdAt: newAlert.createdAt.toISOString(),
  };
};

export const deleteAlertRuleService = async (userId: string, id: string): Promise<boolean> => {
  try {
    const alert = await prisma.alert.findUnique({ where: { id } });
    if (alert && alert.userId === userId) {
      await prisma.alert.delete({ where: { id } });
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export const getAlertHistoryService = async (userId: string): Promise<AlertHistoryRecord[]> => {
  try {
    const history = await prisma.alertHistory.findMany({
      where: { alert: { userId } },
      orderBy: { timestamp: 'desc' },
    });

    return history.map((h) => ({
      id: h.id,
      symbol: h.symbol,
      alertType: h.triggerMessage,
      triggerValue: h.triggerMessage,
      timestamp: h.timestamp.toISOString(),
      deliveryStatus: 'DELIVERED',
    }));
  } catch {
    return [];
  }
};
