import React from 'react';
import {Image, SafeAreaView, View} from 'react-native';
import NextButton from '../../components/button/NextButton';
import {useForm} from 'react-hook-form';
import {useUserContext} from '../../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser} from '../../apis/user/User';
import TextBold from '../../components/text/TextBold';
import TextRegular from '../../components/text/TextRegular';

const JoinCompleted = ({navigation}) => {
  const {handleSubmit} = useForm();
  const {
    userState: {user},
    dispatch,
  } = useUserContext();
  const handleDone = async () => {
    const user = await getUser();
    dispatch({type: 'LOGIN', payload: {...user}});
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView className="bg-white">
      <View className="h-full px-6 flex flex-col justify-between">
        <View />
        <View>
          <View className="flex flex-col items-center relative">
            <Image
              className="w-[192px] h-[110px] mt-4"
              resizeMode={'contain'}
              source={{
                uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703227251/moa-joindone_dhqnpy.png',
              }}
            />
          </View>
          <View className="mt-20 font-semibold flex items-center justify-center">
            <TextBold
              style="text-Heading-3 leading-Heading-3"
              title={`${user?.nickname}님, 환영해요!`}
            />
            <TextRegular
              style="text-Detail-1 text-Gray-06 leading-Detail-1 mt-1"
              title="모아에서 자유롭게 펀딩하며 즐겨주세요!"
            />
          </View>
        </View>
        <View className="mb-8 flex flex-col items-center">
          <NextButton
            title="확인"
            handleSubmit={handleSubmit}
            onSubmit={handleDone}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default JoinCompleted;
