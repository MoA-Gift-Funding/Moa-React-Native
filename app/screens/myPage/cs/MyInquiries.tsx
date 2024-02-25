import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import ToggleListItem from './ToggleListItem';
import {useForm} from 'react-hook-form';
import NextButton from '../../../components/button/NextButton';
import MakeInquiry from './MakeInquiry';

const MyInquiries = () => {
  const {handleSubmit} = useForm();
  const [inquiryListSelected, setInquiryListSelected] = useState(true);

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
