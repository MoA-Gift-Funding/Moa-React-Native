import {Fund, ShippingInfo} from '../../types/Funding';
import {FakeHttpClient} from '../FakeHttpClient';
import MoaHttpClient from '../MoaHttpClient';
import {Axios} from '../axios.config';

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
      return addr.data;
    } catch (error: any) {
      console.log(error.response.data);
      throw error;
    }
  }
}

export const createFund = async (params: Fund) => {
  try {
    const result = await Axios.post('/funding/create-funding', params)
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(error => console.log(error.response));
    return result;
  } catch (error) {
    console.log(error);
    throw new Error('[ERROR] 네트워크 에러');
  }
};
