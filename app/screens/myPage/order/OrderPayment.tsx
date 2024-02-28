import React from 'react';
import {View} from 'react-native';
import TextSemiBold from '../../../components/text/TextSemiBold';
import TextRegular from '../../../components/text/TextRegular';
import {PaymentItem} from '../../../types/Order';
import {autoCurrency} from '../../../utils/regex';

const OrderPayment = ({item, price}: {item: PaymentItem; price: number}) => {
  const {participantPayments, myPayment} = item;
  return (
    <View className="flex flex-col bg-white px-6 py-2 mt-4">
      <View className="w-full border-b-2 py-4 border-Gray-02">
        <TextSemiBold title="결제 정보" style="text-Body-2" />
      </View>
      <View className="flex mt-2">
        <View className="flex flex-row justify-between">
          <TextSemiBold title="상품 금액" style="text-Body-2 leading-Body-2" />
          <TextSemiBold
            title={`${autoCurrency(price)}원`}
            style="text-Body-2 leading-Body-2"
          />
        </View>
        <View className="mb-10 flex flex-col">
          {participantPayments.map(paid => (
            <View className="flex flex-row justify-between ml-2">
              <TextRegular
                title={paid.customNickname}
                style="text-Body-2 leading-Body-2 text-Gray-06 mt-1"
              />
              <TextRegular
                title={`${autoCurrency(paid.amount)}원`}
                style="text-Body-2 leading-Body-2 text-Gray-06 mt-1"
              />
            </View>
          ))}
          {myPayment.amount >= 0 && (
            <View className="flex flex-row justify-between">
              <TextRegular
                title="내가 채운 금액"
                style="text-Body-2 leading-Body-2 text-Gray-06 mt-1"
              />
              <TextRegular
                title={`${autoCurrency(myPayment.amount)}원`}
                style="text-Body-2 leading-Body-2 text-Gray-06 mt-1"
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default OrderPayment;
