import React from 'react';
import {Image, View} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import TextRegular from '../../components/text/TextRegular';

const FundMessage = () => {
  return (
    <View className="flex flex-col border-b-2 border-Gray-01 py-4 px-6">
      <View className="flex flex-row items-center">
        <Image
          source={{
            uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703225044/moa-loopy_kpoquw.png',
          }}
          className="w-[40px] h-[40px] rounded-full"
        />
        <TextSemiBold title="루피" style="text-Body-2 ml-2" />
        <TextSemiBold
          title="· 23시간 전"
          style="text-Body-2 ml-2 text-Gray-06"
        />
      </View>
      <TextRegular
        title="경민아 결혼 축하해 행복하게 살아랏! 오늘 파티하자요~ 도움이 되는 선물이었으면 좋겠다!"
        style="text-Gray-06 text-Body-2 leading-Body-2 mt-2 mx-1"
      />
    </View>
  );
};

export default FundMessage;
