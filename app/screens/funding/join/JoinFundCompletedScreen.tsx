import React from 'react';
import {Image, Platform, Pressable, Share} from 'react-native';
import {View} from 'react-native';
import TextBold from '../../../components/text/TextBold';
import NextButton from '../../../components/button/NextButton';
import {useForm} from 'react-hook-form';
import TextRegular from '../../../components/text/TextRegular';
import TextSemiBold from '../../../components/text/TextSemiBold';
import {makeDynamicLink, throttle} from '../../../utils/device';

export default function JoinFundCompletedScreen({navigation, route}) {
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
            title="선물 펀딩에 참여했어요!"
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
            title="펀딩 참여가 완료되었어요."
            style="text-white text-Body-2 leading-Body-2 mt-16"
          />
          <TextRegular
            title="친구에게 공유해 참여 소식을 알려줄 수 있어요!"
            style="text-white text-Body-2 leading-Body-2"
          />
          <Pressable
            className="bg-white rounded-full w-[149px] h-[38px] flex justify-center items-center mt-6"
            onPress={throttle(async () => {
              const dynamicUrl = await makeDynamicLink('Home');
              Platform.select({
                ios: Share.share({
                  url: dynamicUrl,
                  message: `${nickName}님의 선물 펀딩이예요!`,
                }),
                android: Share.share({
                  title: `${nickName}님의 선물 펀딩이예요!`,
                  message: dynamicUrl,
                }),
              });
            }, 1000)}>
            <TextSemiBold
              title="친구에게 참여소식 알리기"
              style="text-Detail-1"
            />
          </Pressable>
        </View>
      </View>
      <NextButton
        title="확인"
        onSubmit={() => navigation.navigate('HomeScreen')}
        handleSubmit={handleSubmit}
        style="mb-8"
      />
    </View>
  );
}
