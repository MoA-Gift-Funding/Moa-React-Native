import React from 'react';
import {Image, View} from 'react-native';
import ItemDesc from './ItemDesc';

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
    </View>
  );
};

export default ItemDetail;
