import React from 'react';
import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import {Products} from '../../apis/products/Products';
import {useUserContext} from '../../contexts/UserContext';

export default function useProducts(loadingCallback?: () => void) {
  const {
    useApi: {client},
  } = useUserContext();
  const products = new Products(client);

  const {
    data: productsInfiniteQuery,
    fetchNextPage: productsFetchNextQuery,
    refetch: productsRefetchQuery,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({pageParam = 0}) => products.getProducts(pageParam, 14),
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
