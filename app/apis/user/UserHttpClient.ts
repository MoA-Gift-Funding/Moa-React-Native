import AsyncStorage from '@react-native-async-storage/async-storage';
import MoaHttpClient from '../MoaHttpClient';
import {User} from '../../types/User';

export class UserHttpClient extends MoaHttpClient {
  constructor() {
    super();
  }
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
}
