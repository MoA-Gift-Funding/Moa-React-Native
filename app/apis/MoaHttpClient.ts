import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'react-native-config';
import {Contact, User} from '../types/User';
import {FundRequestStatus, NewFundItem, ShippingInfo} from '../types/Funding';

export default class MoaHttpClient {
  protected httpClient;
  constructor() {
    this.httpClient = axios.create({
      baseURL: Config.BASE_URL,
    });
  }

  // user
  moaAuth(accessToken: string, platform: string) {
    return this.httpClient.get(`/oauth/login/app/${platform}`, {
      headers: {OAuthAccessToken: accessToken},
    });
  }

  async getUser() {
    const accessToken = await AsyncStorage.getItem('accessToken');
    this.httpClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
    return this.httpClient.get('/members/my');
  }

  updateUser(data: Partial<User>) {
    return this.httpClient.put('/members', data);
  }

  requestMobileVerification(phoneNumber: string) {
    return this.httpClient.post('/members/verification/phone/send-number', {
      phoneNumber,
    });
  }

  verifyMobile(verificationNumber: string) {
    return this.httpClient.post('/members/verification/phone/verify', {
      verificationNumber,
    });
  }

  signUp(user: Partial<User>) {
    return this.httpClient.post('/members', user);
  }

  getPresignedUrl(fileName: string) {
    return this.httpClient.post('/infra/aws/s3/presigned-url', {
      fileName,
    });
  }

  // friends
  async getFriends() {
    return this.httpClient.get('/friends');
  }

  async syncContact(contacts: {contactList: Contact[]}) {
    return this.httpClient.post('/friends/sync-contact', contacts);
  }

  async blockFriend(id: number) {
    return this.httpClient.post(`/friends/block/${id}`);
  }

  async unblockFriend(id: number) {
    return this.httpClient.post(`/friends/unblock/${id}`);
  }

  // funding
  getMyAddresses() {
    return this.httpClient.get('/addresses');
  }

  createAddress(data: Omit<ShippingInfo, 'id'>) {
    return this.httpClient.post('/addresses', data);
  }

  updateAddress(data: Omit<ShippingInfo, 'id'>, id: number) {
    return this.httpClient.put(`/addresses/${id}`, data);
  }

  deleteAddress(id: number) {
    return this.httpClient.delete(`/addresses/${id}`);
  }

  createFunding(data: NewFundItem) {
    return this.httpClient.post('/fundings', data);
  }

  findMyFundings(
    page: number = 0,
    size: number = 10,
    sort: string = 'endDate,ASC',
  ) {
    return this.httpClient.get('/fundings/my', {params: {page, size, sort}});
  }

  findFriendFundings(
    statuses: FundRequestStatus = 'PROCESSING',
    page: number = 0,
    size: number = 10,
    sort: string = 'endDate,ASC',
  ) {
    return this.httpClient.get('/fundings', {
      params: {statuses, page, size, sort},
    });
  }

  getFundingDetail(id: number) {
    return this.httpClient.get(`/fundings/${id}`);
  }

  joinFund({
    orderId,
    paymentOrderId,
    message,
    visible,
  }: {
    orderId: number;
    paymentOrderId: string;
    message: string;
    visible: 'PUBLIC' | 'PRIVATE';
  }) {
    return this.httpClient.post(`/fundings/${orderId}/participate`, {
      paymentOrderId,
      message,
      visible,
    });
  }

  // payment
  sendPayInfo(data: {orderId: string; amount: number}) {
    return this.httpClient.post('/payments/toss/prepay', data);
  }

  sendSuccessPayment(paymentKey: string, orderId: string, amount: number) {
    return this.httpClient.get('/payments/toss/success', {
      params: {paymentKey, orderId, amount},
    });
  }

  sendFailPayment(message: string, code: string) {
    return this.httpClient.get('/payments/toss/fail', {
      params: {code, message},
    });
  }

  // notifications
  hasUnReadNotifications() {
    return this.httpClient.get('/notifications/check');
  }

  getNotifications() {
    return this.httpClient.get('/notifications');
  }
}
