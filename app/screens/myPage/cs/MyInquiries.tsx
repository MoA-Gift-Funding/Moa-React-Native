import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import ToggleListItem from './ToggleListItem';
import {useForm} from 'react-hook-form';
import NextButton from '../../../components/button/NextButton';
import MakeInquiry from './MakeInquiry';
import useCS from '../../../hooks/cs/useCS';
import {useRefetchOnFocus} from '../../../hooks/handlers/useRefetchOnFocus';
import TextRegular from '../../../components/text/TextRegular';

const MyInquiries = () => {
  const {handleSubmit} = useForm();
  const [inquiryListSelected, setInquiryListSelected] = useState(true);
  const {personalInquiresQuery, refetchPersonalInquiresQuery} = useCS();
  useRefetchOnFocus(refetchPersonalInquiresQuery);

  const onSubmit = () => {
    setInquiryListSelected(false);
  };
  return (
    <>
      {!inquiryListSelected && (
        <MakeInquiry setInquiryListSelected={setInquiryListSelected} />
      )}
      {inquiryListSelected && (
        <View className="h-full">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {personalInquiresQuery &&
                personalInquiresQuery.length > 0 &&
                personalInquiresQuery.map(inquiry => (
                  <ToggleListItem
                    title={inquiry.content}
                    label={inquiry.answer ? '답변 완료' : '답변 대기'}
                    category="고객센터 답변"
                    content={inquiry.answer || ''}
                  />
                ))}
              {personalInquiresQuery && personalInquiresQuery.length < 1 && (
                <TextRegular
                  title="문의하신 내역이 없어요🤗"
                  style="text-Gray-06 text-center py-10"
                />
              )}
              {!personalInquiresQuery && (
                <TextRegular
                  title="문의하신 내역이 없어요🤗"
                  style="text-Gray-06 text-center py-10"
                />
              )}
            </View>
          </ScrollView>
          <View className="mb-20 flex items-center">
            <NextButton
              title="1:1 문의 등록하기"
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default MyInquiries;
