import axios from 'axios';
import Config from 'react-native-config';

export class FakeHttpClient {
  protected httpClient;
  constructor() {
    this.httpClient = axios.create({
      baseURL: Config.FAKE_BASE_URL,
    });
  }
}
