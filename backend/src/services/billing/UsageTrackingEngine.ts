export interface UsageMeterItem {
  metricKey: string;
  label: string;
  consumed: number;
  limit: number;
  percentage: number;
}

export class UsageTrackingEngine {
  public static getUsageMeters(): UsageMeterItem[] {
    return [
      { metricKey: 'AI_QUERIES', label: 'AI Copilot Queries', consumed: 142, limit: 500, percentage: 28.4 },
      { metricKey: 'PREDICTIONS', label: 'AI Market Predictions', consumed: 88, limit: 200, percentage: 44.0 },
      { metricKey: 'SCREENSHOTS', label: 'Vision Screenshot Analyses', consumed: 12, limit: 50, percentage: 24.0 },
    ];
  }
}
