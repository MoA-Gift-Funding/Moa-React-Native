import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from 'react-native';
import TextBold from '../../components/text/TextBold';
import TextRegular from '../../components/text/TextRegular';
import {Controller, useForm} from 'react-hook-form';
import NextButton from '../../components/button/NextButton';

const JoinFund = () => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm();
  const total = '145000';
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
      <View className="mt-16">
        <View>
          <Controller
            control={control}
            rules={{
              required: '펀딩할 금액을 입력해주세요.',
              pattern: /\d/,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                className="w-[312px] h-[56px] rounded-md px-3 text-Body-1 text-black placeholder:text-[#858585] bg-Gray-02"
                placeholder="더할 금액 입력"
                onBlur={onBlur}
                onChangeText={text => {
                  onChange(text);
                }}
                value={value}
                keyboardType="number-pad"
              />
            )}
            name="price"
          />
          {errors.price && (
            <TextRegular
              style="text-red-500 text-sm ml-1"
              title={errors.price.message}
            />
          )}
        </View>
        <View className="flex flex-row justify-around mt-2">
          <Pressable
            className="w-[61px] h-[42px] flex justify-center items-center bg-Gray-02 rounded-lg"
            onPress={() =>
              setValue('price', String(Number(getValues().price) + 5000))
            }>
            <TextRegular title="+5천원" style="text-Gray-06 text-Body-2" />
          </Pressable>
          <Pressable
            className="w-[61px] h-[42px] flex justify-center items-center bg-Gray-02 rounded-lg"
            onPress={() =>
              setValue('price', String(Number(getValues().price) + 10000))
            }>
            <TextRegular title="+1만원" style="text-Gray-06 text-Body-2" />
          </Pressable>
          <Pressable
            className="w-[61px] h-[42px] flex justify-center items-center bg-Gray-02 rounded-lg"
            onPress={() =>
              setValue('price', String(Number(getValues().price) + 50000))
            }>
            <TextRegular title="+5만원" style="text-Gray-06 text-Body-2" />
          </Pressable>
          <Pressable
            className="px-2 h-[42px] flex justify-center items-center bg-Gray-02 rounded-lg"
            onPress={() => setValue('price', total)}>
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