import React from 'react';
import {ScrollView, View} from 'react-native';
import OrderItem from './components/OrderItem';

const MyOrders = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
      <View className="h-full border-t-2 border-Gray-02 flex flex-col px-6">
        <OrderItem
          item={{
            orderId: 1,
            orderCreatedAt: '24.01.04',
            deliveryStatus: '배송중',
            image:
              'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703223350/moa-fund-img2_dnu8xk.png',
            brand: 'Apple',
            name: '애플 에어팟 맥스 실버',
            price: '750000',
          }}
        />
        <OrderItem
          item={{
            orderId: 1,
            orderCreatedAt: '23.12.24',
            deliveryStatus: '배송중',
            image:
              'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703223350/moa-fund-img_n6bsbb.png',
            brand: 'Adidas',
            name: '아디다스 슈퍼스타 화이트',
            price: '54000',
          }}
        />
        <OrderItem
          item={{
            orderId: 1,
            orderCreatedAt: '23.11.20',
            deliveryStatus: '배송완료',
            image:
              'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701324744/moa-diptyque_zhucyv.png',
            brand: 'Diptypque',
            name: '딥티크 플레르 드 뽀 오드 퍼퓸 75ml',
            price: '193000',
          }}
        />
      </View>
    </ScrollView>
  );
};

export default MyOrders;
