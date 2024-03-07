import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import NextButton from '../../components/button/NextButton';
import TextInputGroup from '../../components/text/TextInputGroup';
import {useForm} from 'react-hook-form';
import {useUserContext} from '../../contexts/UserContext';
import {autoHyphenPhoneNumber, autoSlashBirthday} from '../../utils/regex';
import ProgressBar from '../../components/bar/ProgressBar';
import LoadingBar from '../../components/bar/LoadingBar';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import TextRegular from '../../components/text/TextRegular';
import TextDeepLink from '../../components/text/TextDeepLink';

export default function Join({navigation}) {
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const {
    userState: {user},
    dispatch,
  } = useUserContext();

  const onSubmit = async (data: {
    nickname: string;
    email: string;
    phoneNumber: string;
    fullBirthday: string;
  }) => {
    if (!checked) {
      setError(true);
      return;
    }

    try {
      setIsLoading(true);
      const bdayList = data.fullBirthday.split('/');
      dispatch({
        type: 'LOGIN',
        payload: {
          ...user!,
          ...data,
          birthyear: bdayList[0],
          birthday: `${bdayList[1]}${bdayList[2]}`,
        },
      });
    } finally {
      setIsLoading(false);
      navigation.navigate('PhoneValidation');
    }
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
      fullBirthday: autoSlashBirthday(`${user?.birthyear}${user?.birthday}`),
    },
  });

  return (
    <KeyboardAvoidingView
      className="px-6 bg-white h-full"
      behavior={Platform.select({ios: 'padding'})}>
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
                required: '이메일은 필수 입력 사항이예요.',
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
          <View>
            <TextInputGroup
              name="fullBirthday"
              label="생년월일"
              error={errors.fullBirthday}
              control={control}
              placeholder="2000/08/24"
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
          <View>
            <Pressable
              className="flex flex-row items-center pt-2"
              onPress={() => setChecked(!checked)}>
              <Pressable
                className="border border-Gray-05 w-4 h-4 flex justify-center items-center rounded"
                onPress={() => setChecked(!checked)}>
                {checked && (
                  <FontAwesomeIcon icon={faCheck} color="#FF5414" size={13} />
                )}
              </Pressable>
              <View className="flex flex-row items-center">
                <TextRegular title="(필수) " style="text-Detail-1 ml-2" />
                <TextDeepLink
                  text="이용약관"
                  style="text-Detail-1"
                  url="https://scalloped-oriole-e20.notion.site/9a69de5e6cf642b5aa91547369ff8ae2"
                />
                <TextRegular title=" 및 " style="text-Detail-1" />
                <TextDeepLink
                  text="개인정보 처리방침"
                  style="text-Detail-1"
                  url="https://scalloped-oriole-e20.notion.site/2000535c63d542468afbb0722ff96f08"
                />
                <TextRegular title="에 동의합니다." style="text-Detail-1" />
              </View>
            </Pressable>
            <View>
              {error && !checked && (
                <TextRegular
                  title="서비스 이용을 위한 약관에 동의해주세요."
                  style="text-Detail-1 text-red-500 ml-6"
                />
              )}
            </View>
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
