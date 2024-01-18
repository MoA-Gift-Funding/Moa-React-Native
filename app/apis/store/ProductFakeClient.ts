import {FakeHttpClient} from '../FakeHttpClient';

export default class ProductFakeClient extends FakeHttpClient {
  constructor() {
    super();
  }

  categories() {
    return this.httpClient.get(
      'https://my-json-server.typicode.com/MoA-Gift-Funding/fakeDB',
    );
  }
  search(page: number = 0, size: number = 6) {
    return this.httpClient.get(
      'https://my-json-server.typicode.com/MoA-Gift-Funding/fakeDB/products',
    );
  }
  categorizedSearch(categoryType: string, page: number = 0, size: number = 6) {
    return this.httpClient.get(
      'https://my-json-server.typicode.com/MoA-Gift-Funding/fakeDB/products',
    );
  }
  searchDetail(productId: number) {
    return this.httpClient.get(
      'https://my-json-server.typicode.com/MoA-Gift-Funding/fakeDB/product',
    );
  }
}
