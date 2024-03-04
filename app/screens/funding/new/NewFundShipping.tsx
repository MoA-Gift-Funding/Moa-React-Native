import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  Pressable,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useForm} from 'react-hook-form';
import NextButton from '../../../components/button/NextButton';
import LoadingBar from '../../../components/bar/LoadingBar';
import SideToggle from '../../../components/button/SideToggle';
import UpdateAddress from '../address/UpdateAddress';
import useFunding from '../../../hooks/fundings/useFunding';
import TextRegular from '../../../components/text/TextRegular';
import {ShippingInfo} from '../../../types/Funding';
import AddressItem from '../address/AddressItem';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';

const NewFundShipping = ({navigation, route}) => {
  const {productId, title, description, endDate, maximumAmount} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [leftPressed, setLeftPressed] = useState(true);
  const [selectedAddr, setSelectedAddr] = useState(0);
  const [deliveryRequestMessage, setDeliveryRequestMessage] = useState('');
  const [toggled, setToggled] = useState(false);
  const [updatedAddress, setUpdatedAddress] = useState<ShippingInfo | null>(
    null,
  );

  const {handleSubmit} = useForm();
  const {addrsQuery, createFundingQuery} = useFunding();

  useEffect(() => {
    if (addrsQuery && addrsQuery.length < 1) {
      setLeftPressed(false);
    }
    if (addrsQuery && addrsQuery.length > 0) {
      setSelectedAddr(addrsQuery.find(addr => addr.isDefault).id);
    }
  }, [addrsQuery]);

  const onSubmit = async () => {
    if (addrsQuery.length === 0) {
      return;
    }
    try {
      setIsLoading(true);
      createFundingQuery({
        productId,
        title,
        description,
        endDate,
        maximumAmount,
        deliveryAddressId: selectedAddr,
        deliveryRequestMessage: deliveryRequestMessage || '배송 전 연락주세요',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="px-6 bg-white h-full flex flex-col justify-between">
        {isLoading && <LoadingBar />}
        <View>
          <SideToggle
            leftTxt="기존 배송지"
            rightTxt="신규 입력"
            state={leftPressed}
            onPress={setLeftPressed}
          />
          {addrsQuery && leftPressed && (
            <View className="flex">
              {addrsQuery.length < 1 && (
                <TextRegular
                  title="신규 입력으로 배송지를 등록해주세요🚚"
                  style="text-Body-1 leading-Body-1 text-center text-Gray-08 mt-10"
                />
              )}
              <View>
                {addrsQuery.length > 0 && (
                  <>
                    {addrsQuery
                      .filter((addr: ShippingInfo) => addr.id === selectedAddr)
                      .map((addr: ShippingInfo) => (
                        <AddressItem
                          item={addr}
                          key={addr.id}
                          selected={selectedAddr}
                          onPress={setSelectedAddr}
                          setToggled={setToggled}
                          setLeftPressed={setLeftPressed}
                          setUpdatedAddress={setUpdatedAddress}
                        />
                      ))}
                    <TextInput
                      className="border border-Gray-05 rounded-lg h-[42px] px-3 -mt-2 mb-4"
                      placeholder="배송시 요청사항을 입력해주세요."
                      onChangeText={setDeliveryRequestMessage}
                    />
                  </>
                )}
                {toggled && (
                  <ScrollView className="h-[300px]">
                    {addrsQuery.length > 0 &&
                      addrsQuery
                        .filter(
                          (addr: ShippingInfo) => addr.id !== selectedAddr,
                        )
                        .map((addr: ShippingInfo) => (
                          <AddressItem
                            item={addr}
                            key={addr.id}
                            selected={selectedAddr}
                            onPress={setSelectedAddr}
                            setToggled={setToggled}
                            setLeftPressed={setLeftPressed}
                            setUpdatedAddress={setUpdatedAddress}
                          />
                        ))}
                  </ScrollView>
                )}
              </View>
              {addrsQuery && addrsQuery.length > 1 && (
                <Pressable
                  className="flex flex-row items-center justify-center mt-4"
                  onPress={() => setToggled(!toggled)}>
                  {!toggled && (
                    <>
                      <TextRegular
                        title="다른 배송지 펼쳐보기"
                        style="text-Gray-06 w-[120px]"
                      />
                      <FontAwesomeIcon icon={faAngleDown} color="#9E9E9E" />
                    </>
                  )}
                  {toggled && (
                    <>
                      <TextRegular
                        title="다른 배송지 접기"
                        style="text-Gray-06 w-[100px]"
                      />
                      <FontAwesomeIcon icon={faAngleUp} color="#9E9E9E" />
                    </>
                  )}
                </Pressable>
              )}
            </View>
          )}
          {!leftPressed && (
            <UpdateAddress
              setLeftPressed={setLeftPressed}
              updatedAddress={updatedAddress}
              setUpdatedAddress={setUpdatedAddress}
            />
          )}
        </View>
        {leftPressed && (
          <View className="mb-8 flex justify-center items-center">
            <NextButton
              title="펀딩 개설하기"
              onSubmit={onSubmit}
              handleSubmit={handleSubmit}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default NewFundShipping;
