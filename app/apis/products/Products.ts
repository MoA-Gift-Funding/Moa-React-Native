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
  ): Promise<ProductsResponse> {
    try {
      const products = await this.apiClient.getProducts(page, size, sort);
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
