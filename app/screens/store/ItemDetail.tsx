import React from 'react';
import {Image, View} from 'react-native';
import TextRegular from '../../components/text/TextRegular';
import TextBold from '../../components/text/TextBold';

const ItemDetail = () => {
  return (
    <View className="flex flex-col">
      <Image
        className="w-[360px] h-[360px]"
        source={{
          uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701324751/moa-ugg_iwe8n0.png',
        }}
      />
      <View className="flex items-center mt-4 ">
        <View className="flex flex-col w-[312px]">
          <TextRegular
            title="UGG"
            style="text-Gray-06 text-Body-2 leading-Body-2"
          />
          <TextRegular
            title="어그 디스케트 슬리퍼 체스트넛"
            style="text-Gray-10 text-Body-1 leading-Body-1"
          />
          <View className="flex flex-row">
            <TextBold
              title="10%"
              style="text-Main-01 text-Heading-4 leading-Heading-4"
            />
            <TextBold
              title="121,500원"
              style="ml-2 text-Gray-10 text-Heading-4 leading-Heading-4"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ItemDetail;
