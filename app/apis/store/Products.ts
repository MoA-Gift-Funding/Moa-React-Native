import {Category, Product, ProductDetail} from '../../types/Store';
import ProductFakeClient from './ProductFakeClient';
import ProductHttpClient from './ProductHttpClient';

export class Products {
  constructor(
    private readonly apiClient: ProductHttpClient | ProductFakeClient,
  ) {
    this.apiClient = apiClient;
  }

  async getProductCategories(): Promise<Category[]> {
    const categories = await this.apiClient.categories();
    return categories.data;
  }

  async getProducts(page?: number, size?: number): Promise<Product[]> {
    const products = this.apiClient.search(page, size);
    return products;
  }

  async getCategorizedProducts(
    categoryType: string,
    page: number,
    size?: number,
  ): Promise<Product[]> {
    return this.apiClient
      .categorizedSearch(categoryType, page, size)
      .then(res => res.data.data.products)
      .catch(err => {
        console.log(err);
        throw new Error('[ERROR] Category Products를 가져오지 못함');
      });
  }

  async getProductDetail(productId: number): Promise<ProductDetail> {
    return this.apiClient
      .searchDetail(productId)
      .then(res => res.data.data.product)
      .catch(err => {
        console.log(err);
        throw new Error('[ERROR] Product를 가져오지 못함');
      });
  }
}
