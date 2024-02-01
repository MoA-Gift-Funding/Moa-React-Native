import React from 'react';
import {Image, Pressable, View} from 'react-native';
import TextRegular from '../../../components/text/TextRegular';

const FriendItem = ({
  item,
}: {
  item: {
    profileImageUrl: string;
    customNickname: string;
    birthday: string;
    isBlocked: boolean;
  };
}) => {
  const {profileImageUrl, customNickname, birthday} = item;
  return (
    <View className="flex flex-row items-center justify-between py-2">
      <View className="flex flex-row items-center">
        <Image
          source={{
            uri: profileImageUrl,
          }}
          className="w-[56px] h-[56px] rounded-full"
        />
        <View className="flex flex-col ml-4">
          <TextRegular title={customNickname} style="text-Body-2" />
          <TextRegular
            title={`🎂 ${birthday.substring(0, 2)}월 ${birthday.substring(
              2,
            )}일`}
            style="text-Body-2 text-Gray-06 mt-1"
          />
        </View>
      </View>
      {item.isBlocked ? (
        <Pressable className="bg-Gray-06 flex px-2 py-1 rounded-md">
          <TextRegular
            title="차단 해제"
            style="text-Detail-1 leading-Detail-1 text-white"
          />
        </Pressable>
      ) : (
        <Pressable className="bg-Sub-01 flex px-2 py-1 rounded-md">
          <TextRegular
            title="차단"
            style="text-Detail-1 text-Main-01 leading-Detail-1"
          />
        </Pressable>
      )}
    </View>
  );
};

export default FriendItem;
