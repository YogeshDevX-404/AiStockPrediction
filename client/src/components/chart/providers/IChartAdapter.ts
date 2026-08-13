export type ChartType =
  | 'CANDLESTICK'
  | 'LINE'
  | 'AREA'
  | 'BAR'
  | 'BASELINE'
  | 'HEIKIN_ASHI'
  | 'RENKO'
  | 'HOLLOW_CANDLES';

export interface ChartCandlePoint {
  timestamp: string;
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ChartOptions {
  symbol: string;
  chartType: ChartType;
  theme: 'dark' | 'light';
  gridLines: boolean;
  crosshair: boolean;
  compareSymbol?: string | null;
}

export interface IChartAdapter {
  name: string;
  renderChart(container: HTMLElement, options: ChartOptions): void;
  updateData(data: ChartCandlePoint[]): void;
  setChartType(type: ChartType): void;
  setTimeframe(timeframe: string): void;
  addIndicator(indicatorId: string): void;
  removeIndicator(indicatorId: string): void;
  exportImage(): string;
  destroy(): void;
}
