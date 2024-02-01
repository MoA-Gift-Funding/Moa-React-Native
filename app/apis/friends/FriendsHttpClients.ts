import AsyncStorage from '@react-native-async-storage/async-storage';
import {Contact} from '../../types/User';
import MoaHttpClient from '../MoaHttpClient';

export class FriendsHttpClient extends MoaHttpClient {
  constructor() {
    super();
  }

  async getFriends() {
    const accessToken = await AsyncStorage.getItem('accessToken');
    this.httpClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
    return this.httpClient.get('/friends');
  }

  async syncContact(contacts: {contactList: Contact[]}) {
    const accessToken = await AsyncStorage.getItem('accessToken');
    this.httpClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
    return this.httpClient.post('/friends/sync-contact', contacts);
  }

  async blockFriend(id: number) {
    const accessToken = await AsyncStorage.getItem('accessToken');
    this.httpClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
    return this.httpClient.post(`/friends/block/${id}`);
  }

  async unblockFriend(id: number) {
    const accessToken = await AsyncStorage.getItem('accessToken');
    this.httpClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
    return this.httpClient.post(`/friends/unblock/${id}`);
  }
}
