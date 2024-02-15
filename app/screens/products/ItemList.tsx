import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import TextRegular from '../../components/text/TextRegular';
import Item from './Item';
import Footer from '../../components/footer/Footer';
import {autoCurrency} from '../../utils/regex';
import LoadingBar from '../../components/bar/LoadingBar';
import useProducts from '../../hooks/products/useProducts';
const ItemList = ({route}) => {
  const {categoryType} = route.params;
  const [loading, setLoading] = useState(true);
  const {
    categoryProductsQuery: {data: products, mutate},
  } = useProducts(() => setLoading(false));
  useEffect(() => {
    mutate({categoryType, page: 0});
  }, [mutate, categoryType]);
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} className="bg-white">
        {loading && <LoadingBar />}
        <View className="flex flex-row justify-center mt-6">
          <View className="flex flex-row justify-between w-[312px]">
            <TextRegular
              title={`상품 ${
                products ? autoCurrency(products?.length) : '0'
              }개`}
              style="text-Gray-08 text-Detail-1"
            />
            <Pressable className="flex flex-row items-center">
              {/* <TextRegular
              title={filter}
              style="text-Gray-08 text-Detail-1 mr-1"
            />
            <FontAwesomeIcon
              icon={faArrowUpShortWide}
              color="#616161"
              size={12}
            /> */}
            </Pressable>
          </View>
        </View>
        <View className="flex items-center mt-3">
          <View className="w-[320px] flex flex-row flex-wrap gap-2">
            {products?.map(product => {
              const {id, image, brand, name, price, salesNumber} = product;
              console.log(product);

              return (
                <View key={id}>
                  <Item
                    id={id}
                    image={image}
                    brand={brand}
                    name={name}
                    price={autoCurrency(price)}
                    salesNumber={salesNumber}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <Footer screen="Store" />
    </>
  );
};

export default ItemList;
