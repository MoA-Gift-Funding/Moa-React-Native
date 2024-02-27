import React from 'react';
import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import {useUserContext} from '../../contexts/UserContext';
import {Order} from '../../apis/order/Order';

const useOrder = () => {
  const {
    userState: {user},
    useApi: {client},
  } = useUserContext();
  const order = new Order(client);

  const {
    data: orderInfiniteQuery,
    fetchNextPage: orderFetchNextPageQuery,
    refetch: refetchOrderInfiniteQuery,
  } = useInfiniteQuery({
    queryKey: ['orders', user?.id],
    queryFn: ({pageParam = 0}) => order.getOrders(pageParam),
    getNextPageParam: lastPage => {
      if (lastPage.hasNext) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
  });

  const {mutateAsync: orderDetailQuery} = useMutation({
    mutationFn: (orderId: number) => order.getOrderDetail(orderId),
  });

  return {
    orderInfiniteQuery,
    orderFetchNextPageQuery,
    refetchOrderInfiniteQuery,
    orderDetailQuery,
  };
};

export default useOrder;
