import React, {useEffect} from 'react';
import {Image, ScrollView, View} from 'react-native';
// import Categories from './Categories';
import TextBold from '../../components/text/TextBold';
import Item from './Item';
import Footer from '../../components/footer/Footer';
import {autoCurrency} from '../../utils/regex';
import useProducts from '../../hooks/products/useProducts';

const StoreMain = () => {
  const {
    productsQuery: {data: products, mutate},
  } = useProducts();
  useEffect(() => {
    mutate(0);
  }, [mutate]);

  return (
    <>
      <ScrollView
        className="h-full bg-white"
        showsVerticalScrollIndicator={false}>
        <View className="flex items-center mt-3">
          <Image
            className="w-[312px] h-[312px]"
            source={{
              uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321006/moa-banner_pic5bu.png',
            }}
          />
        </View>
        <View className="flex flex-col mt-6">{/* <Categories /> */}</View>
        <View className="flex my-8">
          <TextBold title="오늘의 인기 선물" style="text-Heading-4 ml-7" />
          <View className="flex items-center justify-center">
            <View className="w-[320px] flex flex-row flex-wrap gap-2 mt-4">
              {products?.map(product => {
                const {id, image, brand, name, price, salesNumber} = product;
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
        </View>
      </ScrollView>
      <Footer screen="Store" />
    </>
  );
};

export default StoreMain;
