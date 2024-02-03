import React from 'react';
import {useUserContext} from '../contexts/UserContext';
import Funding from '../apis/fund/Funding';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {NewFundItem, ShippingInfo} from '../types/Funding';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const useFunding = () => {
  const {
    userState: {user},
    useApi: {client},
  } = useUserContext();
  const funding = new Funding(client);
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const {data: addrsQuery} = useQuery({
    queryKey: ['addresses', user?.id],
    queryFn: () => funding.getAddresses(),
  });

  const {mutate: createAddrQuery} = useMutation({
    mutationFn: (data: Omit<ShippingInfo, 'id'>) => funding.createAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['addresses', user?.id]});
      Toast.show({
        type: 'success',
        text1: '배송지가 추가되었어요🚚',
      });
    },
  });

  const {mutate: createFundingQuery} = useMutation({
    mutationFn: (data: NewFundItem) => funding.createFunding(data),
    onSuccess: () => {
      navigation.navigate('FundCompleted');
    },
  });

  return {addrsQuery, createAddrQuery, createFundingQuery};
};

export default useFunding;
