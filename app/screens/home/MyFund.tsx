import React from 'react';
import {Image, Pressable, View} from 'react-native';
import TextBold from '../../components/text/TextBold';
import TextRegular from '../../components/text/TextRegular';
import TextSemiBold from '../../components/text/TextSemiBold';

const MyFund = () => {
  return (
    <Pressable
      className="w-[285px] rounded-2xl mr-4 mb-2"
      style={{elevation: 3, backgroundColor: 'transparent'}}>
      <View className="bg-Gray-03 h-[89px] rounded-t-xl shadow-lg flex flex-row px-4 justify-between items-center">
        <View className="flex flex-col">
          <TextBold title="D-8" style="text-Body-1" />
          <TextRegular title="#경민이 집들이선물" style="text-Body-1" />
        </View>
        <Image
          className="w-[58px] h-[58px]"
          source={{
            uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703079069/moa-profile_tl4ilu.png',
          }}
        />
      </View>
      <View className="bg-white h-[60px] rounded-b-xl shadow-lg flex flex-col px-4 justify-center">
        <View className="flex flex-row justify-between w-full">
          <TextSemiBold title="52% 펀딩" style="text-Main-01" />
          <TextSemiBold title="14명 참여중" style="text-Gray-08" />
        </View>
        <View className="w-full bg-Sub-01 rounded-full h-3 mt-2">
          <View className="bg-Main-01 h-3 rounded-full w-1/2" />
        </View>
      </View>
    </Pressable>
  );
};

export default MyFund;
