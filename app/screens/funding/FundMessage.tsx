import React from 'react';
import {Image, View} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import TextRegular from '../../components/text/TextRegular';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ko from 'dayjs/locale/ko';
import {FundMessageItem} from '../../types/Funding';
dayjs.extend(relativeTime);
dayjs.locale(ko);

const FundMessage = ({
  message,
  name,
  createdAt,
  profileImage,
}: FundMessageItem) => {
  return (
    <View className="flex flex-col border-b-2 border-Gray-01 py-4 px-6">
      <View className="flex flex-row items-center">
        <Image
          source={{
            uri: profileImage,
          }}
          className="w-[40px] h-[40px] rounded-full"
        />
        <TextSemiBold title={name} style="text-Body-2 ml-2" />
        <TextSemiBold
          title={`· ${dayjs().to(createdAt)}`}
          style="text-Body-2 ml-2 text-Gray-06"
        />
      </View>
      <TextRegular
        title={message}
        style="text-Gray-06 text-Body-2 leading-Body-2 mt-2 mx-1"
      />
    </View>
  );
};

export default FundMessage;
