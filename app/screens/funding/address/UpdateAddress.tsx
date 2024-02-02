import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import TextInputGroupWhite from '../../../components/text/textInputGroupWhite';
import {autoHyphenPhoneNumber} from '../../../utils/regex';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import Postcode from '@actbase/react-daum-postcode';
import LoadingBar from '../../../components/bar/LoadingBar';
import {useForm} from 'react-hook-form';
import NextButton from '../../../components/button/NextButton';
import TextSemiBold from '../../../components/text/TextSemiBold';
import CheckBox from '../../../components/button/CheckBox';
import TextRegular from '../../../components/text/TextRegular';
import useFunding from '../../../hooks/useFunding';

const UpdateAddress = () => {
  const [onPostModal, setOnPostModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [diabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      recipientName: '',
      roadAddress: '',
      jibunAddress: '',
      detailAddress: '',
      phoneNumber: '',
      zonecode: 0,
    },
  });
  const {addrsQuery, createAddrQuery} = useFunding();
  const onSubmit = data => {
    createAddrQuery(data);
  };
  useEffect(() => {
    if (addrsQuery && addrsQuery.length < 1) {
      setChecked(true);
      setDisabled(true);
    }
  }, [addrsQuery]);
  const {
    recipientName,
    roadAddress,
    detailAddress,
    phoneNumber,
    zonecode,
    jibunAddress,
  } = getValues();
  return (
    <View className="h-full flex flex-col justify-between mt-8">
      {isLoading && <LoadingBar />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View>
            <TextInputGroupWhite
              name="name"
              label="배송지명"
              control={control}
              error={errors.name}
              placeholder="배송지 이름을 입력해주세요."
              rules={{
                required: '배송지 이름을 입력해주세요.',
                maxLength: {
                  value: 10,
                  message: '최대 10자까지 입력 가능해요.',
                },
              }}
            />
          </View>
          <View className="mt-2">
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
          <View className="mt-2">
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
                  value: /^(010)-?[0-9]{3,4}-?[0-9]{4}$/,
                  message: '전화번호 형식에 맞지 않아요. 모바일만 가능해요.',
                },
              }}
              keyboardType={'number-pad'}
            />
          </View>
          <View className="mt-2">
            <TextSemiBold
              style="text-Body-1 text-black leading-Body-1 mb-1"
              title="배송지 주소"
            />
            <Pressable
              className="w-[312px] h-[56px] justify-center placeholder:text-[#858585] bg-Gray-02 border-[1px] border-[#D9D9D9] rounded-md px-3 text-Body-1"
              onPress={() => setOnPostModal(true)}>
              <TextInput
                placeholder="주소 검색하기"
                editable={false}
                value={roadAddress || jibunAddress}
                className="placeholder:text-[#858585] text-Body-1"
                pointerEvents="none"
              />
            </Pressable>
            {(roadAddress || jibunAddress) && (
              <>
                <TextInputGroupWhite
                  name="detailAddress"
                  label=""
                  custom="-mt-4"
                  control={control}
                  error={errors.detailAddress}
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
                <SafeAreaView>
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
                        setValue('jibunAddress', data.jibunAddress);
                        setValue('zonecode', data.zonecode);
                        setOnPostModal(false);
                        setIsLoading(false);
                      }}
                      onError={err => console.log(err)}
                    />
                  </View>
                </SafeAreaView>
              </Modal>
            )}
          </View>
        </View>
        <View className="mt-6 flex flex-row items-center">
          <CheckBox
            checked={checked}
            setChecked={() => setChecked(!checked)}
            disabled={diabled}
          />
          <TextRegular
            title="기본 배송지로 등록"
            style="ml-2 text-Gray-08 text-Body-2"
          />
        </View>
      </ScrollView>
      <KeyboardAvoidingView className="mb-28 flex justify-end items-center">
        <NextButton
          title="배송지 추가하기"
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default UpdateAddress;
