import React from 'react';
import {Image} from 'react-native';
import {View} from 'react-native';
import TextBold from '../../../components/text/TextBold';
import NextButton from '../../../components/button/NextButton';
import {useForm} from 'react-hook-form';
import TextRegular from '../../../components/text/TextRegular';

const FinishFundCompleted = ({navigation, route}) => {
  const {nickName} = route.params;
  const {handleSubmit} = useForm();
  return (
    <View className="bg-black h-full flex flex-col items-center justify-between">
      <View className="mt-32">
        <View className="flex flex-col items-center">
          <View className="flex flex-row">
            <TextBold
              title={`${nickName}`}
              style="text-Main-01 text-Heading-3 leading-Heading-3"
            />
            <TextBold
              title="님의"
              style="text-white text-Heading-3 leading-Heading-3"
            />
          </View>
          <TextBold
            title="펀딩이 완료되었어요!"
            style="text-white text-Heading-3 leading-Heading-3"
          />
        </View>
        <View className="flex flex-col items-center mt-16">
          <Image
            source={{
              uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1702535846/moa-done_wbzuoz.png',
            }}
            className="w-[260px] h-[197px]"
          />
          <TextRegular
            title="펀딩 금액을 달성했어요."
            style="text-white text-Body-2 leading-Body-2 mt-16"
          />
          <TextRegular
            title="내 펀딩에서 상품수령하기 버튼을 눌러주세요!"
            style="text-white text-Body-2 leading-Body-2"
          />
        </View>
      </View>
      <NextButton
        title="확인"
        onSubmit={() => navigation.navigate('Home')}
        handleSubmit={handleSubmit}
        style="mb-8"
      />
    </View>
  );
};

export default FinishFundCompleted;
