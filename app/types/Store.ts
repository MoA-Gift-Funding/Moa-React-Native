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
  currentPage: number;
  pageSize: number;
}

export interface ProductDetail {
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
  description: string;
  saleEndDate: string;
  discountRate: number;
  limitDate: number;
  status: 'SALES' | 'SALES_DISCONTINUED';
  options: [
    {
      id: number;
      optionName: string;
      code: string;
      status: 'SUPPORTED';
    },
  ];
  productExchangeRefundPolicy: {
    policies: [
      {
        title: string;
        content: string[];
      },
    ];
  };
}
