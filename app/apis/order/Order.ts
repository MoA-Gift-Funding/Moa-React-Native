import {OrderDetailItem, OrderResponse} from '../../types/Order';
import {FakeHttpClient} from '../FakeHttpClient';
import MoaHttpClient from '../MoaHttpClient';

export class Order {
  constructor(private readonly apiClient: MoaHttpClient | FakeHttpClient) {
    this.apiClient = apiClient;
  }

  async getOrders(): Promise<OrderResponse> {
    try {
      const orders = await this.apiClient.getOrders();
      return orders.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }

  async getOrderDetail(orderId: number): Promise<OrderDetailItem> {
    try {
      const order = await this.apiClient.getOrderDetail(orderId);
      return order.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }
}
