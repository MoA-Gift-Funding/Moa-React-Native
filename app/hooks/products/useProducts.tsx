import React from 'react';
import {useInfiniteQuery, useMutation} from '@tanstack/react-query';
import {Products} from '../../apis/products/Products';
import {useUserContext} from '../../contexts/UserContext';
import {Categories} from '../../types/Store';

export default function useProducts(category?: Categories) {
  const {
    useApi: {client},
  } = useUserContext();
  const products = new Products(client);

  const {
    data: productsInfiniteQuery,
    fetchNextPage: productsFetchNextQuery,
    refetch: productsRefetchQuery,
  } = useInfiniteQuery({
    queryKey: ['products', category],
    queryFn: ({pageParam = 0}) =>
      products.getProducts(pageParam, 14, undefined, category),
    getNextPageParam: lastPage => {
      if (lastPage.hasNext) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
  });

  const {mutateAsync: productDetailQuery} = useMutation({
    mutationFn: (productId: number) => products.getProductDetail(productId),
  });

  return {
    productsInfiniteQuery,
    productsFetchNextQuery,
    productsRefetchQuery,
    productDetailQuery,
  };
}
