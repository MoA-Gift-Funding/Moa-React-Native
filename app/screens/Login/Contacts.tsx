import React from 'react';
import {Image, Pressable, View} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import TextRegular from '../../components/text/TextRegular';
import NextButton from '../../components/button/NextButton';
import {useForm} from 'react-hook-form';

const Contacts = ({navigation}) => {
  const {handleSubmit} = useForm();
  return (
    <View className="px-6 bg-white h-full flex flex-col justify-between">
      <View>
        <View className="my-8 font-semibold">
          <TextSemiBold style="text-Heading-3" title="친구들의 연락처를" />
          <TextSemiBold style="text-Heading-3" title="연동할까요?" />
          <TextRegular
            style="text-Body-2 mt-4"
            title="연락처를 연동하면 친구들의 펀딩을 볼 수 있어요!"
          />
        </View>
        <View className="flex flex-col items-start relative mt-2">
          <Image
            className="w-[300px] h-[350px] mt-2"
            source={{
              uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1700910992/contacts_rngrw4.png',
            }}
          />
        </View>
      </View>
      <View className="mb-8 flex flex-col items-center">
        <Pressable onPress={() => navigation.navigate('JoinCompleted')}>
          <TextRegular
            style="mb-10 text-Body-2 text-Gray-06 underline"
            title="건너뛰기"
          />
        </Pressable>
        <NextButton
          title="연동하기"
          handleSubmit={handleSubmit}
          onSubmit={() => navigation.navigate('JoinCompleted')}
        />
      </View>
    </View>
  );
};

export default Contacts;
