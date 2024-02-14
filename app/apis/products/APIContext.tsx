import React, {useContext} from 'react';
import {createContext} from 'react';
import ProductHttpClient from './ProductHttpClient';
import ProductFakeClient from './ProductFakeClient';
import {Products} from './Products';

// const productClient = new ProductHttpClient();
const productClient = new ProductFakeClient();
const products = new Products(productClient);
export const ProductContext = createContext<Products | null>(null);
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
