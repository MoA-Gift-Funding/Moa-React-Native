import {Contact} from '../../types/User';
import MoaHttpClient from '../MoaHttpClient';

export class FriendsHttpClient extends MoaHttpClient {
  constructor() {
    super();
  }
  getFriends() {
    return this.httpClient.get('/friends');
  }

  syncContact(contacts: {contactList: Contact[]}) {
    return this.httpClient.post('/friends/sync-contact', contacts);
  }

  blockFriend(id: number) {
    return this.httpClient.post(`/friends/block/${id}`);
  }

  unblockFriend(id: number) {
    return this.httpClient.post(`/friends/block/${id}`);
  }
}
