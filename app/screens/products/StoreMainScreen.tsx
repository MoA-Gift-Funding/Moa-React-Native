import React from 'react';
import {FlatList, Image, View} from 'react-native';
import Categories from './Categories';
import TextBold from '../../components/text/TextBold';
import Item from './Item';
import Footer from '../../components/footer/Footer';
import useProducts from '../../hooks/products/useProducts';
import {useRefetchOnFocus} from '../../hooks/handlers/useRefetchOnFocus';

export default function StoreMainScreen() {
  const {productsInfiniteQuery, productsRefetchQuery} = useProducts();
  useRefetchOnFocus(productsRefetchQuery);

  return (
    <>
      <FlatList
        data={[]}
        renderItem={null}
        showsVerticalScrollIndicator={false}
        className="bg-white"
        ListEmptyComponent={
          <>
            <View className="flex items-center mt-3">
              <Image
                className="w-[312px] h-[312px]"
                source={{
                  uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321006/moa-banner_pic5bu.png',
                }}
              />
            </View>
            <View className="flex flex-col mt-6">
              <Categories />
            </View>
            <View className="flex my-8">
              <TextBold title="오늘의 인기 선물" style="text-Heading-4 ml-7" />
              <View className="flex items-center justify-center">
                <View className="w-[320px] flex flex-row flex-wrap gap-2 mt-4">
                  {productsInfiniteQuery && (
                    <FlatList
                      data={productsInfiniteQuery.pages.flatMap(page =>
                        page.content.flat(),
                      )}
                      renderItem={({item, index}) => (
                        <Item item={item} isIndexOdd={index % 2 !== 0} />
                      )}
                      keyExtractor={product => product.productId.productId}
                      showsVerticalScrollIndicator={false}
                      onEndReachedThreshold={0.6}
                      numColumns={2}
                    />
                  )}
                </View>
              </View>
            </View>
          </>
        }
      />

      <Footer screen="Store" />
    </>
  );
}
