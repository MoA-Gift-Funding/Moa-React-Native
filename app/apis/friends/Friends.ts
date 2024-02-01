import {Contact, Friend} from '../../types/User';
import {FriendsHttpClient} from './FriendsHttpClients';

export class Friends {
  constructor(
    private readonly apiClient: FriendsHttpClient | FriendsHttpClient,
  ) {
    this.apiClient = apiClient;
  }

  async getList(): Promise<Friend[]> {
    try {
      const friends = await this.apiClient.getFriends();
      return friends.data;
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }

  async block(friendId: number) {
    try {
      await this.apiClient.blockFriend(friendId);
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }

  async unblock(friendId: number) {
    try {
      await this.apiClient.unblockFriend(friendId);
    } catch (error: any) {
      console.error(error.response.data);
      throw error;
    }
  }

  async syncronize(contacts: {contactList: Contact[]}) {
    await this.apiClient.syncContact(contacts);
    const friends = await this.getList();
    return friends;
  }
}
