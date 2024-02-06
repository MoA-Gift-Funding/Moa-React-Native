import axios from 'axios';
import Config from 'react-native-config';
import {NewFundItem, ShippingInfo} from '../types/Funding';

export class FakeHttpClient {
  protected httpClient;
  constructor() {
    this.httpClient = axios.create({
      baseURL: Config.FAKE_BASE_URL,
    });
  }

  getMyAddresses() {
    return this.httpClient.get('');
  }

  createAddress(data: Omit<ShippingInfo, 'id'>) {
    return this.httpClient.get('');
  }

  updateAddress(data: Omit<ShippingInfo, 'id'>, id: number) {
    return this.httpClient.get('');
  }

  deleteAddress(id: number) {
    return this.httpClient.get('');
  }

  createFunding(data: NewFundItem) {
    return this.httpClient.get('');
  }
}
