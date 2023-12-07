import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import TextBold from '../../components/text/TextBold';
import {useForm} from 'react-hook-form';
import TextInputGroupWhite from '../../components/text/textInputGroupWhite';
import TextRegular from '../../components/text/TextRegular';
import TextSemiBold from '../../components/text/TextSemiBold';

const NewFund = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      priceLimit: '',
      deadline: '',
    },
  });
  return (
    <KeyboardAvoidingView
      className="px-6 bg-white h-full"
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
                required: '펀딩 제목은 필수 입력 사항입니다.',
                maxLength: {
                  value: 25,
                  message: '최대 25자까지 입력 가능합니다.',
                },
              }}
            />
          </View>
          <View className="mt-2">
            <TextInputGroupWhite
              name="description"
              label="펀딩 소개"
              control={control}
              error={errors.title}
              placeholder="메세지 입력"
              desc="개설하고자하는 펀딩에 대해 소개해주세요.(최소 10자 최대 500자)"
              custom="h-[200px]"
              multiline={true}
            />
          </View>
          <View className="mt-2">
            <TextInputGroupWhite
              name="priceLimit"
              label="펀딩 최대 가능 금액"
              control={control}
              error={errors.title}
              desc="1인당 최대 펀딩 가능 금액을 설정할 수 있어요."
              placeholder=""
              rules={{
                required: '최소 1만원부터 설정 가능해요.',
                maxLength: {
                  value: 25,
                  message: '최대 25자까지 입력 가능합니다.',
                },
              }}
            />
          </View>
          <View className="mt-2">
            <TextRegular
              style="text-Body-1 text-black leading-Body-1 mb-1"
              title="펀딩 종료일"
            />
            <TextRegular
              title="오늘부터 최대 4주 뒤까지 설정 가능합니다."
              style="text-Detail-1 text-Gray-06 mb-2"
            />
            <Pressable>
              <TextSemiBold title="1주" />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewFund;
