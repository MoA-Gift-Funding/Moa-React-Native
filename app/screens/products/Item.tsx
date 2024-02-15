import React from 'react';
import {Image, Pressable, View} from 'react-native';
import TextRegular from '../../components/text/TextRegular';
import TextSemiBold from '../../components/text/TextSemiBold';
import {useNavigation} from '@react-navigation/native';
import {Product} from '../../types/Store';

const Item = ({id, image, brand, name, price, salesNumber}: Product) => {
  const navigation = useNavigation();
  return (
    <Pressable
      className="flex w-[152px] mb-[30px]"
      onPress={() =>
        navigation.navigate('ItemDetail', {
          id,
          image,
          brand,
          name,
          price,
          salesNumber,
        })
      }>
      <Image
        className="w-[152px] h-[152px]"
        source={{
          uri: image,
        }}
      />
      <View className="flex flex-col mt-2">
        <TextRegular
          title={brand}
          style="text-Detail-1 text-Gray-06 leading-Detail-1"
        />
        <TextRegular
          title={name}
          style="text-Body-2 text-Gray-10 leading-Body-2 break-word"
        />
        <View className="flex flex-row">
          {salesNumber && (
            <TextSemiBold
              title={`${salesNumber}%`}
              style="text-Body-2 text-Main-01 leading-Body-2"
            />
          )}
          <TextSemiBold
            title={`${price}원`}
            style="text-Body-2 text-Gray-10 leading-Body-2"
          />
        </View>
      </View>
    </Pressable>
  );
};

export default Item;
