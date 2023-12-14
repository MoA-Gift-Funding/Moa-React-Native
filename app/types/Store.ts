export interface Category {
  name: string;
  image: string;
}

export interface Product {
  id?: number;
  image: string;
  brand: string;
  name: string;
  price: string;
  salesNumber?: string;
  description: string;
  notes: string;
  directions: string;
  categoryType: string;
}
