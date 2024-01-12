import axios from 'axios';
import Config from 'react-native-config';

export default class MoaHttpClient {
  protected httpClient;
  constructor() {
    this.httpClient = axios.create({
      baseURL: Config.BASE_URL,
    });
  }

  productsClient() {
    this.httpClient.defaults.baseURL = Config.BASE_URL + '/products';
    return this.httpClient;
  }
}
