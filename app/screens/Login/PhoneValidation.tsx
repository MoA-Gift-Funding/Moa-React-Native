import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, ScrollView, View} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import TextInputGroup from '../../components/text/TextInputGroup';
import {useForm} from 'react-hook-form';
import {useUserContext} from '../../contexts/UserContext';
import NextButton from '../../components/button/NextButton';
import {requestVerifyMSG, verifyPhoneNumber} from '../../apis/phone/Phone';
import ProgressBar from '../../components/bar/ProgressBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingBar from '../../components/bar/LoadingBar';

const PhoneValidation = ({navigation}) => {
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    userState: {user},
  } = useUserContext();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      recipientNo: user?.phoneNumber,
      verificationNumber: '',
    },
  });

  const onSubmit = async (data: {
    recipientNo: string;
    verificationNumber: string;
  }) => {
    setIsLoading(true);
    const {isVerified, message} = await verifyPhoneNumber({...data});
    setIsLoading(false);
    if (isVerified) {
      await AsyncStorage.setItem('process', 'Profile');
      return navigation.navigate('Profile');
    }
    Alert.alert('인증 번호 오류', message, [{text: '확인'}]);
    if (message === '시간이 초과되었습니다. 다시 시도해주세요.') {
      setSent(false);
    }
  };

  const handleMSGButton = async ({
    recipientNo,
  }: {
    recipientNo: string;
    verificationNumber: string;
  }) => {
    setIsLoading(true);
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
    <KeyboardAvoidingView className="px-6 bg-white h-full flex flex-col justify-between">
      <ScrollView>
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
      <View className="mb-8 items-center">
        {sent && (
          <NextButton
            title="인증하기"
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        )}
        {!sent && (
          <NextButton
            title="인증문자 받기"
            handleSubmit={handleSubmit}
            onSubmit={handleMSGButton}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default PhoneValidation;
