import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import TextBold from '../../components/text/TextBold';
import TextInputGroupWhite from '../../components/text/textInputGroupWhite';
import {useForm} from 'react-hook-form';
import {autoHyphenPhoneNumber} from '../../utils/regex';
import Postcode from '@actbase/react-daum-postcode';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import NextButton from '../../components/button/NextButton';

const NewFundShipping = () => {
  const [onPostModal, setOnPostModal] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      recipientName: '',
      roadAddr: '',
      detailedAddr: '',
      recipientMobile: '',
      zonecode: '',
    },
  });
  return (
    <KeyboardAvoidingView
      className="px-6 bg-white h-full"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-8">
          <TextBold
            title="펀딩 상품 수령인의 정보를"
            style="text-Heading-3 leading-Heading-3"
          />
          <TextBold
            title="입력해주세요."
            style="text-Heading-3 leading-Heading-3"
          />
        </View>
        <View className="flex flex-col mt-10">
          <View>
            <TextInputGroupWhite
              name="recipientName"
              label="받는 사람"
              control={control}
              error={errors.recipientName}
              placeholder="이름을 입력해주세요."
              rules={{
                required: '이름을 입력해주세요.',
                minLength: {
                  value: 2,
                  message: '최소 2자 이상 입력 해야해요.',
                },
                maxLength: {
                  value: 5,
                  message: '최대 5자까지 입력 가능해요.',
                },
              }}
            />
          </View>
          <View className="mt-4">
            <TextInputGroupWhite
              name="recipientMobile"
              label="연락처"
              control={control}
              error={errors.recipientMobile}
              placeholder="받는 사람 연락처를 입력해주세요."
              regex={autoHyphenPhoneNumber}
              rules={{
                required: '연락처를 입력해주세요.',
                maxLength: {
                  value: 13,
                  mesaage: '13자리 이상 입력이 불가해요.',
                },
                pattern: {
                  value: /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
                  message: '전화번호 형식에 맞지 않아요.',
                },
              }}
              keyboardType={'number-pad'}
            />
          </View>
          <View className="mt-4">
            <NextButton
              title="주소 검색하기"
              onSubmit={() => {
                setOnPostModal(!onPostModal);
              }}
              handleSubmit={handleSubmit}
            />
            <TextInputGroupWhite
              name="roadAddr"
              label="배송지 주소"
              control={control}
              error={errors.recipientName}
              placeholder="배송지 주소를 입력해주세요."
              rules={{
                required: '배송지 주소를 입력해주세요.',
              }}
            />
            {onPostModal && (
              <Modal
                className="flex flex-col justify-center items-center"
                animationType="fade">
                <SafeAreaView />
                <View className="w-full flex items-end">
                  <View className="p-2">
                    <FontAwesomeIcon icon={faClose} size={24} />
                  </View>
                </View>
                <View className="h-full w-full flex items-center mt-8">
                  <Postcode
                    style={{width: 320, height: 470}}
                    jsOptions={{animation: true}}
                    onSelected={data => Alert.alert(JSON.stringify(data))}
                    onError={err => console.log(err)}
                  />
                </View>
              </Modal>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NewFundShipping;
