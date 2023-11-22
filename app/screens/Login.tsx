import React from 'react';
import {Pressable, View} from 'react-native';
import TextSemiBold from '../components/text/TextSemiBold';
import TextRegular from '../components/text/TextRegular';
import {loginKakao} from '../apis/User';
import Config from 'react-native-config';

export default function Login() {
  const textStyle = 'text-Gray-09 text-Heading-3';
  const buttonStyle = 'w-[312px] h-[56px] rounded-md flex justify-center';
  console.log(Config.BASE_URL);

  return (
    <View className="px-6 py-10 bg-white h-[100vh]">
      <View className="flex flex-col mb-10">
        <TextSemiBold style={textStyle} title="설레이는 새로운 선물 경험," />
        <TextSemiBold style={textStyle} title="모아로 마음을 모아볼까요?" />
      </View>
      <View className="flex flex-col gap-[12px]">
        <Pressable className={`bg-[#27D34A] ${buttonStyle}`} disabled>
          <TextRegular
            style="text-white text-Body-1 ml-[14px]"
            title="네이버로 계속하기"
          />
        </Pressable>
        <Pressable
          className={`bg-[#FFEB00] ${buttonStyle}`}
          onPress={loginKakao}>
          <TextRegular
            style="text-Gray-08 text-Body-1 ml-[14px]"
            title="카카오로 계속하기"
          />
        </Pressable>
        <Pressable
          className={`bg-white border-Gray-03 border-2 ${buttonStyle}`}
          disabled>
          <TextRegular
            style="text-Gray-08 text-Body-1 ml-[14px]"
            title="구글로 계속하기"
          />
        </Pressable>
      </View>
    </View>
  );
}
