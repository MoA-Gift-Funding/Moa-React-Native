import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
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
import TextRegular from '../../components/text/TextRegular';
import LoadingBar from '../../components/bar/LoadingBar';
import SideToggle from '../../components/button/SideToggle';
// import {createFund} from '../../apis/fund/Funding';

const NewFundShipping = ({navigation, route}) => {
  const {deadline, description, upperPriceLimit, title, id} = route.params;
  const [onPostModal, setOnPostModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [leftPressed, setLeftPressed] = useState(true);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {
      recipientName: '',
      roadAddress: '',
      detailedAddress: '',
      phoneNumber: '',
      zonecode: 0,
    },
  });

  const {recipientName, roadAddress, detailedAddress, phoneNumber, zonecode} =
    getValues();
  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const result = await createFund({
        deadline,
        description,
        upperPriceLimit,
        title,
        productId: id,
        recipientName,
        roadAddress,
        detailedAddress,
        phoneNumber,
        zonecode,
        agreement: 'Y',
        userId: 2,
      });
      if (result.status === 'OK') {
        return navigation.navigate('FundCompleted');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    // navigation.navigate('FundCompleted');
  };

  return (
    <KeyboardAvoidingView
      className="px-6 bg-white h-full flex flex-col justify-between"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoading && <LoadingBar />}
        <SideToggle
          leftTxt="기존 배송지"
          rightTxt="신규 입력"
          state={leftPressed}
          onPress={setLeftPressed}
        />
        {leftPressed && <></>}
        {!leftPressed && (
          <>
            <View>
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
                  name="phoneNumber"
                  label="연락처"
                  control={control}
                  error={errors.phoneNumber}
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
                <TextRegular
                  style="text-Body-1 text-black leading-Body-1 mb-1"
                  title="배송지 주소"
                />
                <Pressable
                  className="w-[312px] h-[56px] justify-center placeholder:text-[#858585] bg-Gray-02 border-[1px] border-[#D9D9D9] rounded-md px-3 text-Body-1"
                  onPress={() => setOnPostModal(true)}>
                  <TextInput
                    placeholder="주소 검색하기"
                    editable={false}
                    value={roadAddress}
                    className="placeholder:text-[#858585] text-Body-1"
                    pointerEvents="none"
                  />
                </Pressable>
                {roadAddress && (
                  <>
                    <TextInputGroupWhite
                      name="detailedAddress"
                      label=""
                      custom="-mt-4"
                      control={control}
                      error={errors.detailedAddress}
                      placeholder="상세 주소를 입력해주세요."
                      rules={{
                        required: '상세 주소를 입력해주세요.',
                      }}
                    />
                  </>
                )}
                {onPostModal && (
                  <Modal
                    className="flex flex-col justify-center items-center"
                    animationType="fade">
                    <SafeAreaView />
                    <View className="w-full flex items-end">
                      <Pressable
                        className="p-2"
                        onPress={() => {
                          setOnPostModal(false);
                          setIsLoading(false);
                        }}>
                        <FontAwesomeIcon icon={faClose} size={24} />
                      </Pressable>
                    </View>
                    <View className="h-full w-full flex items-center mt-8">
                      <Postcode
                        style={{width: 320, height: 470}}
                        jsOptions={{animation: true}}
                        onSelected={data => {
                          setValue('roadAddress', data.roadAddress);
                          setValue('zonecode', data.zonecode);
                          setOnPostModal(false);
                          setIsLoading(false);
                        }}
                        onError={err => console.log(err)}
                      />
                    </View>
                  </Modal>
                )}
              </View>
            </View>
          </>
        )}
      </ScrollView>
      <KeyboardAvoidingView className="mb-8">
        <NextButton
          title="펀딩 개설하기"
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        />
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
};

export default NewFundShipping;
