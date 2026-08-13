export interface StressScenarioItem {
  name: string;
  impactPercent: number;
  estimatedPnl: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export class ScenarioAnalysisEngine {
  public static getStressScenarios(): StressScenarioItem[] {
    return [
      { name: 'Broad Market Correction (-20% S&P 500)', impactPercent: -14.2, estimatedPnl: -2425.92, severity: 'HIGH' },
      { name: 'Tech Sector Rotation (-15% Semiconductors)', impactPercent: -8.5, estimatedPnl: -1452.14, severity: 'MEDIUM' },
      { name: 'Interest Rate Hike (+50 bps Fed Rate)', impactPercent: -4.1, estimatedPnl: -700.44, severity: 'LOW' },
      { name: 'Bull Market Rally (+15% Tech Surge)', impactPercent: +18.4, estimatedPnl: +3143.45, severity: 'LOW' },
    ];
  }
}
