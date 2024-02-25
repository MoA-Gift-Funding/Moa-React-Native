import {CSCategories, CustomerServicePostItem} from '../../types/CS';
import {FakeHttpClient} from '../FakeHttpClient';
import MoaHttpClient from '../MoaHttpClient';

export default class CustomerService {
  constructor(private readonly apiClient: MoaHttpClient | FakeHttpClient) {
    this.apiClient = apiClient;
  }

  async getFaqs(): Promise<CustomerServicePostItem[]> {
    try {
      const faqs = await this.apiClient.getFaqs();
      return faqs.data;
    } catch (error: any) {
      console.error(error.response.data);
      switch (error.status) {
        default:
          throw Error;
      }
    }
  }

  async getPersonalInquiries(): Promise<CustomerServicePostItem[]> {
    try {
      const inquiries = await this.apiClient.getPersonalInquiries();
      return inquiries.data;
    } catch (error: any) {
      console.error(error.response.data);
      switch (error.status) {
        default:
          throw Error;
      }
    }
  }

  async postPersonalInquiry(data: {category: CSCategories; content: string}) {
    try {
      const updated = await this.apiClient.postPersonalInquiry(data);
      return updated.data;
    } catch (error: any) {
      console.error(error.response.data);
      switch (error.status) {
        default:
          throw Error;
      }
    }
  }
}
