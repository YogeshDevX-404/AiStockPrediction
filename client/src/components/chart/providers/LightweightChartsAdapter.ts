import {
  IChartAdapter,
  ChartCandlePoint,
  ChartOptions,
  ChartType,
} from './IChartAdapter';

export class LightweightChartsAdapter implements IChartAdapter {
  readonly name = 'LightweightChartsAdapter';
  private container: HTMLElement | null = null;
  private currentOptions: ChartOptions | null = null;
  private data: ChartCandlePoint[] = [];
  private activeIndicators: Set<string> = new Set();

  renderChart(container: HTMLElement, options: ChartOptions): void {
    this.container = container;
    this.currentOptions = options;
    container.innerHTML = ''; // Reset container
  }

  updateData(data: ChartCandlePoint[]): void {
    this.data = data;
  }

  setChartType(type: ChartType): void {
    if (this.currentOptions) {
      this.currentOptions.chartType = type;
    }
  }

  setTimeframe(timeframe: string): void {
    // Re-render chart for timeframe
  }

  addIndicator(indicatorId: string): void {
    this.activeIndicators.add(indicatorId);
  }

  removeIndicator(indicatorId: string): void {
    this.activeIndicators.delete(indicatorId);
  }

  exportImage(): string {
    if (!this.container) return '';
    // Capture SVG/Canvas to DataURL
    const svgElement = this.container.querySelector('svg');
    if (!svgElement) return '';
    const xml = new XMLSerializer().serializeToString(svgElement);
    const svg64 = btoa(xml);
    return `data:image/svg+xml;base64,${svg64}`;
  }

  destroy(): void {
    if (this.container) {
      this.container.innerHTML = '';
      this.container = null;
    }
  }
}
