import React, {useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ToggleListItem from './ToggleListItem';
import TextRegular from '../../../components/text/TextRegular';
import TextBold from '../../../components/text/TextBold';
import TextSemiBold from '../../../components/text/TextSemiBold';
import {useForm} from 'react-hook-form';
import TextInputGroup from '../../../components/text/TextInputGroup';
import NextButton from '../../../components/button/NextButton';
import SelectButton from '../../../components/button/SelectButton';
import {categoryList} from '../../../types/CS';

const MyInquiries = () => {
  const {
    control,
    getValues,
    formState: {errors},
    handleSubmit,
  } = useForm({defaultValues: {message: '', category: ''}});

  const onSubmit = () => {};
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="h-full px-6 flex justify-between">
        <View className="mt-10">
          <TextBold title="1:1 문의" style="text-Heading-3 leading-Heading-3" />
          <TextRegular
            title="문의하신 내용은 빠르게 검토하여,"
            style="text-Gray-06 leading-Body-2 mt-3"
          />
          <TextRegular
            title="카카오톡과 문의 내역을 통해 신속하게 답변 드리겠습니다."
            style="text-Gray-06 leading-Body-2"
          />
          <Pressable className="w-[83px] h-[32px] border border-Main-01 rounded flex items-center justify-center mt-4">
            <TextSemiBold
              title="문의 내역 →"
              style="text-Main-01 leading-Body-2 text-center"
            />
          </Pressable>
          <View className="mt-4">
            <TextRegular title="문의 유형" style="text-Gray-06 text-Detail-1" />
            <SelectButton
              control={control}
              categories={categoryList}
              name="category"
            />
            <TextInputGroup
              name="message"
              label=""
              control={control}
              error={errors.message}
              placeholder="문의 내용을 입력해주세요."
              custom="h-[220px]"
              textAlignVertical="top"
              multiline={true}
              rules={{
                minLength: {
                  value: 10,
                  message: '10자 이상 입력해주세요.',
                },
                maxLength: {
                  value: 500,
                  message: '500자 이내로 입력해주세요.',
                },
              }}
            />
          </View>
        </View>

        {/*
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <ToggleListItem
            title="펀딩은 어떻게 개설하나요?"
            label="답변 대기"
            category="고객센터 답변"
            content="용할지라도 피는 것이 어디 꽃 현저하게 이것이다. 청춘의 거선의 품었기 것이다. 것은 별과 대중을 피부가 기쁘며, 아름답고 칼이다. 이성은 방지하는 따뜻한 그리하였는가?있으며, 찾아 별과 우리는 무엇을 가진 쓸쓸하랴? 같으며, 불어 거친 어디 그리하였는가? 무엇을 인간에 날카로우나 바이며, 얼음에 만물은 싹이 봄바람이다.붙잡아 얼음과 얼음 것이 착목한는 영원히 위하여서. 꽃이 꽃이 귀는 끝에 것이다."
            />
            <ToggleListItem
            title="배송언제올까요?"
            label="답변 완료"
            category="고객센터 답변"
            content="할지라도 피는 것이 어디 꽃 현저하게 이것이다. 청춘의 거선의 품었기 것이다. 것은 별과 대중을 피부가 기쁘며, 아름답고 칼이다. 이성은 방지하는 따뜻한 그리하였는가?있으며, 찾아 별과 우리는 무엇을 가진 쓸쓸하랴? 같으며, 불어 거친 어디 그리하였는가? 무엇을 인간에 날카로우나 바이며, 얼음에 만물은 싹이 봄바람이다.붙잡아 얼음과 얼음 것이 착목한는 영원히 위하여서. 꽃이 꽃이 귀는 끝에 것이다."
            />
          </View>
        </ScrollView>
      */}
        <View className="flex items-center justify-center mb-20">
          <NextButton
            title="문의 등록하기"
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default MyInquiries;
