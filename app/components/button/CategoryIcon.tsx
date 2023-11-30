import React from 'react';
import {Image, View} from 'react-native';
import TextRegular from '../text/TextRegular';

const CategoryIcon = ({uri, title}: {uri: string; title: string}) => {
  return (
    <View className="flex flex-col justify-center items-center">
      <Image
        className="w-[72px] h-[72px]"
        source={{
          uri,
        }}
      />
      <TextRegular title={title} style="text-Detail-1" />
    </View>
  );
};

export default CategoryIcon;
