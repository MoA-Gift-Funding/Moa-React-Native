import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import TextRegular from '../../components/text/TextRegular';
import OrderPayment from './components/OrderPayment';

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
        <View className="flex flex-col bg-white px-6 py-2 mt-4">
          <View className="w-full border-b-2 py-4 border-Gray-02">
            <TextSemiBold title="배송 정보" style="text-Body-2" />
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
                title="이수진"
                style="text-Body-2 leading-Body-2 text-Gray-06"
              />
              <TextRegular
                title="010-4558-9598"
                style="text-Body-2 leading-Body-2 text-Gray-06"
              />
              <TextRegular
                title="서울특별시 영등포구 버드나루로 12길 8"
                numberOfLines={2}
                style="text-Body-2 leading-Body-2 text-Gray-06 w-[250px]"
              />
              <TextRegular
                title="1102호"
                numberOfLines={2}
                style="text-Body-2 leading-Body-2 text-Gray-06 w-[250px]"
              />
            </View>
          </View>
        </View>
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
