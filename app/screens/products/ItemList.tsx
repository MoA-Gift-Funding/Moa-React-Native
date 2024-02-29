import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import Item from './Item';
import Footer from '../../components/footer/Footer';
import LoadingBar from '../../components/bar/LoadingBar';
import useProducts from '../../hooks/products/useProducts';
import {useRefetchOnFocus} from '../../hooks/handlers/useRefetchOnFocus';
import TextRegular from '../../components/text/TextRegular';
const ItemList = ({route}) => {
  const {category} = route.params;
  const [loading, setLoading] = useState(false);
  const {productsInfiniteQuery, productsFetchNextQuery, productsRefetchQuery} =
    useProducts(category);

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
            {loading && <LoadingBar />}
            {(!productsInfiniteQuery ||
              productsInfiniteQuery.pages[0].content.length < 1) && (
              <TextRegular
                title="모아는 더 많은 제품을 가져오기 위해 노력중이예요💦"
                style="text-Gray-06 text-center my-10 "
              />
            )}
            {productsInfiniteQuery && (
              <View className="flex items-center mt-3">
                <View className="w-[320px] flex flex-row flex-wrap gap-2">
                  <FlatList
                    data={productsInfiniteQuery.pages.flatMap(page =>
                      page.content.flat(),
                    )}
                    renderItem={({item, index}) => (
                      <Item item={item} isIndexOdd={index % 2 !== 0} />
                    )}
                    keyExtractor={product => product.productId.productId}
                    showsVerticalScrollIndicator={false}
                    onEndReached={async () => {
                      try {
                        setLoading(true);
                        await productsFetchNextQuery();
                      } finally {
                        setLoading(false);
                      }
                    }}
                    onEndReachedThreshold={0.6}
                    numColumns={2}
                  />
                </View>
              </View>
            )}
          </>
        }
      />
      <Footer screen="Store" />
    </>
  );
};

export default ItemList;
