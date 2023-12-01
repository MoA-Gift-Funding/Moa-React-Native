import React from 'react';
import {Image, Pressable, View} from 'react-native';
import ItemDesc from './ItemDesc';
import TextSemiBold from '../../components/text/TextSemiBold';

const ItemDetail = ({route}) => {
  const {brand, uri, productName, sale, price} = route.params;
  return (
    <View className="flex flex-col">
      <Image
        className="w-[360px] h-[360px]"
        source={{
          uri,
        }}
      />
      <ItemDesc
        brand={brand}
        productName={productName}
        price={price}
        sale={sale}
      />
      <View>
        <View>
          <Pressable className="w-[156px]">
            <TextSemiBold title="상품정보" style="text-Gray-10" />
          </Pressable>
          <Pressable className="w-[156px]" />
        </View>
      </View>
    </View>
  );
};

export default ItemDetail;
