import React, {useState} from 'react';
import {
  Alert,
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
import {requestVerifyMSG, verifyPhoneNumber} from '../../apis/phone/Phone';
import ProgressBar from '../../components/bar/ProgressBar';
import LoadingBar from '../../components/bar/LoadingBar';
import Countdown from 'react-countdown';
import cls from 'classnames';
import {twoDP} from '../../utils/regex';

const PhoneValidation = ({navigation, route}) => {
  const [sent, setSent] = useState(false);
  const [date, setDate] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(false);
  const {
    userState: {user},
  } = useUserContext();
  console.log(user);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors, touchedFields},
  } = useForm({
    defaultValues: {
      recipientNo:
        user?.phoneNumber[0] === '1'
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
    setIsLoading(true);
    const isVerified = await verifyPhoneNumber(verificationNumber);
    setIsLoading(false);
    if (isVerified) {
      return navigation.navigate('Profile');
    }
  };

  const handleMSGButton = async (recipientNo: string) => {
    setIsLoading(true);
    setDate(Date.now());
    if (sent) {
      return;
    }
    setSent(true);
    const msgSent = await requestVerifyMSG(recipientNo);
    if (!msgSent) {
      Alert.alert('네트워크 오류', '다시 시도해주세요.', [{text: '확인'}]);
    }
    setIsLoading(false);
  };
  return (
    <KeyboardAvoidingView
      className="px-6 bg-white h-full flex flex-col justify-between"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProgressBar progress={'w-2/5'} />
        {isLoading && <LoadingBar />}
        <View className="my-10 text-[22px] font-semibold">
          <TextSemiBold style="text-Heading-3 text-black" title="아래 정보로" />
          <TextSemiBold
            style="text-Heading-3  text-black"
            title="가입을 진행합니다."
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
                rules={{required: '인증번호를 입력해주세요.'}}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <KeyboardAvoidingView className="mb-8 items-center">
        {sent && (
          <Countdown
            date={date + 1000 * 60 * 3 - 1000}
            renderer={({minutes, seconds, completed}) => {
              if (completed) {
                return (
                  <NextButton
                    title="인증하기"
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                  />
                );
              } else {
                return (
                  <Pressable
                    className={cls(
                      'h-[56px] w-[312px]  rounded-lg flex items-center justify-center',
                      {
                        'bg-Gray-08': Object.keys(touchedFields).length === 0,
                        'bg-Main-01': Object.keys(touchedFields).length !== 0,
                      },
                    )}
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
            onSubmit={handleMSGButton}
          />
        )}
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
};

export default PhoneValidation;
