import React from 'react';
import {Pressable, View} from 'react-native';
import TextRegular from '../../components/text/TextRegular';
import TextBold from '../../components/text/TextBold';

const JoinFundPay = ({navigation, route}) => {
  return (
    <View className="px-6 bg-white h-full flex flex-col justify-between">
      <View className="mt-8">
        <TextBold
          title="펀딩 결제 수단을"
          style="text-Heading-3 leading-Heading-3"
        />
        <TextBold
          title="선택해주세요."
          style="text-Heading-3 leading-Heading-3"
        />
        <View className="flex flex-col mt-10" />
      </View>
    </View>
  );
};

export default JoinFundPay;
