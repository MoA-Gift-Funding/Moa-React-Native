import {FakeHttpClient} from '../FakeHttpClient';

export class UserFakeClient extends FakeHttpClient {
  constructor() {
    super();
  }
  moaAuth(accessToken: string, platform: string) {
    return this.httpClient.get('');
  }
  async getUser() {
    return this.httpClient.get('');
  }
}
