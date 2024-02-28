import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import Item from './Item';
import Footer from '../../components/footer/Footer';
import LoadingBar from '../../components/bar/LoadingBar';
import useProducts from '../../hooks/products/useProducts';
import {useRefetchOnFocus} from '../../hooks/handlers/useRefetchOnFocus';
const ItemList = ({route}) => {
  const {category} = route.params;
  const [loading, setLoading] = useState(false);
  const {productsInfiniteQuery, productsFetchNextQuery, productsRefetchQuery} =
    useProducts(category);
  useRefetchOnFocus(productsRefetchQuery);
  return (
    <>
      <View className="bg-white h-full">
        {loading && <LoadingBar />}
        {productsInfiniteQuery && (
          <View className="flex items-center mt-3">
            <View className="w-[320px] flex flex-row flex-wrap gap-2">
              <FlatList
                data={productsInfiniteQuery.pages.flatMap(page =>
                  page.content.flat(),
                )}
                renderItem={({item}) => <Item item={item} />}
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
      </View>
      <Footer screen="Store" />
    </>
  );
};

export default ItemList;
