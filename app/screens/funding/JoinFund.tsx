import React from 'react';
import {View} from 'react-native';
import TextBold from '../../components/text/TextBold';
import TextRegular from '../../components/text/TextRegular';

const JoinFund = () => {
  return (
    <View className="h-full bg-white px-8">
      <View className="mt-4">
        <View className="flex flex-row">
          <TextBold
            title="그리니야"
            style="text-Heading-3 leading-Heading-3 text-Main-01"
          />
          <TextBold
            title="님의 펀딩에"
            style="text-Heading-3 leading-Heading-3"
          />
        </View>
        <TextBold
          title="얼마를 더하시겠어요?"
          style="text-Heading-3 leading-Heading-3"
        />
      </View>
    </View>
  );
};

export default JoinFund;
