import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {useForm} from 'react-hook-form';
import NextButton from '../../components/button/NextButton';
import LoadingBar from '../../components/bar/LoadingBar';
import SideToggle from '../../components/button/SideToggle';
import MyAddress from './address/MyAddress';
import UpdateAddress from './address/UpdateAddress';
import useFunding from '../../hooks/useFunding';

const NewFundShipping = ({navigation, route}) => {
  const {deadline, description, upperPriceLimit, title, id} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const {addrsQuery} = useFunding();
  const [leftPressed, setLeftPressed] = useState(true);
  useEffect(() => {
    if (addrsQuery && addrsQuery.length < 1) {
      setLeftPressed(false);
    }
  }, [addrsQuery]);
  const {handleSubmit} = useForm({
    defaultValues: {
      recipientName: '',
      roadAddress: '',
      detailedAddress: '',
      phoneNumber: '',
      zonecode: 0,
    },
  });
  const onSubmit = async () => {
    setIsLoading(true);
    try {
      if (result.status === 'OK') {
        return navigation.navigate('FundCompleted');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="px-6 bg-white h-full flex flex-col"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      {isLoading && <LoadingBar />}
      <SideToggle
        leftTxt="기존 배송지"
        rightTxt="신규 입력"
        state={leftPressed}
        onPress={setLeftPressed}
      />
      {leftPressed && <MyAddress />}
      {!leftPressed && <UpdateAddress />}
      {/* </ScrollView> */}
      {/* <KeyboardAvoidingView className="mb-8 flex justify-center items-center">
        <NextButton
          title="펀딩 개설하기"
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
        />
      </KeyboardAvoidingView> */}
    </KeyboardAvoidingView>
  );
};

export default NewFundShipping;
