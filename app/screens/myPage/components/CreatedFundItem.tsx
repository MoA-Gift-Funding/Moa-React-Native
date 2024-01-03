import React from 'react';
import {Image, View} from 'react-native';
import TextSemiBold from '../../../components/text/TextSemiBold';
import TextRegular from '../../../components/text/TextRegular';
import {CreatedFund} from '../../../types/Funding';

const CreatedFundItem = ({item}: {item: CreatedFund}) => {
  const {title, deadline, fundRate, activated, productImage, fundedCount} =
    item;
  return (
    <View className="py-6 border-b-2 border-Gray-02">
      <View className="flex flex-row justify-between">
        <TextSemiBold title={deadline} style="text-Body-2" />
        {activated === 'Y' ? (
          <View className="bg-Sub-01 rounded-xl px-2 h-[22px] flex flex-col justify-center items-center">
            <TextRegular title="펀딩중" style="text-Body-2 text-Main-01" />
          </View>
        ) : (
          <View className="bg-Gray-02 rounded-xl px-2 h-[22px] flex flex-col justify-center items-center">
            <TextRegular title="펀딩종료" style="text-Body-2 text-Gray-06" />
          </View>
        )}
      </View>
      <View className="flex flex-row items-center mt-2">
        <Image
          source={{
            uri: productImage,
          }}
          width={70}
          height={70}
          className="rounded-md"
        />
        <View className="ml-3">
          <TextRegular title={title} style="text-Detail-1" />
          <View className="flex flex-row mt-2">
            <TextSemiBold
              title={`${fundRate}%`}
              style="text-Main-01 text-Detail-1"
            />
            <TextRegular title=" · " style="text-Detail-1" />
            <TextSemiBold title={`${fundedCount}명`} style="text-Detail-1" />
            <TextRegular title=" 참여" style="text-Detail-1" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CreatedFundItem;
