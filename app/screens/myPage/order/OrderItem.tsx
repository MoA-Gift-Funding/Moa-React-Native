import React from 'react';
import {Image, Pressable, View} from 'react-native';
import TextSemiBold from '../../../components/text/TextSemiBold';
import TextRegular from '../../../components/text/TextRegular';
import {Order} from '../../../types/Order';
import {autoCurrency} from '../../../utils/regex';
import {useNavigation} from '@react-navigation/native';
import NextButton from '../../../components/button/NextButton';
import {useForm} from 'react-hook-form';

const OrderItem = ({item}: {item: Order}) => {
  const {orderDate, orderId, brand, productName, price, imageUrl, status} =
    item;
  const navigation = useNavigation();
  const {handleSubmit} = useForm();
  const onReissueSubmit = () => {
    navigation.navigate('CustomerCenter', {
      headerTitle: '고객 센터',
      personalInquiry: true,
    });
  };
  return (
    <View className="py-4">
      <Pressable
        onPress={() =>
          navigation.navigate('MyOrder', {
            headerTitle: '주문 · 배송',
            ...item,
          })
        }>
        <View className="flex flex-row justify-between items-center">
          <TextSemiBold
            title={orderDate.substring(0, 10)}
            style="text-Body-2"
          />
          <View className="px-2 py-1 bg-Gray-02 rounded-xl flex items-center justify-center">
            {status === 'COMPLETE_RECEIVE' && (
              <TextRegular
                title={'배송 완료'}
                style="text-Detail-1 text-Gray-06"
              />
            )}
            {status === 'WAITING_RECEIVE' && (
              <TextRegular
                title={'배송 대기'}
                style="text-Detail-1 text-Gray-06"
              />
            )}
            {status === 'REFUND' && (
              <TextRegular
                title={'환불 완료'}
                style="text-Detail-1 text-Gray-06"
              />
            )}
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
      {status === 'WAITING_RECEIVE' && (
        <View className="mt-4">
          <NextButton
            title="재발송 1:1 문의하기"
            onSubmit={onReissueSubmit}
            handleSubmit={handleSubmit}
          />
        </View>
      )}
    </View>
  );
};

export default OrderItem;
