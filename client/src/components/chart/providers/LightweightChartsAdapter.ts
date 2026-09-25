import {
  createChart,
  IChartApi,
  ISeriesApi,
  Time,
  LineSeries,
  AreaSeries,
  BarSeries,
  CandlestickSeries,
} from 'lightweight-charts';
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

  private chart: IChartApi | null = null;
  private mainSeries: ISeriesApi<any> | null = null;

  renderChart(container: HTMLElement, options: ChartOptions): void {
    this.container = container;
    this.currentOptions = options;
    container.innerHTML = ''; // Reset container

    const chartOptions = {
      layout: {
        background: { type: 'solid' as any, color: 'transparent' },
        textColor: '#94a3b8',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
      },
      crosshair: {
        mode: 0, // Normal
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
        timeVisible: true,
      },
      autoSize: true,
    };

    this.chart = createChart(container, chartOptions);
    this.createSeries();
  }

  private createSeries() {
    if (!this.chart || !this.currentOptions) return;

    if (this.mainSeries) {
      try {
        this.chart.removeSeries(this.mainSeries);
      } catch (e) {
        // Suppress if already removed or detached
      }
      this.mainSeries = null;
    }

    const type = this.currentOptions.chartType;
    if (type === 'LINE' || type === 'BASELINE') {
      this.mainSeries = this.chart.addSeries(LineSeries, { color: '#3b82f6', lineWidth: 2 });
    } else if (type === 'AREA') {
      this.mainSeries = this.chart.addSeries(AreaSeries, {
        lineColor: '#10b981',
        topColor: 'rgba(16, 185, 129, 0.4)',
        bottomColor: 'rgba(16, 185, 129, 0.0)',
      });
    } else if (type === 'BAR') {
      this.mainSeries = this.chart.addSeries(BarSeries, {
        upColor: '#10b981',
        downColor: '#ef4444',
      });
    } else {
      this.mainSeries = this.chart.addSeries(CandlestickSeries, {
        upColor: '#10b981',
        downColor: '#ef4444',
        borderVisible: false,
        wickUpColor: '#10b981',
        wickDownColor: '#ef4444',
      });
    }
  }

  updateData(data: ChartCandlePoint[]): void {
    this.data = data;
    if (!this.mainSeries) return;

    // Deduplicate and parse timestamps safely
    const uniqueData = new Map<number, any>();
    data.forEach((d) => {
      const t = Math.floor(new Date(d.timestamp).getTime() / 1000) as number;
      if (isNaN(t)) return;

      // Ensure valid numbers to prevent chart crash
      if (typeof d.close !== 'number' || isNaN(d.close)) return;

      if (this.currentOptions?.chartType === 'LINE' || this.currentOptions?.chartType === 'AREA' || this.currentOptions?.chartType === 'BASELINE') {
        uniqueData.set(t, { time: t as Time, value: d.close });
      } else {
        if (
          typeof d.open !== 'number' || isNaN(d.open) ||
          typeof d.high !== 'number' || isNaN(d.high) ||
          typeof d.low !== 'number' || isNaN(d.low) ||
          d.high < d.low
        ) {
          return; // Skip invalid candle to prevent assertion error
        }
        uniqueData.set(t, { time: t as Time, open: d.open, high: d.high, low: d.low, close: d.close });
      }
    });

    const formattedData = Array.from(uniqueData.values());
    formattedData.sort((a, b) => (a.time as number) - (b.time as number));

    if (formattedData.length > 0) {
      try {
        this.mainSeries.setData(formattedData);
        this.chart?.timeScale().fitContent();
      } catch (e) {
        // Prevent React crash if series is detached mid-render
      }
    } else {
      try {
        this.mainSeries.setData([]);
      } catch (e) {}
    }
  }

  setChartType(type: ChartType): void {
    if (this.currentOptions && this.currentOptions.chartType !== type) {
      this.currentOptions.chartType = type;
      this.createSeries();
      this.updateData(this.data);
    }
  }

  setTimeframe(timeframe: string): void {
    // Handled by re-fetching data externally
  }

  addIndicator(indicatorId: string): void {
    this.activeIndicators.add(indicatorId);
  }

  removeIndicator(indicatorId: string): void {
    this.activeIndicators.delete(indicatorId);
  }

  exportImage(): string {
    if (!this.chart) return '';
    try {
      const canvas = this.chart.takeScreenshot();
      return canvas.toDataURL();
    } catch (e) {
      return '';
    }
  }

  destroy(): void {
    if (this.chart) {
      try {
        this.chart.remove();
      } catch (e) {}
      this.chart = null;
    }
    if (this.container) {
      this.container.innerHTML = '';
      this.container = null;
    }
    this.mainSeries = null;
  }
}
