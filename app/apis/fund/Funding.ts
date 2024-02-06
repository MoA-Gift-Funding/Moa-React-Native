import {NewFundItem, ShippingInfo} from '../../types/Funding';
import {FakeHttpClient} from '../FakeHttpClient';
import MoaHttpClient from '../MoaHttpClient';

export default class Funding {
  constructor(private readonly apiClient: MoaHttpClient | FakeHttpClient) {
    this.apiClient = apiClient;
  }

  async getAddresses() {
    try {
      const addrs = await this.apiClient.getMyAddresses();
      return addrs.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }

  async createAddress(data: Omit<ShippingInfo, 'id'>) {
    try {
      const addr = await this.apiClient.createAddress(data);
      const id = addr.headers.location.split('/');
      return id[2];
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }

  async updateAddress(data: Omit<ShippingInfo, 'id'>, id: number) {
    try {
      const addr = await this.apiClient.updateAddress(data, id);
      return addr.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }

  async deleteAddress(id: number) {
    try {
      const deleted = await this.apiClient.deleteAddress(id);
      return deleted.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }

  async createFunding(data: NewFundItem) {
    try {
      const fund = await this.apiClient.createFunding(data);
      return fund.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }
}
