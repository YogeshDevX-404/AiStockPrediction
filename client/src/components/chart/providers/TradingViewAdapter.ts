import {
  IChartAdapter,
  ChartCandlePoint,
  ChartOptions,
  ChartType,
} from './IChartAdapter';

export class TradingViewAdapter implements IChartAdapter {
  readonly name = 'TradingViewAdapter';
  private container: HTMLElement | null = null;

  renderChart(container: HTMLElement, _options: ChartOptions): void {
    this.container = container;
  }

  updateData(_data: ChartCandlePoint[]): void {}
  setChartType(_type: ChartType): void {}
  setTimeframe(_timeframe: string): void {}
  addIndicator(_indicatorId: string): void {}
  removeIndicator(_indicatorId: string): void {}
  exportImage(): string {
    return '';
  }
  destroy(): void {
    if (this.container) {
      this.container.innerHTML = '';
      this.container = null;
    }
  }
}
