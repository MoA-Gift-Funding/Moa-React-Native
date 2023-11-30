import React from 'react';
import {Image, View} from 'react-native';
import {Path, Rect, Svg} from 'react-native-svg';
import TextRegular from '../../components/text/TextRegular';
import CategoryIcon from '../../components/button/CategoryIcon';
import Categories from './Categories';
import TextBold from '../../components/text/TextBold';

const StoreMain = () => {
  return (
    <View className="h-full bg-white">
      <View className="flex items-center mt-3">
        <Image
          className="w-[312px] h-[312px]"
          source={{
            uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701321006/moa-banner_pic5bu.png',
          }}
        />
      </View>
      <View className="flex flex-col mt-6">
        <Categories />
      </View>
      <View className="flex">
        <TextBold title="오늘의 인기 선물" style="text-Heading-4" />
      </View>
    </View>
  );
};

export default StoreMain;
