import React, {useContext} from 'react';
import {createContext} from 'react';
import ProductHttpClient from '../apis/store/ProductHttpClient';
import {Products} from '../apis/store/Products';
import ProductFakeClient from '../apis/store/ProductFakeClient';

// const productClient = new ProductHttpClient();
const productClient = new ProductFakeClient();
const products = new Products(productClient);
export const ProductContext = createContext<Products | null>(null);
// {
/* <Products>({
  apiClient: '',
  getProductCategories: async () => [
    {id: 0, name: '', image: '', categoryType: ''},
  ],
  getProducts: async () => [
    {
      id: 0,
      image: '',
      brand: '',
      name: '',
      price: '',
      salesNumber: '',
      categoryType: '',
    },
  ],
  getCategorizedProducts: async () => [
    {
      id: 0,
      image: '',
      brand: '',
      name: '',
      price: '',
      salesNumber: '',
      categoryType: '',
    },
  ],
  getProductDetail: async () => {
    return {
      id: 0,
      image: '',
      brand: '',
      name: '',
      price: '',
      salesNumber: '',
      categoryType: '',
      description: '',
      notes: '',
      directions: '',
    };
  },
}); */
// }
export function ProductContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProductContext = () => useContext(ProductContext);
