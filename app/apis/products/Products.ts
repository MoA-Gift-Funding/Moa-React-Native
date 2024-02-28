import {ProductDetail, ProductsResponse} from '../../types/Store';
import {FakeHttpClient} from '../FakeHttpClient';
import MoaHttpClient from '../MoaHttpClient';

export class Products {
  constructor(private readonly apiClient: MoaHttpClient | FakeHttpClient) {
    this.apiClient = apiClient;
  }

  async getProducts(
    page?: number,
    size?: number,
    sort?: string,
    category?:
      | '상품권'
      | '피자/치킨'
      | '뷰티'
      | '식품/건강'
      | '편의점'
      | '리빙/잡화'
      | '영화'
      | undefined,
  ): Promise<ProductsResponse> {
    try {
      const products = await this.apiClient.getProducts(
        page,
        size,
        sort,
        category,
      );
      return products.data;
    } catch (error: any) {
      console.error(error.response.data);
      switch (error.response.status) {
        default:
          throw error;
      }
    }
  }

  async getProductDetail(productId: number): Promise<ProductDetail> {
    try {
      const product = await this.apiClient.getProductDetail(productId);
      return product.data;
    } catch (error: any) {
      console.error(error.response.data);
      switch (error.response.status) {
        default:
          throw error;
      }
    }
  }
}
