import React from 'react';
import {Image, View} from 'react-native';
import TextRegular from '../../components/text/TextRegular';
import TextSemiBold from '../../components/text/TextSemiBold';

const Item = ({
  uri,
  brand,
  productName,
  price,
}: {
  uri: string;
  brand: string;
  productName: string;
  price: string;
}) => {
  return (
    <View className="flex w-[152px] mb-7">
      <Image
        className="w-[152px] h-[152px]"
        source={{
          uri,
        }}
      />
      <View className="flex flex-col mt-2">
        <TextRegular
          title={brand}
          style="text-Detail-1 text-Gray-04 leading-Detail-1"
        />
        <TextRegular
          title={productName}
          style="text-Body-2 text-Gray-10 leading-Body-2 break-word"
        />
        <TextSemiBold
          title={`${price}원`}
          style="text-Body-2 text-Gray-10 leading-Body-2"
        />
      </View>
    </View>
  );
};

export default Item;
