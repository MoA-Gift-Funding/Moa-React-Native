export type ProductStatus = 'SALES' | 'SALES_DISCONTINUED';

export interface Product {
  id: number;
  productId: {
    productId: string;
    productProvider: string;
  };
  imageUrl: string;
  brand: string;
  category: string;
  productName: string;
  price: number;
  discountRate: number;
  limitDate: number;
  status: ProductStatus;
}

export interface ProductsResponse {
  content: Product[];
  hasNext: true;
  currentPage: 0;
  pageSize: 0;
}

export interface ProductDetail {
  id?: number;
  image: string;
  brand: string;
  name: string;
  price: string;
  salesNumber?: string;
  description: string;
  notes: string;
  directions: string;
  categoryType?: string;
}
