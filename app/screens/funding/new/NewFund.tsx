import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import TextBold from '../../../components/text/TextBold';
import {useForm} from 'react-hook-form';
import TextInputGroupWhite from '../../../components/text/textInputGroupWhite';
import TextRegular from '../../../components/text/TextRegular';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import NextButton from '../../../components/button/NextButton';
import TextSemiBold from '../../../components/text/TextSemiBold';
import {autoCurrency} from '../../../utils/regex';

const NewFund = ({navigation, route}) => {
  const {id, price} = route.params;
  const [endDate, setEndDate] = useState(dayjs());
  const [dateError, setDateError] = useState(false);
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      maximumAmount: '',
      endDate: '',
    },
  });
  const onSubmit = (data: {
    title: string;
    description: string;
    maximumAmount: string;
    endDate: string;
  }) => {
    if (!data.maximumAmount) {
      setValue('maximumAmount', price);
    }
    if (endDate.day === dayjs().day) {
      return setDateError(true);
    }
    const userInputs = getValues();
    navigation.navigate('NewFundShipping', {
      headerTitle: '펀딩개설하기',
      productId: id,
      ...userInputs,
    });
  };

  return (
    <KeyboardAvoidingView
      className="px-6 bg-white h-full mx-auto"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-8">
          <TextBold
            title="펀딩 개설을 위해 정보를"
            style="text-Heading-3 leading-Heading-3"
          />
          <TextBold
            title="입력해주세요."
            style="text-Heading-3 leading-Heading-3"
          />
        </View>
        <View className="flex flex-col mt-8">
          <View>
            <TextInputGroupWhite
              name="title"
              label="펀딩 제목"
              control={control}
              error={errors.title}
              placeholder="펀딩 제목을 입력해주세요. (최대 25자)"
              rules={{
                required: '펀딩 제목은 필수 입력 사항이예요.',
                minLength: {
                  value: 5,
                  message: '최소 5자 이상 입력 해야해요.',
                },
                maxLength: {
                  value: 25,
                  message: '최대 25자까지 입력 가능해요.',
                },
              }}
            />
          </View>
          <View className="mt-2">
            <TextInputGroupWhite
              name="description"
              label="펀딩 소개"
              control={control}
              error={errors.description}
              placeholder="메세지 입력(최소 10자, 최대 500자)"
              desc="개설하고자하는 펀딩에 대해 소개해주세요.(최대 500자)"
              custom="h-[200px]"
              textAlignVertical="top"
              multiline={true}
              rules={{
                required: '펀딩 소개는 필수 입력 사항이예요.',
                minLength: {
                  value: 10,
                  message: '최소 10자 이상 입력 해야해요.',
                },
                maxLength: {
                  value: 500,
                  message: '최대 500자까지 입력 가능해요.',
                },
              }}
            />
          </View>
          <View className="mt-2">
            <TextInputGroupWhite
              name="maximumAmount"
              label="1인당 펀딩 최대 가능 금액"
              control={control}
              error={errors.maximumAmount}
              desc="펀딩에 참여할 친구의 1인당 최대 펀딩 가능 금액을 설정할 수 있어요. 입력 칸을 비워두면 금액 제한 없이 펀딩이 가능해요."
              keyboardType={'number-pad'}
              rules={{
                min: {
                  value: 5000,
                  message: '최소 5천원부터 설정 가능해요.',
                },
                max: {
                  value: price,
                  message: `최대 ${autoCurrency(price)}원까지 설정 가능해요.`,
                },
              }}
            />
          </View>
          <View className="mt-2">
            <TextSemiBold
              style="text-Body-1 text-black leading-Body-1 mb-1"
              title="펀딩 종료일"
            />
            <TextRegular
              title="오늘부터 최대 4주 뒤까지 설정 가능해요."
              style="text-Detail-1 text-Gray-06 mb-2"
            />
            <View className="bg-Gray-01 rounded-lg p-2">
              <DateTimePicker
                value={endDate}
                onValueChange={date => {
                  const cleaned = date?.substring(0, 10);
                  setEndDate(cleaned);
                  setValue('endDate', cleaned);
                  setDateError(false);
                }}
                locale="ko"
                mode="date"
                selectedItemColor={'#FF5414'}
                displayFullDays={true}
                minimumDate={dayjs().add(-1, 'day')}
                maximumDate={dayjs().add(28, 'day')}
              />
            </View>
            {dateError && (
              <TextRegular
                title="펀딩 종료일을 선택해주세요."
                style="text-Detail-1 text-red-500 mt-1"
              />
            )}
          </View>
        </View>
        <KeyboardAvoidingView className="py-8 flex justify-center items-center">
          <NextButton
            title="다음"
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewFund;
