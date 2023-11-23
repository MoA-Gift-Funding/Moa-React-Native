import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import NextButton from '../../components/button/NextButton';
import TextInputGroup from '../../components/text/TextInputGroup';
import {useForm} from 'react-hook-form';
import {useUserContext} from '../../contexts/UserContext';

export default function Join() {
  const {
    userState: {user},
  } = useUserContext();
  console.log(user);

  const [nickName, setNickName] = useState('이수진');
  const [bDay, setBDay] = useState('0520');
  const [bYear, setBYear] = useState('1993');
  const [birthday, setBirthday] = useState('19930520');
  const [mobile, setMobile] = useState('010-4558-9598');
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      nickName,
      birthday,
      mobile,
    },
  });

  return (
    <KeyboardAvoidingView
      className="px-6 bg-white h-full"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <View className="my-10">
          <TextSemiBold style="text-Heading-3 text-black" title="아래 정보로" />
          <TextSemiBold
            style="text-Heading-3 text-black"
            title="가입을 진행합니다."
          />
        </View>
        <View className="flex flex-col gap-4">
          <View>
            <TextInputGroup
              name="nickName"
              label="닉네임"
              error={errors.nickName}
              control={control}
              required={true}
            />
          </View>
          <View>
            <TextInputGroup
              name="mobile"
              label="전화번호"
              error={errors.mobile}
              control={control}
              required={true}
            />
          </View>
          <View>
            <TextInputGroup
              name="birthday"
              label="생년월일"
              error={errors.birthday}
              control={control}
              required={true}
            />
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView className="flex justify-end mb-10">
        <NextButton title="다음" />
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
}
