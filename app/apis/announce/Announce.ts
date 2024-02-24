import {FakeHttpClient} from '../FakeHttpClient';
import MoaHttpClient from '../MoaHttpClient';

export default class Announce {
  constructor(private readonly apiClient: MoaHttpClient | FakeHttpClient) {
    this.apiClient = apiClient;
  }

  async getAnnouncements() {
    try {
      const announces = await this.apiClient.getAnnouncements();
      return announces.data;
    } catch (error: any) {
      console.error(error.response.data);
      switch (error.response.status) {
        default:
          throw error;
      }
    }
  }
}
