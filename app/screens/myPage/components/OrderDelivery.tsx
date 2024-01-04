import React from 'react';
import {View} from 'react-native';
import TextSemiBold from '../../../components/text/TextSemiBold';
import TextRegular from '../../../components/text/TextRegular';
import {ShippingInfo} from '../../../types/Order';

const OrderDelivery = ({item}: {item: ShippingInfo}) => {
  const {
    recipientName,
    roadAddress,
    detailedAddress,
    phoneNumber,
    deliveryStatus,
  } = item;
  return (
    <View className="flex flex-col bg-white px-6 py-2 mt-4">
      <View className="w-full border-b-2 py-3 border-Gray-02">
        <View className="flex flex-row justify-between items-center">
          <TextSemiBold title="배송 정보" style="text-Body-2" />
          <View className="px-2 py-1 bg-Gray-02 rounded-xl flex items-center justify-center">
            <TextRegular
              title={deliveryStatus}
              style="text-Detail-1 text-Gray-06"
            />
          </View>
        </View>
      </View>
      <View className="flex flex-row mt-2">
        <View>
          <TextRegular
            title="받는 사람"
            style="text-Body-2 leading-Body-2 text-Gray-06"
          />
          <TextRegular
            title="연락처"
            style="text-Body-2 leading-Body-2 text-Gray-06"
          />
          <TextRegular
            title="주소"
            style="text-Body-2 leading-Body-2 text-Gray-06"
          />
        </View>
        <View className="mb-2 ml-4">
          <TextRegular
            title={recipientName}
            style="text-Body-2 leading-Body-2 text-Gray-06"
          />
          <TextRegular
            title={phoneNumber}
            style="text-Body-2 leading-Body-2 text-Gray-06"
          />
          <TextRegular
            title={roadAddress}
            numberOfLines={2}
            style="text-Body-2 leading-Body-2 text-Gray-06 w-[250px]"
          />
          <TextRegular
            title={detailedAddress}
            numberOfLines={2}
            style="text-Body-2 leading-Body-2 text-Gray-06 w-[250px]"
          />
        </View>
      </View>
    </View>
  );
};

export default OrderDelivery;
