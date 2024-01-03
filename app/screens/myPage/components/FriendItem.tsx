import React from 'react';
import {Image, View} from 'react-native';
import TextRegular from '../../../components/text/TextRegular';

const FriendItem = ({
  item,
}: {
  item: {profileImage: string; name: string; birthday: string};
}) => {
  const {profileImage, name, birthday} = item;
  return (
    <View className="flex flex-row items-center py-2">
      <Image
        source={{
          uri: profileImage,
        }}
        className="w-[56px] h-[56px] rounded-full"
      />
      <View className="flex flex-col ml-4">
        <TextRegular title={name} style="text-Body-2" />
        <TextRegular
          title={`${birthday.substring(0, 2)}월 ${birthday.substring(2)}일`}
          style="text-Body-2 text-Gray-06 mt-1"
        />
      </View>
    </View>
  );
};

export default FriendItem;
