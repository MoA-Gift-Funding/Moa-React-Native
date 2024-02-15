import {NotificationItem} from '../../types/Notification';
import {FakeHttpClient} from '../FakeHttpClient';
import MoaHttpClient from '../MoaHttpClient';

export default class Notification {
  constructor(private readonly apiClient: MoaHttpClient | FakeHttpClient) {
    this.apiClient = apiClient;
  }

  async hasUnRead() {
    try {
      const read = await this.apiClient.hasUnReadNotifications();
      return read.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }

  async getNotifications(): Promise<NotificationItem[]> {
    try {
      const notis = await this.apiClient.getNotifications();
      return notis.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }
}
