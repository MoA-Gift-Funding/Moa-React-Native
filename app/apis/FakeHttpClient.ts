import axios from 'axios';
import Config from 'react-native-config';
import {FundRequestStatus, NewFundItem, ShippingInfo} from '../types/Funding';

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

  findMyFundings(
    page: number = 0,
    size: number = 10,
    sort: string = 'endDate,ASC',
  ) {
    return this.httpClient.get('');
  }

  findFriendFundings(
    statuses: FundRequestStatus,
    page: number = 0,
    size: number = 10,
    sort: string = 'endDate,ASC',
  ) {
    return this.httpClient.get('');
  }

  getFundingDetail(id: number) {
    return this.httpClient.get('');
  }

  // payment
  sendPayInfo(data: {orderId: string; amount: number}) {
    return this.httpClient.get('');
  }

  sendSuccessPayment(paymentKey: string, orderId: string, amount: number) {
    return this.httpClient.get('');
  }

  sendFailPayment(message: string, code: number) {
    return this.httpClient.get('');
  }
}
