import React from 'react';
import {Image, View} from 'react-native';
import TextRegular from '../../../components/text/TextRegular';
import TextSemiBold from '../../../components/text/TextSemiBold';
import {FundMessageItem} from '../../../types/Funding';

const MessageItem = ({item}: {item: Partial<FundMessageItem>}) => {
  const {message, nickName, createdDate, profileImageUrl} = item;
  return (
    <View className="flex flex-row py-4 border-b-2  border-Gray-01">
      <Image
        source={{
          uri: profileImageUrl,
        }}
        className="w-[56px] h-[56px] rounded-full"
      />
      <View className="w-[250px] ml-4 flex flex-col">
        <TextRegular title={message} style="text-Body-2 leading-Body-2" />
        <View className="flex flex-row items-center justify-between mt-3">
          <View className="flex flex-row items-center">
            <View className="h-[20px] w-[45px] bg-Sub-01 px-2 flex items-center justify-center rounded-xl">
              <TextRegular title="from" style="text-Main-01 text-Detail-1" />
            </View>
            <TextSemiBold
              title={nickName}
              style="text-Main-01 text-Detail-1 ml-1"
            />
          </View>
          <TextRegular
            title={createdDate}
            style="text-Gray-06 text-Detail-1 mr-1"
          />
        </View>
      </View>
    </View>
  );
};

export default MessageItem;
