import React from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getCategories,
  getCategoryProducts,
  getProduct,
  getProducts,
} from '../apis/store/Store';

export default function useProducts(loadingCallback?: () => void) {
  const productsQuery = useMutation({
    mutationFn: (page: number) => getProducts(page),
    onSuccess: () => {
      //   console.log(productsQuery);
    },
  });

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const categoryProductsQuery = useMutation({
    mutationFn: ({categoryType, page}: {categoryType: string; page: number}) =>
      getCategoryProducts(categoryType, page),
    onSuccess: loadingCallback,
    onError: loadingCallback,
  });

  const productDetailQuery = useMutation({
    mutationFn: (productId: number) => getProduct(productId),
    onSuccess: loadingCallback,
    onError: loadingCallback,
  });
  return {
    productsQuery,
    categoriesQuery,
    categoryProductsQuery,
    productDetailQuery,
  };
}
