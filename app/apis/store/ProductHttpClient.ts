import MoaHttpClient from '../MoaHttpClient';

export default class ProductHttpClient extends MoaHttpClient {
  constructor() {
    super();
  }
  categories() {
    return this.httpClient.get('category/get-category');
  }
  search(page: number = 0, size: number = 6) {
    return this.httpClient.get(
      `products/get-product-list?page=${page}&size=${size}`,
    );
  }
  categorizedSearch(categoryType: string, page: number = 0, size: number = 6) {
    return this.httpClient.get(
      `products/get-category-product-list/${categoryType}/popular?page=${page}&size=${size}`,
    );
  }
  searchDetail(productId: number) {
    return this.httpClient.get(`products/get-product/${productId}`);
  }
}
