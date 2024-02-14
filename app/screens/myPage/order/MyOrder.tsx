import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import TextSemiBold from '../../../components/text/TextSemiBold';
import TextRegular from '../../../components/text/TextRegular';
import OrderPayment from './OrderPayment';
import OrderDelivery from './OrderDelivery';

const MyOrder = ({navigation, route}) => {
  const {orderId} = route.params;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex flex-col border-t-2 border-Gray-02">
        <View className="flex flex-row justify-between items-center bg-white px-6 py-5">
          <TextSemiBold title="23.12.24" style="text-Body-2" />
          <TextRegular title="주문번호 20032384877" style="text-Body-2" />
        </View>
        <View className="flex flex-row items-center bg-white px-6 py-4 mt-4">
          <Image
            source={{
              uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703223350/moa-fund-img2_dnu8xk.png',
            }}
            className="w-[70px] h-[70px] rounded-xl"
          />
          <View className="flex flex-col ml-3 justify-around">
            <TextRegular title="Apple" style="text-Detail-1 text-Gray-06" />
            <TextRegular
              title="에어팟 맥스 실버"
              style="text-Body-2 w-[234px]"
              numberOfLines={1}
            />
            <TextSemiBold title="750,000원" style="text-Body-2" />
          </View>
        </View>
        <OrderDelivery
          item={{
            recipientName: '이수진',
            phoneNumber: '010-4558-9598',
            roadAddress: '서울특별시 영등포구 버드나루로 12길 8',
            detailedAddress: '1102호',
            zonecode: '12345',
            deliveryStatus: '배송중',
          }}
        />
        <OrderPayment
          item={[
            {price: '45000'},
            {price: '15000'},
            {price: '20000'},
            {price: '30000'},
            {price: '250000'},
            {price: '15000'},
            {price: '350000'},
            {price: '25000'},
          ]}
        />
      </View>
    </ScrollView>
  );
};

export default MyOrder;
