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
    console.log(categories.data);
    console.log(categories.status);

    return categories.data.data;
  }

  async getProducts(page?: number, size?: number): Promise<Product[]> {
    return this.apiClient
      .search(page, size)
      .then(res => res.data.data.products)
      .catch(err => {
        console.log(err);
        throw new Error('[ERROR] Products 리스트를 가져오지 못함');
      });
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
