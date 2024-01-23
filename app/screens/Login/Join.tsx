import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import NextButton from '../../components/button/NextButton';
import TextInputGroup from '../../components/text/TextInputGroup';
import {useForm} from 'react-hook-form';
import {useUserContext} from '../../contexts/UserContext';
import {autoHyphenPhoneNumber} from '../../utils/regex';
import {User} from '../../types/User';
import ProgressBar from '../../components/bar/ProgressBar';
import LoadingBar from '../../components/bar/LoadingBar';
import {updateUser} from '../../apis/user/User';

export default function Join({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    userState: {user},
    dispatch,
  } = useUserContext();

  const onSubmit = async ({
    nickname,
    email,
    phoneNumber,
  }: Pick<User, 'nickname' | 'email' | 'phoneNumber'>) => {
    setIsLoading(true);
    const updated = await updateUser({nickname, email, phoneNumber});
    dispatch({
      type: 'LOGIN',
      payload: {...updated, email},
    });
    setIsLoading(false);
    navigation.navigate('PhoneValidation');
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: user?.email,
      nickname: user?.nickname,
      phoneNumber:
        user?.phoneNumber && user.phoneNumber[0] === '1'
          ? '0' + user.phoneNumber
          : user?.phoneNumber,
    },
  });

  return (
    <KeyboardAvoidingView
      className="px-6 bg-white h-full"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProgressBar progress={'w-1/5'} />
        {isLoading && <LoadingBar />}
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
                required: '닉네임은 필수 입력 사항이예요.',
                maxLength: {
                  value: 20,
                  message: '최대 20자까지 입력 가능해요.',
                },
              }}
            />
          </View>
          <View>
            <TextInputGroup
              name="email"
              label="이메일"
              error={errors.email}
              control={control}
              editable={!user?.email}
              rules={{
                required: '이메일은 필수 입력 사항이예요',
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: '올바른 이메일 형식이 아니예요.',
                },
              }}
              keyboardType={'email-address'}
            />
          </View>
          <View>
            <TextInputGroup
              name="phoneNumber"
              label="전화번호"
              error={errors.phoneNumber}
              control={control}
              regex={autoHyphenPhoneNumber}
              rules={{
                required: '전화번호는 필수 입력 사항이예요.',
                maxLength: {
                  value: 13,
                  mesaage: '13자리 이상 입력이 불가해요.',
                },
                pattern: {
                  value: /^(010)-?[0-9]{3,4}-?[0-9]{4}$/,
                  message: '올바른 전화번호 형식이 아니예요.',
                },
              }}
              keyboardType={'number-pad'}
            />
          </View>
        </View>
      </ScrollView>
      <KeyboardAvoidingView className="flex items-center justify-end mb-8">
        <NextButton
          title="다음"
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
}
