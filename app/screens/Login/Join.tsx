import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import NextButton from '../../components/button/NextButton';
import TextInputGroup from '../../components/text/TextInputGroup';
import {useForm} from 'react-hook-form';
import {useUserContext} from '../../contexts/UserContext';
import {autoHyphenPhoneNumber, autoSlashBirthday} from '../../utils/regex';
import {UserFormData} from '../../types/User';
import {updateUser} from '../../apis/user/User';
import ProgressBar from '../../components/bar/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingBar from '../../components/bar/LoadingBar';

export default function Join({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    userState: {user},
    dispatch,
  } = useUserContext();
  const {nickname, phoneNumber, birthday, birthyear, email} = user;

  const onSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    const bdayList = data.fullBirthday.split('/');
    const updated = await updateUser({
      ...data,
      birthyear: bdayList[0],
      birthday: `${bdayList[1]}${bdayList[2]}`,
    });
    dispatch({
      type: 'LOGIN',
      payload: {...updated, joinProcess: 'inProcess'},
    });
    await AsyncStorage.setItem('process', 'PhoneValidation');
    setIsLoading(false);
    navigation.navigate('PhoneValidation');
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email,
      nickname,
      birthday,
      phoneNumber,
      birthyear,
      fullBirthday: autoSlashBirthday(`${birthyear}${birthday}`),
    },
  });
  useEffect(() => {
    async function getProcess() {
      const process = await AsyncStorage.getItem('process');
      if (process) {
        return navigation.navigate(process);
      }
    }
    getProcess();
  }, []);

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
              editable={!!email || false}
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
                  value: /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
                  message: '전화번호 형식에 맞지 않아요.',
                },
              }}
              keyboardType={'number-pad'}
            />
          </View>
          <View>
            <TextInputGroup
              name="fullBirthday"
              label="생년월일"
              error={errors.fullBirthday}
              control={control}
              regex={autoSlashBirthday}
              rules={{
                required: '생년월일은 필수 입력 사항이예요.',
                maxLength: {
                  value: 10,
                  message: '생년월일은 8자만 입력 가능해요.',
                },
                minLength: {
                  value: 10,
                  message: '1월은 01과 같은 형식으로 입력해주세요.',
                },
                pattern: {
                  value:
                    /(19\d\d|20[01]\d|202[0-2])[/](0[1-9]|1[012])[/](0[1-9]|[12][0-9]|3[01])/,
                  message: '올바른 생년월일을 입력해주세요.',
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
