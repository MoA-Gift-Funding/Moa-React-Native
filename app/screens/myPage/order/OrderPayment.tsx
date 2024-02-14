import React from 'react';
import {View} from 'react-native';
import TextSemiBold from '../../../components/text/TextSemiBold';
import TextRegular from '../../../components/text/TextRegular';
import {OrderPaymentItem} from '../../../types/Order';
import {autoCurrency} from '../../../utils/regex';

const OrderPayment = ({item}: {item: OrderPaymentItem[]}) => {
  const total = item.reduce((acc, curr) => acc + Number(curr.price), 0);
  return (
    <View className="flex flex-col bg-white px-6 py-2 mt-4">
      <View className="w-full border-b-2 py-4 border-Gray-02">
        <TextSemiBold title="결제 정보" style="text-Body-2" />
      </View>
      <View className="flex flex-row mt-2 justify-between">
        <View className="flex flex-col">
          <TextSemiBold title="상품 금액" style="text-Body-2 leading-Body-2" />
          {item.map(() => (
            <TextRegular
              title="펀딩 금액"
              style="text-Body-2 leading-Body-2 text-Gray-06 mt-1"
            />
          ))}
        </View>
        <View className="mb-10 flex flex-col items-end">
          <TextSemiBold
            title={`${autoCurrency(total)}원`}
            style="text-Body-2 leading-Body-2"
          />
          {item.map(paid => (
            <TextRegular
              title={`${autoCurrency(paid.price)}원`}
              style="text-Body-2 leading-Body-2 text-Gray-06 mt-1"
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default OrderPayment;
