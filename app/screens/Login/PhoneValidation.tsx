import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import TextInputGroup from '../../components/text/TextInputGroup';
import {useForm} from 'react-hook-form';
import {useUserContext} from '../../contexts/UserContext';
import NextButton from '../../components/button/NextButton';
import ProgressBar from '../../components/bar/ProgressBar';
import LoadingBar from '../../components/bar/LoadingBar';
import Countdown from 'react-countdown';
import cls from 'classnames';
import {twoDP} from '../../utils/regex';
import useUser from '../../hooks/user/useUser';

const PhoneValidation = () => {
  const [sent, setSent] = useState(false);
  const [date, setDate] = useState(Date.now());
  const [pressed, setPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    userState: {user},
  } = useUserContext();

  const {requestMobileQuery, verifyMobileQuery} = useUser();

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    defaultValues: {
      recipientNo:
        user?.phoneNumber && user.phoneNumber[0] === '1'
          ? '0' + user?.phoneNumber
          : user?.phoneNumber,
      verificationNumber: '',
    },
  });

  const onSubmit = async ({
    verificationNumber,
  }: {
    verificationNumber: string;
  }) => {
    setPressed(true);
    try {
      setIsLoading(true);
      await verifyMobileQuery(verificationNumber);
    } finally {
      setPressed(false);
      setIsLoading(false);
    }
  };

  const getVerificationCode = async ({recipientNo}: {recipientNo: string}) => {
    if (sent) {
      return;
    }
    try {
      setIsLoading(true);
      setDate(Date.now());
      setSent(true);
      await requestMobileQuery(recipientNo);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="px-6 bg-white h-full flex flex-col justify-between"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProgressBar progress={'w-2/5'} />
        {isLoading && <LoadingBar />}
        <View className="my-10 text-[22px] font-semibold">
          <TextSemiBold
            style="text-Heading-3 text-black"
            title="휴대폰 번호를"
          />
          <TextSemiBold
            style="text-Heading-3  text-black"
            title="인증해주세요."
          />
        </View>
        <View className="flex flex-col gap-2">
          <View>
            <TextInputGroup
              name="recipientNo"
              label="휴대폰 번호"
              control={control}
              error={errors.recipientNo}
              editable={false}
            />
          </View>
          {sent && (
            <View>
              <TextInputGroup
                name="verificationNumber"
                label="인증번호"
                control={control}
                placeholder="인증번호 6자리 입력"
                error={errors.verificationNumber}
                keyboardType="number-pad"
                rules={{
                  required: '인증번호를 입력해주세요.',
                  minLength: {
                    value: 6,
                    message: '올바른 인증번호 형식을 입력해주세요.',
                  },
                  maxLength: {
                    value: 6,
                    message: '올바른 인증번호 형식을 입력해주세요.',
                  },
                }}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <KeyboardAvoidingView className="mb-8 items-center">
        {sent && (
          <Countdown
            date={date + 1000 * 60 * 3 - 1000}
            onComplete={() => {
              setSent(false);
              setPressed(false);
            }}
            renderer={({minutes, seconds, completed}) => {
              if (completed) {
                return (
                  <NextButton
                    title="인증문자 받기"
                    handleSubmit={handleSubmit}
                    onSubmit={getVerificationCode}
                  />
                );
              } else {
                return (
                  <Pressable
                    className={cls(
                      'h-[56px] w-[312px]  rounded-lg flex items-center justify-center',
                      {
                        'bg-Gray-08': !isValid,
                        'bg-Main-01': isValid,
                      },
                    )}
                    disabled={pressed}
                    onPress={handleSubmit(onSubmit)}>
                    <TextSemiBold
                      style="text-white text-Body-1 ml-[14px]"
                      title={`${twoDP(minutes)}:${twoDP(seconds)}`}
                    />
                  </Pressable>
                );
              }
            }}
          />
        )}
        {!sent && (
          <NextButton
            title="인증문자 받기"
            handleSubmit={handleSubmit}
            onSubmit={getVerificationCode}
          />
        )}
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
};

export default PhoneValidation;
