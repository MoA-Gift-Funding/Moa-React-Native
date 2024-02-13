import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import TextBold from '../../components/text/TextBold';
import TextRegular from '../../components/text/TextRegular';
import {Controller, useForm} from 'react-hook-form';
import NextButton from '../../components/button/NextButton';

const JoinFund = ({navigation, route}) => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm({defaultValues: {price: ''}});
  const {maximumAmount, remainAmount, id} = route.params;
  const maxPrice = maximumAmount > remainAmount ? maximumAmount : remainAmount;
  const handleAddedPrice = (amount: number) => {
    const added = Number(getValues().price || 0) + amount;
    if (added > maxPrice) {
      return setValue('price', maxPrice.toString());
    }
    setValue('price', added.toString());
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="h-full bg-white px-6 flex justify-between">
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
          <TextRegular
            title="펀딩 완료까지 남은 금액안에서 펀딩을 할 수 있어요."
            style="text-Detail-1 leading-Detail-1 text-Gray-06 mt-3"
          />
          <View className="mt-16">
            <View>
              <Controller
                control={control}
                rules={{
                  required: '펀딩할 금액을 입력해주세요.',
                  max: {
                    value: maxPrice,
                    message: '최대 펀딩 가능한 금액을 초과했어요.',
                  },
                  min: {
                    value: 5000,
                    message: '펀딩은 최소 5천원부터 가능해요.',
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: '숫자만 입력가능해요.',
                  },
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    className="w-[312px] h-[56px] rounded-md px-3 text-Body-1 text-black placeholder:text-[#858585] bg-Gray-02"
                    placeholder="더할 금액 입력"
                    onBlur={onBlur}
                    onChangeText={text => {
                      onChange(text);
                    }}
                    value={value.toString()}
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
            <View className="flex flex-row justify-around mt-2 w-[312px]">
              <Pressable
                className="w-[61px] h-[42px] flex justify-center items-center bg-Gray-02 rounded-lg"
                onPress={() => handleAddedPrice(5000)}>
                <TextRegular title="+5천원" style="text-Gray-06 text-Body-2" />
              </Pressable>
              <Pressable
                className="w-[61px] h-[42px] flex justify-center items-center bg-Gray-02 rounded-lg"
                onPress={() => handleAddedPrice(10000)}>
                <TextRegular title="+1만원" style="text-Gray-06 text-Body-2" />
              </Pressable>
              <Pressable
                className="w-[61px] h-[42px] flex justify-center items-center bg-Gray-02 rounded-lg"
                onPress={() => handleAddedPrice(50000)}>
                <TextRegular title="+5만원" style="text-Gray-06 text-Body-2" />
              </Pressable>
              <Pressable
                className="px-2 h-[42px] flex justify-center items-center bg-Gray-02 rounded-lg"
                onPress={() => setValue('price', maxPrice.toString())}>
                <TextRegular
                  title="최대 금액 채우기"
                  style="text-Gray-06 text-Body-2"
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View className="mb-8 flex justify-center items-center">
          <NextButton
            title="다음"
            handleSubmit={handleSubmit}
            onSubmit={() =>
              navigation.navigate('JoinFundMSG', {
                price: getValues().price,
                id,
              })
            }
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default JoinFund;
