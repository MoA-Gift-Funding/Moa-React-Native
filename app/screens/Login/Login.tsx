import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import {loginApple, loginKakao, loginNaver} from '../../apis/user/User';
import LoginButton from '../../components/button/LoginButton';
import {useUserContext} from '../../contexts/UserContext';
import LoadingBar from '../../components/bar/LoadingBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {OauthProvider} from '../../types/User';

export default function Login({navigation}) {
  const {
    dispatch,
    userState: {user},
  } = useUserContext();
  const [isLoading, setIsLoding] = useState(false);
  const textStyle = 'text-Gray-09 text-Heading-3';

  const handleLogin = async (platform: OauthProvider) => {
    setIsLoding(true);
    const process = await AsyncStorage.getItem('process');
    switch (platform) {
      case 'KAKAO':
        await loginKakao().then(async res =>
          dispatch({type: 'LOGIN', payload: res}),
        );
        break;
      case 'APPLE':
        await loginApple().then(async res =>
          dispatch({type: 'LOGIN', payload: res}),
        );
        break;
      case 'NAVER':
        await loginNaver().then(async res =>
          dispatch({type: 'LOGIN', payload: res}),
        );
        break;
    }
    if (user?.status === 'PRESIGNED_UP' || process) {
      navigation.navigate('Join');
    }
    setIsLoding(false);
  };

  return (
    <View className="px-6 py-10 bg-white h-full">
      {isLoading && <LoadingBar />}

      <View className="flex flex-col mb-10">
        <TextSemiBold style={textStyle} title="설레이는 새로운 선물 경험," />
        <TextSemiBold style={textStyle} title="모아로 마음을 모아볼까요?" />
      </View>
      <View className="flex flex-col gap-[12px]">
        <View>
          <LoginButton
            buttonStyle="bg-Naver"
            textStyle="text-white"
            title="네이버로 계속하기"
            onPressFn={() => handleLogin('NAVER')}
          />
        </View>
        <View>
          <LoginButton
            buttonStyle="bg-Kakao"
            textStyle="text-Gray-08"
            title="카카오로 계속하기"
            onPressFn={() => handleLogin('KAKAO')}
          />
        </View>
        <View>
          {Platform.OS === 'ios' && (
            <LoginButton
              buttonStyle="bg-white border-Gray-03 border-2"
              textStyle="text-Gray-08"
              title="Apple로 계속하기"
              onPressFn={() => handleLogin('APPLE')}
            />
          )}
        </View>
      </View>
    </View>
  );
}
