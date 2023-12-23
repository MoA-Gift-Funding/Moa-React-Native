import React from 'react';
import {KeyboardAvoidingView, Platform, Pressable, View} from 'react-native';
import TextBold from '../../components/text/TextBold';
import TextRegular from '../../components/text/TextRegular';
import TextInputGroup from '../../components/text/TextInputGroup';
import {useForm} from 'react-hook-form';
import NextButton from '../../components/button/NextButton';

const JoinFund = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="h-full bg-white px-6">
      <View className="mt-4">
        <View className="flex flex-row">
          <TextBold
            title="그리니야"
            style="text-Heading-3 leading-Heading-3 text-Main-01"
          />
          <TextBold
            title="님의 펀딩에"
            style="text-Heading-3 leading-Heading-3"
          />
        </View>
        <TextBold
          title="얼마를 더하시겠어요?"
          style="text-Heading-3 leading-Heading-3"
        />
      </View>
      <View className="mt-14">
        <TextInputGroup
          name="price"
          label=""
          control={control}
          error={errors.price}
          placeholder="더할 금액 입력"
          keyboardType="number-pad"
          rules={{required: '펀딩할 금액을 입력해주세요.'}}
        />
        <View className="flex flex-row justify-around mt-1">
          <Pressable className="w-[61px] h-[42px] flex justify-center items-center bg-Gray-02 rounded-lg">
            <TextRegular title="+5천원" style="text-Gray-06 text-Body-2" />
          </Pressable>
          <Pressable className="w-[61px] h-[42px] flex justify-center items-center bg-Gray-02 rounded-lg">
            <TextRegular title="+1만원" style="text-Gray-06 text-Body-2" />
          </Pressable>
          <Pressable className="w-[61px] h-[42px] flex justify-center items-center bg-Gray-02 rounded-lg">
            <TextRegular title="+5만원" style="text-Gray-06 text-Body-2" />
          </Pressable>
          <Pressable className="px-2 h-[42px] flex justify-center items-center bg-Gray-02 rounded-lg">
            <TextRegular
              title="남은 금액 채우기"
              style="text-Gray-06 text-Body-2"
            />
          </Pressable>
        </View>
      </View>
      <KeyboardAvoidingView className="absolute bottom-8 right-6">
        <NextButton
          title="다음"
          handleSubmit={handleSubmit}
          onSubmit={() => {}}
        />
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
};

export default JoinFund;
