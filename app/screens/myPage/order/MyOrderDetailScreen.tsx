import React, {useEffect, useState} from 'react';
import {Image, ScrollView, View} from 'react-native';
import TextSemiBold from '../../../components/text/TextSemiBold';
import TextRegular from '../../../components/text/TextRegular';
import OrderPayment from './OrderPayment';
import OrderDelivery from './OrderDelivery';
import useOrder from '../../../hooks/order/useOrder';
import {OrderDetailItem} from '../../../types/Order';
import {autoCurrency} from '../../../utils/regex';
import NextButton from '../../../components/button/NextButton';
import {useForm} from 'react-hook-form';
import LoadingBar from '../../../components/bar/LoadingBar';
import {throttle} from '../../../utils/device';

export default function MyOrderDetailScreen({navigation, route}) {
  const {orderId, imageUrl, brand, productName, price} = route.params;
  const {orderDetailQuery, cancelOrderQuery} = useOrder();
  const [order, setOrder] = useState<OrderDetailItem | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const {handleSubmit} = useForm();
  useEffect(() => {
    const getDetailedInfo = async () => {
      const detail = await orderDetailQuery(orderId);
      setOrder(detail);
    };
    getDetailedInfo();
  }, [orderId, orderDetailQuery]);

  const handleCancelTicket = async () => {
    try {
      setIsLoading(true);
      await cancelOrderQuery(orderId);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-col border-t-2 border-Gray-02">
          <View className="flex flex-row justify-between items-center bg-white px-6 py-5">
            <TextSemiBold title="23.12.24" style="text-Body-2" />
            <TextRegular title={`주문번호 ${orderId}`} style="text-Body-2" />
          </View>
          <View className="flex flex-row items-center bg-white px-6 py-4 mt-4">
            {isLoading && <LoadingBar />}
            <Image
              source={{
                uri: imageUrl,
              }}
              className="w-[70px] h-[70px] rounded-xl"
            />
            <View className="flex flex-col ml-3 justify-around">
              <TextRegular title={brand} style="text-Detail-1 text-Gray-06" />
              <TextRegular
                title={productName}
                style="text-Body-2 w-[234px]"
                numberOfLines={1}
              />
              <TextSemiBold
                title={`${autoCurrency(price)}원`}
                style="text-Body-2"
              />
            </View>
          </View>
          {order && (
            <>
              <OrderDelivery
                item={{
                  recipientName: order.address.recipientName,
                  phoneNumber: order.address.phoneNumber,
                  roadAddress: order.address.roadAddress,
                  detailAddress: order.address.detailAddress,
                  deliveryStatus: order.status,
                  deliveryRequestMessage: order.deliveryRequestMessage,
                }}
              />
              <OrderPayment item={order.payment} price={price} />
            </>
          )}
        </View>
      </ScrollView>
      {order && order.status === 'WAITING_RECEIVE' && (
        <View className="flex items-center mb-4">
          <NextButton
            title="쿠폰 재발급 요청"
            onSubmit={() =>
              navigation.navigate('CustomerCenterScreen', {
                headerTitle: '고객 센터',
                personalInquiry: true,
              })
            }
            handleSubmit={handleSubmit}
          />
        </View>
      )}
      {order && order.status === 'COMPLETE_RECEIVE' && (
        <View className="flex items-center mb-4">
          <NextButton
            title="쿠폰 발행 취소"
            onSubmit={throttle(handleCancelTicket, 1000)}
            handleSubmit={handleSubmit}
          />
        </View>
      )}
    </>
  );
}
