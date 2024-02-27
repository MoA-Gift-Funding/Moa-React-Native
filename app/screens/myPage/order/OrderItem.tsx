import React from 'react';
import {Image, Pressable, View} from 'react-native';
import TextSemiBold from '../../../components/text/TextSemiBold';
import TextRegular from '../../../components/text/TextRegular';
import {Order} from '../../../types/Order';
import {autoCurrency} from '../../../utils/regex';
import {useNavigation} from '@react-navigation/native';

const OrderItem = ({item}: {item: Order}) => {
  const {orderDate, orderId, brand, productName, price, imageUrl} = item;
  const navigation = useNavigation();
  return (
    <Pressable
      className="border-b-2 border-Gray-02 py-4"
      onPress={() =>
        navigation.navigate('MyOrder', {headerTitle: '주문 · 배송', orderId})
      }>
      <View className="flex flex-row justify-between items-center">
        <TextSemiBold title={orderDate} style="text-Body-2" />
        <View className="px-2 py-1 bg-Gray-02 rounded-xl flex items-center justify-center">
          <TextRegular
            title={'deliveryStatus'}
            style="text-Detail-1 text-Gray-06"
          />
        </View>
      </View>
      <View className="flex flex-row mt-1">
        <Image
          source={{
            uri: imageUrl,
          }}
          className="w-[70px] h-[70px] rounded-lg"
        />
        <View className="flex flex-col ml-3">
          <TextRegular
            title={brand}
            style="text-Detail-1 leading-Detail-1 text-Gray-06"
          />
          <TextRegular
            title={productName}
            numberOfLines={1}
            style="text-Body-2 leading-Body-2 w-[234px]"
          />
          <TextSemiBold
            title={`${autoCurrency(price)}원`}
            style="text-Body-2 leading-Body-2"
          />
        </View>
      </View>
    </Pressable>
  );
};

export default OrderItem;
