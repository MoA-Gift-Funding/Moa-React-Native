import React from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useUserContext} from '../../contexts/UserContext';
import {Order} from '../../apis/order/Order';

const useOrder = () => {
  const {
    userState: {user},
    useApi: {client},
  } = useUserContext();
  const order = new Order(client);

  const {data: ordersQuery} = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: () => order.getOrders(),
  });

  const {mutateAsync: orderDetailQuery} = useMutation({
    mutationFn: (orderId: number) => order.getOrderDetail(orderId),
  });

  return {ordersQuery, orderDetailQuery};
};

export default useOrder;
