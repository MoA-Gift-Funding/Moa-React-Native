import React from 'react';
import {useUserContext} from '../contexts/UserContext';
import Funding from '../apis/fund/Funding';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {ShippingInfo} from '../types/Funding';
import {useNavigation} from '@react-navigation/native';

const useFunding = () => {
  const {
    userState: {user},
    useApi: {client},
  } = useUserContext();
  const funding = new Funding(client);
  const queryClient = useQueryClient();

  const {data: addrsQuery} = useQuery({
    queryKey: ['addresses', user?.id],
    queryFn: () => funding.getAddresses(),
  });

  const {mutate: createAddrQuery} = useMutation({
    mutationFn: (data: Omit<ShippingInfo, 'id'>) => funding.createAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['addresses', user?.id]});
    },
  });

  return {addrsQuery, createAddrQuery};
};

export default useFunding;
