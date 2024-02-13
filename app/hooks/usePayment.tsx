import React from 'react';
import Payment from '../apis/fund/Payment';
import {useUserContext} from '../contexts/UserContext';
import {useMutation} from '@tanstack/react-query';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import useFunding from './useFunding';

const usePayment = () => {
  const {
    useApi: {client},
  } = useUserContext();
  const payment = new Payment(client);
  const navigation = useNavigation();
  const {joinFund} = useFunding();

  const {mutate: prePayQuery} = useMutation({
    mutationFn: (data: {orderId: string; amount: number}) =>
      payment.sendPayInfo(data),
    onError: () => {
      Toast.show({
        type: 'error',
        text1: '에러가 발생했어요. 다시 시도해주세요.',
      });
    },
  });

  const {mutateAsync: successPaymentQuery} = useMutation({
    mutationFn: ({
      paymentKey,
      orderId,
      amount,
    }: {
      paymentKey: string;
      orderId: string;
      amount: number;
    }) => payment.sendSuccessPayment(paymentKey, orderId, amount),
  });

  const {mutateAsync: failPaymentQuery} = useMutation({
    mutationFn: ({message, code}: {message: string; code: string}) =>
      payment.sendFailPayment(message, code),
    onSuccess: () => {
      Toast.show({
        type: 'error',
        text1: '결제가 이루어지지 않았어요. 다시 시도해주세요.',
      });
      navigation.goBack();
    },
  });

  return {prePayQuery, successPaymentQuery, failPaymentQuery};
};

export default usePayment;
