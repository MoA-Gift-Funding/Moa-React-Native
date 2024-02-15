import {FakeHttpClient} from '../FakeHttpClient';
import MoaHttpClient from '../MoaHttpClient';

export default class Notification {
  constructor(private readonly apiClient: MoaHttpClient | FakeHttpClient) {
    this.apiClient = apiClient;
  }

  async isRead() {
    try {
      const read = await this.apiClient.isNotificationRead();
      return read.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }

  async getNotifications() {
    try {
      const notis = await this.apiClient.getNotifications();
      return notis.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }
}
