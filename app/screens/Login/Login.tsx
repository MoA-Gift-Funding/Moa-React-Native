import React, {useState} from 'react';
import {Platform, View} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import LoginButton from '../../components/button/LoginButton';
import LoadingBar from '../../components/bar/LoadingBar';
import {OauthProvider} from '../../types/User';
import useUser from '../../hooks/user/useUser';
import {useUserContext} from '../../contexts/UserContext';

export default function Login({navigation}) {
  const [isLoading, setIsLoding] = useState(false);
  const textStyle = 'text-Gray-09 text-Heading-3';
  const {loginQuery} = useUser();
  const {dispatch} = useUserContext();

  const handleLogin = async (platform: OauthProvider) => {
    setIsLoding(true);
    try {
      const user = await loginQuery(platform);
      if (user?.status === 'PRESIGNED_UP') {
        dispatch({type: 'LOGIN', payload: user});
        navigation.navigate('Join');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoding(false);
    }
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
