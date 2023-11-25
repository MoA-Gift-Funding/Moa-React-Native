import React from 'react';
import {Image, View} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import TextRegular from '../../components/text/TextRegular';
import NextButton from '../../components/button/NextButton';
import {useForm} from 'react-hook-form';
import {useUserContext} from '../../contexts/UserContext';
import Config from 'react-native-config';

const JoinCompleted = ({navigation}) => {
  const {handleSubmit} = useForm();
  const {
    userState: {user},
  } = useUserContext();
  return (
    <View className="px-6 bg-white h-full flex flex-col justify-between">
      <View>
        <View className="my-8 font-semibold">
          <TextSemiBold style="text-Heading-3" title={`${user?.nickname}님`} />
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
          onSubmit={() => {}}
        />
      </View>
    </View>
  );
};

export default JoinCompleted;
