import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import TextRegular from '../../components/text/TextRegular';
import Item from './Item';
import Footer from '../../components/footer/Footer';
import {useMutation} from '@tanstack/react-query';
import {getProducts} from '../../apis/store/Store';
import {autoCurrency} from '../../utils/regex';
import LoadingBar from '../../components/bar/LoadingBar';
const ItemList = ({route}) => {
  const {categoryType} = route.params;
  const [loading, setLoading] = useState(true);
  const {data: products, mutate} = useMutation({
    mutationFn: ({category, page}: {category: string; page: number}) =>
      getProducts(category, page),
    onSuccess: () => {
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });
  useEffect(() => {
    mutate({category: categoryType, page: 0});
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
              const {
                id,
                image,
                brand,
                name,
                price,
                salesNumber,
                description,
                notes,
                directions,
              } = product;
              console.log(product);

              return (
                <View key={id}>
                  <Item
                    image={image}
                    brand={brand}
                    name={name}
                    price={autoCurrency(price)}
                    salesNumber={salesNumber}
                    description={description}
                    notes={notes}
                    directions={directions}
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
