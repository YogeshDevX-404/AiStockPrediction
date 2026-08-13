import { AlertEngine, AlertRuleItem } from './alerts/AlertEngine';

export interface AlertHistoryRecord {
  id: string;
  symbol: string;
  alertType: string;
  triggerValue: string;
  timestamp: string;
  deliveryStatus: string;
}

const mockAlertHistory: AlertHistoryRecord[] = [
  { id: 'alh1', symbol: 'NVDA', alertType: 'Price Above $135.00', triggerValue: '$135.50', timestamp: '2026-03-25T14:15:00Z', deliveryStatus: 'DELIVERED' },
  { id: 'alh2', symbol: 'TSLA', alertType: 'RSI Oversold < 30', triggerValue: 'RSI 28.4', timestamp: '2026-03-24T18:30:00Z', deliveryStatus: 'DELIVERED' },
];

export const getAlertRulesService = async (): Promise<AlertRuleItem[]> => {
  return AlertEngine.getRules();
};

export const createAlertRuleService = async (rule: any): Promise<AlertRuleItem> => {
  return AlertEngine.addRule(rule);
};

export const deleteAlertRuleService = async (id: string): Promise<boolean> => {
  return AlertEngine.deleteRule(id);
};

export const getAlertHistoryService = async (): Promise<AlertHistoryRecord[]> => {
  return mockAlertHistory;
};
