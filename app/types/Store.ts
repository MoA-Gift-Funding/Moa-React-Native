export interface Category {
  id?: number;
  name: string;
  image: string;
  categoryType: string;
}

export interface Product {
  id: number;
  image: string;
  brand: string;
  name: string;
  price: string;
  salesNumber?: string;
  categoryType?: string;
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
