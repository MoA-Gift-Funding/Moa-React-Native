import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'react-native-config';
import {Contact, User} from '../types/User';
import {NewFundItem, ShippingInfo} from '../types/Funding';

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

  createFunding(data: NewFundItem) {
    return this.httpClient.post('/fundings', data);
  }
}
