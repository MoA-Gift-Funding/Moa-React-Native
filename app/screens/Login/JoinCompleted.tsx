import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, View} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import NextButton from '../../components/button/NextButton';
import {useForm} from 'react-hook-form';
import {useUserContext} from '../../contexts/UserContext';
import Config from 'react-native-config';
import ProgressBar from '../../components/bar/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser} from '../../apis/user/User';

const JoinCompleted = ({navigation}) => {
  const {handleSubmit} = useForm();
  const {
    userState: {user},
    dispatch,
  } = useUserContext();
  const handleDone = async () => {
    const {user} = await getUser();
    dispatch({type: 'LOGIN', payload: {...user, joinProcess: 'done'}});
    await AsyncStorage.removeItem('process');
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView className="bg-white">
      <View className="h-full px-6 flex flex-col justify-between">
        <View>
          <ProgressBar progress={'w-full'} />
          <View className="my-8 font-semibold">
            <TextSemiBold
              style="text-Heading-3"
              title={`${user?.nickname}님`}
            />
            <TextSemiBold style="text-Heading-3" title="반갑습니다!" />
          </View>
          <View className="flex flex-col items-center relative mt-10">
            <Image
              className="w-[200px] h-[200px] mt-2"
              source={{
                uri: Config.DEFAULT_IMAGE,
              }}
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
