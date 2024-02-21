import React from 'react';
import Payment from '../../apis/payments/Payment';
import {useUserContext} from '../../contexts/UserContext';
import {useMutation} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import useFunding from '../fundings/useFunding';
import {MessageStatus} from '../../types/Funding';

const usePayment = ({nickName}: {nickName: string}) => {
  const {
    useApi: {client},
  } = useUserContext();
  const payment = new Payment(client);
  const {joinFundQuery, finishFundQuery} = useFunding();

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
      fundingId,
      message,
      visible,
      isFundOwner,
    }: {
      paymentKey: string;
      orderId: string;
      amount: number;
      fundingId: number;
      message?: string;
      visible?: MessageStatus;
      isFundOwner: boolean;
    }) => payment.sendSuccessPayment(paymentKey, orderId, amount),
    onSuccess: (data, {orderId, fundingId, message, visible, isFundOwner}) => {
      if (isFundOwner) {
        finishFundQuery({fundingId, paymentOrderId: orderId, nickName});
      } else {
        joinFundQuery({
          fundingId,
          paymentOrderId: orderId,
          message,
          visible,
          nickName,
        });
      }
    },
  });

  // const {mutateAsync: failPaymentQuery} = useMutation({
  //   mutationFn: ({message, code}: {message: string; code: string}) =>
  //     payment.sendFailPayment(message, code),
  //   onSuccess: () => {
  //     Toast.show({
  //       type: 'error',
  //       text1: '결제가 이루어지지 않았어요. 다시 시도해주세요.',
  //     });
  //     navigation.goBack();
  //   },
  // });

  return {prePayQuery, successPaymentQuery};
};

export default usePayment;
