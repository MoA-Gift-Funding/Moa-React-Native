import React from 'react';
import {View} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import {loginKakao, loginNaver} from '../../apis/user/User';
import LoginButton from '../../components/button/LoginButton';
import {useUserContext} from '../../contexts/UserContext';

export default function Login({navigation}) {
  const {dispatch} = useUserContext();
  const textStyle = 'text-Gray-09 text-Heading-3';
  const handleKakaoLogin = async () => {
    await loginKakao().then(res => dispatch({type: 'LOGIN', payload: res}));
    navigation.navigate('Join');
  };
  return (
    <View className="px-6 py-10 bg-white h-[100vh]">
      <View className="flex flex-col mb-10">
        <TextSemiBold style={textStyle} title="설레이는 새로운 선물 경험," />
        <TextSemiBold style={textStyle} title="모아로 마음을 모아볼까요?" />
      </View>
      <View className="flex flex-col gap-[12px]">
        <View>
          <LoginButton
            buttonStyle="bg-[#27D34A]"
            textStyle="text-white"
            title="네이버로 계속하기"
            onPressFn={loginNaver}
          />
        </View>
        <View>
          <LoginButton
            buttonStyle="bg-[#FFEB00]"
            textStyle="text-Gray-08"
            title="카카오로 계속하기"
            onPressFn={handleKakaoLogin}
          />
        </View>
        <View>
          <LoginButton
            buttonStyle="bg-white border-Gray-03 border-2"
            textStyle="text-Gray-08"
            title="구글로 계속하기"
          />
        </View>
      </View>
    </View>
  );
}
