import { create } from 'zustand';
import { AlertRule, AlertHistoryItem, AlertsApi } from '@/services/api/alertsApi';
import { toast } from 'react-hot-toast';

export interface WatchlistAlertAdapterItem {
  id: string;
  symbol: string;
  condition: string;
  targetValue: number;
}

export interface WatchlistAlertHistoryAdapterItem {
  id: string;
  symbol: string;
  message: string;
  timestamp: string;
}

interface AlertStoreState {
  rules: AlertRule[];
  alerts: WatchlistAlertAdapterItem[];
  history: AlertHistoryItem[];
  alertHistory: WatchlistAlertHistoryAdapterItem[];
  isLoading: boolean;
  fetchRulesAndHistory: () => Promise<void>;
  createRule: (rule: any) => Promise<void>;
  addAlert: (rule: any) => Promise<void>;
  deleteRule: (id: string) => Promise<void>;
  deleteAlert: (id: string) => Promise<void>;
  toggleRule: (id: string) => void;
}

const mockRules: AlertRule[] = [
  { id: 'al1', symbol: 'NVDA', alertType: 'PRICE_ABOVE', targetValue: 140.00, triggerCondition: 'Price > $140.00', priority: 'HIGH', isEnabled: true, triggerCount: 3, createdAt: '2026-03-22' },
  { id: 'al2', symbol: 'TSLA', alertType: 'RSI_OVERSOLD', targetValue: 30.00, triggerCondition: 'RSI < 30.0', priority: 'URGENT', isEnabled: true, triggerCount: 1, createdAt: '2026-03-24' },
  { id: 'al3', symbol: 'AAPL', alertType: 'PREDICTION_SHIFT', targetValue: 90.00, triggerCondition: 'AI Conviction > 90%', priority: 'MEDIUM', isEnabled: false, triggerCount: 0, createdAt: '2026-03-15' },
];

const mockHistory: AlertHistoryItem[] = [
  { id: 'alh1', symbol: 'NVDA', alertType: 'Price Above $135.00', triggerValue: '$135.50', timestamp: '2026-03-25T14:15:00Z', deliveryStatus: 'DELIVERED' },
  { id: 'alh2', symbol: 'TSLA', alertType: 'RSI Oversold < 30', triggerValue: 'RSI 28.4', timestamp: '2026-03-24T18:30:00Z', deliveryStatus: 'DELIVERED' },
];

const mapRulesToAlerts = (rulesList: AlertRule[]): WatchlistAlertAdapterItem[] =>
  rulesList.map((r) => ({ id: r.id, symbol: r.symbol, condition: r.alertType || r.triggerCondition, targetValue: r.targetValue }));

const mapHistoryToAlertHistory = (historyList: AlertHistoryItem[]): WatchlistAlertHistoryAdapterItem[] =>
  historyList.map((h) => ({ id: h.id, symbol: h.symbol, message: `${h.alertType}: ${h.triggerValue}`, timestamp: h.timestamp }));

export const useAlertStore = create<AlertStoreState>((set, get) => ({
  rules: mockRules,
  alerts: mapRulesToAlerts(mockRules),
  history: mockHistory,
  alertHistory: mapHistoryToAlertHistory(mockHistory),
  isLoading: false,

  fetchRulesAndHistory: async () => {
    try {
      set({ isLoading: true });
      const rules = await AlertsApi.getRules();
      const history = await AlertsApi.getHistory();
      set({
        rules,
        alerts: mapRulesToAlerts(rules),
        history,
        alertHistory: mapHistoryToAlertHistory(history),
        isLoading: false,
      });
    } catch {
      set({ isLoading: false });
    }
  },

  createRule: async (rule) => {
    try {
      const newRule = await AlertsApi.createRule(rule);
      const updatedRules = [...get().rules, newRule];
      set({
        rules: updatedRules,
        alerts: mapRulesToAlerts(updatedRules),
      });
      toast.success(`Created alert rule for $${newRule.symbol}!`);
    } catch {
      toast.error('Failed to create alert rule.');
    }
  },

  addAlert: async (rule) => {
    return get().createRule({
      symbol: rule.symbol,
      alertType: rule.condition || 'PRICE_ABOVE',
      targetValue: rule.targetValue,
      triggerCondition: `${rule.condition || 'PRICE_ABOVE'} ${rule.targetValue}`,
      priority: 'HIGH',
      isEnabled: true,
    });
  },

  deleteRule: async (id) => {
    try {
      await AlertsApi.deleteRule(id);
      const updatedRules = get().rules.filter((r) => r.id !== id);
      set({
        rules: updatedRules,
        alerts: mapRulesToAlerts(updatedRules),
      });
      toast.success('Deleted alert rule.');
    } catch {
      toast.error('Failed to delete alert rule.');
    }
  },

  deleteAlert: async (id) => {
    return get().deleteRule(id);
  },

  toggleRule: (id) => {
    const updatedRules = get().rules.map((r) => (r.id === id ? { ...r, isEnabled: !r.isEnabled } : r));
    set({
      rules: updatedRules,
      alerts: mapRulesToAlerts(updatedRules),
    });
    toast.success('Updated alert rule status.');
  },
}));
