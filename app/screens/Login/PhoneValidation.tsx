import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import TextSemiBold from '../../components/text/TextSemiBold';
import TextInputGroup from '../../components/text/TextInputGroup';
import {useForm} from 'react-hook-form';
import {useUserContext} from '../../contexts/UserContext';
import NextButton from '../../components/button/NextButton';

const PhoneValidation = () => {
  const [sent, setSent] = useState(false);
  const {
    userState: {user},
  } = useUserContext();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      phoneNumber: user?.phoneNumber,
      validationNumber: '',
    },
  });
  const onSubmit = async data => {
    console.log(data);
  };
  return (
    <View className="px-6 bg-white h-full flex flex-col justify-between">
      <View>
        <View className="my-10 text-[22px] font-semibold">
          <TextSemiBold style="text-Heading-3 text-black" title="아래 정보로" />
          <TextSemiBold
            style="text-Heading-3  text-black"
            title="가입을 진행합니다."
          />
        </View>
        <View className="flex flex-col gap-2">
          <TextInputGroup
            name="phoneNumber"
            label="휴대폰 번호"
            control={control}
            error={errors.phoneNumber}
          />
          {sent && (
            <TextInputGroup
              name="validationNumber"
              label="인증번호"
              control={control}
              placeholder="인증번호 6자리 입력"
              error={errors.phoneNumber}
            />
          )}
        </View>
      </View>
      <View className="mb-10">
        {sent && (
          <NextButton
            title="4:55"
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        )}
        {!sent && (
          <NextButton
            title="인증문자 받기"
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
        )}
      </View>
    </View>
  );
};

export default PhoneValidation;
