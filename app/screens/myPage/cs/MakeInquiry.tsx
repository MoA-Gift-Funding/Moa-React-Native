import React, {Dispatch, SetStateAction, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import TextRegular from '../../../components/text/TextRegular';
import TextBold from '../../../components/text/TextBold';
import TextSemiBold from '../../../components/text/TextSemiBold';
import {useForm} from 'react-hook-form';
import TextInputGroup from '../../../components/text/TextInputGroup';
import NextButton from '../../../components/button/NextButton';
import SelectButton from '../../../components/button/SelectButton';
import {categoryList} from '../../../types/CS';
import useCS from '../../../hooks/cs/useCS';
import {useNavigation} from '@react-navigation/native';
const MakeInquiry = ({
  setInquiryListSelected,
}: {
  setInquiryListSelected: Dispatch<SetStateAction<any>>;
}) => {
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm({defaultValues: {content: '', category: ''}});
  const {updatePersonalInquiryquery, refetchPersonalInquiresQuery} = useCS();

  const onSubmit = async data => {
    console.log(data);
    await updatePersonalInquiryquery(data);
    refetchPersonalInquiresQuery();
    setInquiryListSelected(true);
  };
  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      className="flex justify-between">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="h-full px-4 flex items-center bg-white">
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="mt-8">
            <TextBold
              title="1:1 문의"
              style="text-Heading-3 leading-Heading-3"
            />
            <TextRegular
              title="문의하신 내용은 빠르게 검토하여,"
              style="text-Gray-06 leading-Body-2 mt-2"
            />
            <TextRegular
              title="카카오톡과 문의 내역을 통해 신속하게 답변 드리겠습니다."
              style="text-Gray-06 leading-Body-2"
            />
            <Pressable
              className="w-[83px] h-[32px] border border-Main-01 rounded flex items-center justify-center mt-2"
              onPress={() => setInquiryListSelected(true)}>
              <TextSemiBold
                title="문의 내역 →"
                style="text-Main-01 leading-Body-2 text-center"
              />
            </Pressable>
            <View className="mt-10">
              <TextRegular
                title="문의 유형"
                style="text-Gray-06 text-Detail-1"
              />
              <SelectButton
                control={control}
                categories={categoryList}
                name="category"
                placeholder="문의 유형을 선택해주세요."
                rules={{
                  required: {
                    value: true,
                    message: '문의 유형을 선택해주세요.',
                  },
                }}
                error={errors.category}
              />
              <TextInputGroup
                name="content"
                label=""
                control={control}
                error={errors.content}
                placeholder="문의 내용을 입력해주세요."
                custom="h-[220px]"
                textAlignVertical="top"
                multiline={true}
                rules={{
                  required: {
                    value: true,
                    message: '문의 내용을 입력해주세요.',
                  },
                  minLength: {
                    value: 10,
                    message: '문의 내용은 10자 이상 입력해주세요🥲',
                  },
                  maxLength: {
                    value: 500,
                    message: '문의 내용은 500자 이내로 입력해주세요🥲',
                  },
                }}
              />
            </View>
          </View>
        </ScrollView>
        <View className="flex items-center justify-center mb-20">
          <NextButton
            title="1:1 문의 등록하기"
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default MakeInquiry;
