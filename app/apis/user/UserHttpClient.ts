import AsyncStorage from '@react-native-async-storage/async-storage';
import MoaHttpClient from '../MoaHttpClient';

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
}
