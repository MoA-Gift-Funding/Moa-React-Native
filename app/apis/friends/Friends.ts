import {Contact} from '../../types/User';
import {FriendsHttpClient} from './FriendsHttpClients';

export class Friends {
  constructor(
    private readonly apiClient: FriendsHttpClient | FriendsHttpClient,
  ) {
    this.apiClient = apiClient;
  }

  async getList(): Promise<Contact[]> {
    const friends = await this.apiClient.getFriends();
    return friends.data;
  }

  async block(friendId: number) {
    await this.apiClient.blockFriend(friendId);
  }

  async unblock(friendId: number) {
    await this.apiClient.unblockFriend(friendId);
  }

  async syncronize(contacts: {contactList: Contact[]}) {
    await this.apiClient.syncContact(contacts);
    const friends = await this.getList();
    return friends;
  }
}
