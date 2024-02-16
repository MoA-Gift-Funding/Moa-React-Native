import {NotificationItem, NotificationStatus} from '../../types/Notification';
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

  async getNotificationStatus(): Promise<NotificationStatus> {
    try {
      const status = await this.apiClient.getNotificationStatus();
      return status.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }

  async permitNotification(deviceToken: string) {
    try {
      const permitted = await this.apiClient.permitNotification(deviceToken);
      return permitted.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }

  async disallowNotification() {
    try {
      const denied = await this.apiClient.disallowNotification();
      return denied.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }
}
