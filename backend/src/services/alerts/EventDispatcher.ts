export type SystemEventType =
  | 'MarketUpdated'
  | 'PredictionUpdated'
  | 'PatternDetected'
  | 'NewsPublished'
  | 'PortfolioChanged'
  | 'AlertTriggered';

export interface SystemEventPayload {
  type: SystemEventType;
  symbol?: string;
  data: any;
  timestamp: string;
}

export type EventListener = (event: SystemEventPayload) => void;

export class EventDispatcher {
  private static instance: EventDispatcher;
  private listeners: Map<SystemEventType, EventListener[]> = new Map();

  private constructor() {}

  public static getInstance(): EventDispatcher {
    if (!EventDispatcher.instance) {
      EventDispatcher.instance = new EventDispatcher();
    }
    return EventDispatcher.instance;
  }

  public subscribe(eventType: SystemEventType, listener: EventListener) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType)!.push(listener);
  }

  public dispatch(event: SystemEventPayload) {
    const list = this.listeners.get(event.type) || [];
    list.forEach((fn) => fn(event));
  }
}
