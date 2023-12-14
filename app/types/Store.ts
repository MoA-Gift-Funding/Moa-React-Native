export interface Category {
  name: string;
  image: string;
}

export interface Product {
  uri: string;
  brand: string;
  productName: string;
  price: string;
  salesNumber?: string;
  description: string;
  notes: string;
  directions: string;
  categoryType: string;
}
