import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import NextButton from '../../components/button/NextButton';
import TextInputGroup from '../../components/text/TextInputGroup';
import {useForm} from 'react-hook-form';
import {useUserContext} from '../../contexts/UserContext';
import {autoSlashPhoneNumber, autoHyphenBirthday} from '../../utils/regex';
import {UserFormData} from '../../types/User';
import {updateUser} from '../../apis/user/User';

export default function Join({navigation}) {
  const {
    userState: {user},
    dispatch,
  } = useUserContext();
  const {nickname, phoneNumber, birthday, birthyear} = user;
  const onSubmit = async (data: UserFormData) => {
    const updated = await updateUser({...data});
    dispatch({type: 'LOGIN', payload: updated});
    navigation.navigate('PhoneValidation');
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      nickname,
      birthday,
      phoneNumber,
      birthyear,
      fullBirthday: autoHyphenBirthday(`${birthyear}${birthday}`),
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
              name="nickname"
              label="닉네임"
              error={errors.nickname}
              control={control}
              rules={{
                required: '닉네임은 필수 입력 사항입니다.',
                maxLength: {
                  value: 20,
                  message: '최대 20자까지 입력가능합니다.',
                },
              }}
            />
          </View>
          <View>
            <TextInputGroup
              name="phoneNumber"
              label="전화번호"
              error={errors.phoneNumber}
              control={control}
              regex={autoSlashPhoneNumber}
              rules={{
                required: '전화번호는 필수 입력 사항입니다.',
                maxLength: {
                  value: 13,
                  mesaage: '13자리 이상 입력이 불가합니다.',
                },
                pattern: {
                  value: /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
                  message: '전화번호 형식에 맞지않습니다.',
                },
              }}
            />
          </View>
          <View>
            <TextInputGroup
              name="fullBirthday"
              label="생년월일"
              error={errors.fullBirthday}
              control={control}
              regex={autoHyphenBirthday}
              rules={{
                required: '생년월일은 필수 입력 사항입니다.',
                maxLength: {
                  value: 10,
                  message: '1월은 01과 같은 형식으로 입력해주세요.',
                },
                minLength: {
                  value: 10,
                  message: '1월은 01과 같은 형식으로 입력해주세요.',
                },
              }}
            />
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView className="flex justify-end mb-10">
        <NextButton
          title="다음"
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
}
