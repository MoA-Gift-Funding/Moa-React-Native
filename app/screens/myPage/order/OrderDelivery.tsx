import React from 'react';
import {View} from 'react-native';
import TextSemiBold from '../../../components/text/TextSemiBold';
import TextRegular from '../../../components/text/TextRegular';
import {OrderStatus} from '../../../types/Order';

const OrderDelivery = ({
  item,
}: {
  item: {
    recipientName: string;
    roadAddress: string;
    detailAddress: string;
    phoneNumber: string;
    deliveryStatus: OrderStatus;
    deliveryRequestMessage: string;
  };
}) => {
  const {
    recipientName,
    roadAddress,
    detailAddress,
    phoneNumber,
    deliveryStatus,
    deliveryRequestMessage,
  } = item;
  return (
    <View className="flex flex-col bg-white px-6 py-2 mt-4">
      <View className="w-full border-b-2 py-3 border-Gray-02">
        <View className="flex flex-row justify-between items-center">
          <TextSemiBold title="배송 정보" style="text-Body-2" />
          <View className="px-2 py-1 bg-Gray-02 rounded-xl flex items-center justify-center">
            {deliveryStatus === 'COMPLETE_RECEIVE' && (
              <TextRegular
                title="배송 완료"
                style="text-Detail-1 text-Gray-06"
              />
            )}
            {deliveryStatus === 'WAITING_RECEIVE' && (
              <TextRegular
                title="배송 대기"
                style="text-Detail-1 text-Gray-06"
              />
            )}
            {deliveryStatus === 'REFUND' && (
              <TextRegular
                title="환불 완료"
                style="text-Detail-1 text-Gray-06"
              />
            )}
          </View>
        </View>
      </View>
      <View className="flex flex-col mt-2">
        <View className="flex flex-row">
          <TextRegular
            title="받는 사람"
            style="text-Body-2 leading-Body-2 text-Gray-06 w-[80px]"
          />
          <TextRegular
            title={recipientName}
            style="text-Body-2 leading-Body-2 text-Gray-06"
          />
        </View>
        <View className="flex flex-row">
          <TextRegular
            title="연락처"
            style="text-Body-2 leading-Body-2 text-Gray-06 w-[80px]"
          />
          <TextRegular
            title={phoneNumber}
            style="text-Body-2 leading-Body-2 text-Gray-06"
          />
        </View>
        <View className="flex flex-row">
          <TextRegular
            title="주소"
            style="text-Body-2 leading-Body-2 text-Gray-06 w-[80px]"
          />
          <View className="flex w-[240px]">
            <TextRegular
              title={roadAddress}
              style="text-Body-2 leading-Body-2 text-Gray-06"
              numberOfLines={2}
            />
            <TextRegular
              title={detailAddress}
              style="text-Body-2 leading-Body-2 text-Gray-06"
              numberOfLines={2}
            />
          </View>
        </View>
        <View className="flex flex-row">
          <TextRegular
            title="배송 메모"
            style="text-Body-2 leading-Body-2 text-Gray-06 w-[80px]"
          />
          <TextRegular
            title={deliveryRequestMessage}
            style="text-Body-2 leading-Body-2 text-Gray-06"
          />
        </View>
      </View>
    </View>
  );
};

export default OrderDelivery;
