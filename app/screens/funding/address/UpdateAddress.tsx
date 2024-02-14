import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
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
import {Controller, useForm} from 'react-hook-form';
import NextButton from '../../../components/button/NextButton';
import TextSemiBold from '../../../components/text/TextSemiBold';
import CheckBox from '../../../components/button/CheckBox';
import TextRegular from '../../../components/text/TextRegular';
import useFunding from '../../../hooks/fundings/useFunding';
import {ShippingInfo} from '../../../types/Funding';

const UpdateAddress = ({
  setLeftPressed,
  updatedAddress,
  setUpdatedAddress,
}: {
  setLeftPressed: Dispatch<SetStateAction<boolean>>;
  updatedAddress?: ShippingInfo | null;
  setUpdatedAddress: Dispatch<SetStateAction<ShippingInfo | null>>;
}) => {
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
      name: updatedAddress?.name || '',
      recipientName: updatedAddress?.recipientName || '',
      roadAddress: updatedAddress?.roadAddress || '',
      jibunAddress: updatedAddress?.jibunAddress || '',
      detailAddress: updatedAddress?.detailAddress || '',
      phoneNumber: updatedAddress?.phoneNumber || '',
      zonecode: updatedAddress?.zonecode || '',
    },
  });
  const {
    roadAddress,
    jibunAddress,
    name,
    recipientName,
    detailAddress,
    phoneNumber,
    zonecode,
  } = getValues();
  const {addrsQuery, createAddrQuery, updateAddressQuery} = useFunding();
  const onSubmit = async (data: Omit<ShippingInfo, 'id' | 'isDefault'>) => {
    await createAddrQuery({...data, isDefault: checked});
    setLeftPressed(true);
  };
  const onUpdateSubmit = async () => {
    await updateAddressQuery({
      data: {
        roadAddress,
        jibunAddress,
        name,
        recipientName,
        detailAddress,
        phoneNumber,
        zonecode,
        isDefault: checked,
      },
      id: updatedAddress!.id,
    });
    setUpdatedAddress(null);
    setLeftPressed(true);
  };
  useEffect(() => {
    if (addrsQuery && addrsQuery.length < 1) {
      setChecked(true);
      setDisabled(true);
    }
    if (updatedAddress && updatedAddress.isDefault) {
      setChecked(true);
      setDisabled(true);
    }
  }, [addrsQuery, updatedAddress]);
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
              placeholder="배송지명을 입력해주세요. ex)우리집"
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
                  message: '010으로 시작하는 모바일 번호만 가능해요.',
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
              className="relative w-[312px] h-[56px] flex justify-center placeholder:text-[#858585] bg-Gray-02 border-[1px] border-[#D9D9D9] rounded-md text-Body-1"
              onPress={() => setOnPostModal(true)}>
              <Controller
                control={control}
                rules={{required: '주소를 검색해주세요🚚'}}
                render={({field: {onBlur, value}}) => (
                  <TextInput
                    editable={false}
                    className="placeholder:text-[#858585] text-Body-1 mt-3 absolute px-3"
                    placeholder="주소 검색하기"
                    onBlur={onBlur}
                    value={value}
                  />
                )}
                name="roadAddress"
              />
            </Pressable>
            {errors.roadAddress && !roadAddress && (
              <TextRegular
                style="text-red-500 text-sm ml-1"
                title={errors.roadAddress.message}
              />
            )}
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
                        setValue('zonecode', data.zonecode.toString());
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
          <Pressable onPress={() => setChecked(!checked)}>
            <TextRegular
              title="기본 배송지로 등록"
              style="ml-2 text-Gray-08 text-Body-2"
            />
          </Pressable>
        </View>
      </ScrollView>
      <KeyboardAvoidingView className="mb-48 flex justify-end items-center">
        {!updatedAddress && (
          <NextButton
            title="배송지 추가하기"
            onSubmit={onSubmit}
            handleSubmit={handleSubmit}
          />
        )}
        {updatedAddress && (
          <NextButton
            title="배송지 수정하기"
            onSubmit={onUpdateSubmit}
            handleSubmit={handleSubmit}
          />
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default UpdateAddress;
