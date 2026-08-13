export interface DeliveryPayload {
  title: string;
  message: string;
  symbol?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
}

export interface IDeliveryChannel {
  name: string;
  sendNotification(payload: DeliveryPayload): Promise<boolean>;
}

export class InAppDeliveryAdapter implements IDeliveryChannel {
  readonly name = 'InAppChannelAdapter';

  async sendNotification(_payload: DeliveryPayload): Promise<boolean> {
    return true;
  }
}

export class MockEmailDeliveryAdapter implements IDeliveryChannel {
  readonly name = 'MockEmailChannelAdapter';

  async sendNotification(_payload: DeliveryPayload): Promise<boolean> {
    return true;
  }
}
