import React from 'react';
import {Image, View} from 'react-native';
import TextBold from '../../../components/text/TextBold';
import {useUserContext} from '../../../contexts/UserContext';
import NextButton from '../../../components/button/NextButton';
import {useForm} from 'react-hook-form';

const FundCompleted = ({navigation}) => {
  const {
    userState: {user},
  } = useUserContext();
  const {handleSubmit} = useForm();
  return (
    <View className="bg-black h-full flex flex-col items-center justify-between">
      <View />
      <View className="flex flex-col items-center">
        <Image
          source={{
            uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1701956619/moa-completed_exfqxw.png',
          }}
          className="w-[258px] h-[295px]"
        />
        <TextBold
          title={`${user?.nickname}님, 모아 펀딩 개설을`}
          style="text-white text-Heading-3 leading-Heading-3 mt-10"
        />
        <TextBold
          title="축하드립니다!"
          style="text-white text-Heading-3 leading-Heading-3"
        />
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

export default FundCompleted;
