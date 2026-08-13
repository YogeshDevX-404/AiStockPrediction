import { EventDispatcher, SystemEventPayload } from './EventDispatcher';
import { InAppDeliveryAdapter, MockEmailDeliveryAdapter } from './IDeliveryChannel';

export interface AlertRuleItem {
  id: string;
  symbol: string;
  alertType: 'PRICE_ABOVE' | 'PRICE_BELOW' | 'RSI_OVERSOLD' | 'GOLDEN_CROSS' | 'PREDICTION_SHIFT' | 'BREAKING_NEWS';
  targetValue: number;
  triggerCondition: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  isEnabled: boolean;
  triggerCount: number;
  createdAt: string;
}

export class AlertEngine {
  private static rules: AlertRuleItem[] = [
    { id: 'al1', symbol: 'NVDA', alertType: 'PRICE_ABOVE', targetValue: 140.00, triggerCondition: 'Price > $140.00', priority: 'HIGH', isEnabled: true, triggerCount: 3, createdAt: '2026-03-22' },
    { id: 'al2', symbol: 'TSLA', alertType: 'RSI_OVERSOLD', targetValue: 30.00, triggerCondition: 'RSI < 30.0', priority: 'URGENT', isEnabled: true, triggerCount: 1, createdAt: '2026-03-24' },
    { id: 'al3', symbol: 'AAPL', alertType: 'PREDICTION_SHIFT', targetValue: 90.00, triggerCondition: 'AI Conviction > 90%', priority: 'MEDIUM', isEnabled: false, triggerCount: 0, createdAt: '2026-03-15' },
  ];

  public static getRules(): AlertRuleItem[] {
    return this.rules;
  }

  public static addRule(rule: Omit<AlertRuleItem, 'id' | 'triggerCount' | 'createdAt'>): AlertRuleItem {
    const newRule: AlertRuleItem = {
      ...rule,
      id: `al_${Date.now()}`,
      triggerCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.rules.push(newRule);
    return newRule;
  }

  public static deleteRule(id: string): boolean {
    const idx = this.rules.findIndex((r) => r.id === id);
    if (idx !== -1) this.rules.splice(idx, 1);
    return true;
  }
}
