import {Contact} from '../../types/User';
import {FakeHttpClient} from '../FakeHttpClient';

export class FriendsFakeClient extends FakeHttpClient {
  constructor() {
    super();
  }

  getFriends() {
    return this.httpClient.get('');
  }

  syncContact(contacts: {contactList: Contact[]}) {
    return this.httpClient.get('');
  }

  blockFriend(id: number) {
    return this.httpClient.get('');
  }

  unblockFriend(id: number) {
    return this.httpClient.get('');
  }
}
