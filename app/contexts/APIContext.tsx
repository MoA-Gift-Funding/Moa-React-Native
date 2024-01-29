import React, {useContext} from 'react';
import {createContext} from 'react';
import ProductHttpClient from '../apis/store/ProductHttpClient';
import {Products} from '../apis/store/Products';
import ProductFakeClient from '../apis/store/ProductFakeClient';

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
