import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import OrderItem from './OrderItem';
import useOrder from '../../../hooks/order/useOrder';
import {RefreshControl} from 'react-native';
import TextRegular from '../../../components/text/TextRegular';
import SeperatorUI from '../../funding/components/SeperatorUI';

export default function MyOrdersScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const {
    orderInfiniteQuery,
    orderFetchNextPageQuery,
    refetchOrderInfiniteQuery,
  } = useOrder();
  return (
    <View className="bg-white h-full border-t-2 border-Gray-02 flex flex-col px-6">
      {orderInfiniteQuery && (
        <>
          {orderInfiniteQuery.pages[0].content.length > 0 && (
            <FlatList
              data={orderInfiniteQuery.pages.flatMap(page =>
                page.content.flat(),
              )}
              ItemSeparatorComponent={SeperatorUI}
              renderItem={fund => <OrderItem item={fund.item} />}
              keyExtractor={fund => fund.orderId.toString()}
              showsVerticalScrollIndicator={false}
              onEndReached={async () => await orderFetchNextPageQuery()}
              onEndReachedThreshold={0.6}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={refetchOrderInfiniteQuery}
                />
              }
            />
          )}
          {orderInfiniteQuery.pages[0].content.length < 1 && (
            <TextRegular
              title="펀딩을 달성하면 주문이 생성돼요🙆🏻‍♀️"
              style="py-10 text-Gray-06 text-center"
            />
          )}
        </>
      )}
    </View>
  );
}
