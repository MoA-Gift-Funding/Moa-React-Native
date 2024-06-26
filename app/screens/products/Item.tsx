import React from 'react';
import {Image, Pressable, View} from 'react-native';
import TextRegular from '../../components/text/TextRegular';
import TextSemiBold from '../../components/text/TextSemiBold';
import {useNavigation} from '@react-navigation/native';
import {autoCurrency} from '../../utils/regex';

const Item = ({
  item,
  isIndexOdd,
}: {
  item: {
    id: number;
    imageUrl: string;
    brand: string;
    productName: string;
    price: number;
    discountRate: number;
  };
  isIndexOdd: boolean;
}) => {
  const navigation = useNavigation();
  const {imageUrl, brand, productName, price, discountRate} = item;
  return (
    <Pressable
      className={
        isIndexOdd
          ? 'flex w-[152px] mb-[30px] ml-1'
          : 'flex w-[152px] mb-[30px] mr-1'
      }
      onPress={() => navigation.navigate('ProductDetailScreen', item)}>
      <Image
        className="w-[152px] h-[152px]"
        source={{
          uri: imageUrl,
        }}
      />
      <View className="flex flex-col mt-2">
        <TextRegular
          title={brand}
          style="text-Detail-1 text-Gray-06 leading-Detail-1"
        />
        <TextRegular
          title={productName + ' '}
          style="text-Body-2 text-Gray-10 leading-Body-2"
          numberOfLines={1}
        />
        <View className="flex flex-row">
          {!!discountRate && (
            <TextSemiBold
              title={`${discountRate}%`}
              style="text-Body-2 text-Main-01 leading-Body-2 mr-1"
            />
          )}
          <TextSemiBold
            title={`${autoCurrency(price)}원`}
            style="text-Body-2 text-Gray-10 leading-Body-2"
          />
        </View>
      </View>
    </Pressable>
  );
};

export default Item;
