import React from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useProductContext} from '../contexts/APIContext';

export default function useProducts(loadingCallback?: () => void) {
  const products = useProductContext()!;

  const productsQuery = useMutation({
    mutationFn: (page?: number, size?: number) =>
      products.getProducts(page, size),
    onSuccess: () => {
      //   console.log(productsQuery);
    },
  });

  // const categoriesQuery = useQuery({
  //   queryKey: ['categories'],
  //   queryFn: () => products.getProductCategories(),
  //   staleTime: 1000 * 60 * 60 * 24,
  // });

  const categoryProductsQuery = useMutation({
    mutationFn: ({
      categoryType,
      page,
      size,
    }: {
      categoryType: string;
      page: number;
      size?: number;
    }) => products.getCategorizedProducts(categoryType, page, size),
    onSuccess: loadingCallback,
    onError: loadingCallback,
  });

  const productDetailQuery = useMutation({
    mutationFn: (productId: number) => products.getProductDetail(productId),
    onSuccess: loadingCallback,
    onError: loadingCallback,
  });
  return {
    productsQuery,
    // categoriesQuery,
    categoryProductsQuery,
    productDetailQuery,
  };
}
