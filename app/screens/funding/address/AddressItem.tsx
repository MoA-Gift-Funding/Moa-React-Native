import React, {Dispatch, SetStateAction} from 'react';
import {Pressable, View} from 'react-native';
import TextBold from '../../../components/text/TextBold';
import {ShippingInfo} from '../../../types/Funding';
import TextRegular from '../../../components/text/TextRegular';
import TextSemiBold from '../../../components/text/TextSemiBold';
import useFunding from '../../../hooks/fundings/useFunding';
import {throttle} from '../../../utils/device';

const AddressItem = ({
  item,
  selected,
  onPress,
  setToggled,
  setLeftPressed,
  setUpdatedAddress,
}: {
  item: ShippingInfo;
  selected: number;
  onPress: Dispatch<SetStateAction<number>>;
  setToggled: Dispatch<SetStateAction<boolean>>;
  setLeftPressed: Dispatch<SetStateAction<boolean>>;
  setUpdatedAddress: Dispatch<SetStateAction<ShippingInfo | null>>;
}) => {
  const {
    id,
    name,
    recipientName,
    jibunAddress,
    roadAddress,
    detailAddress,
    phoneNumber,
    zonecode,
    isDefault,
  } = item;

  const {deleteAddressQuery} = useFunding();
  const handleUpdateBtn = () => {
    setUpdatedAddress(item);
    setLeftPressed(false);
  };
  const handleDeleteBtn = () => {
    deleteAddressQuery(id);
  };

  return (
    <View className="flex flex-row items-center w-[360px]">
      <Pressable
        className="w-4 h-4 rounded-full border border-Gray-06 flex justify-center items-center"
        onPress={throttle(() => {
          onPress(id);
          setToggled(false);
        }, 1000)}>
        {selected === id && (
          <View className="bg-Main-01 w-4 h-4 rounded-full flex justify-center items-center">
            <View className="bg-white w-2 h-2 rounded-full" />
          </View>
        )}
      </Pressable>
      <View className="flex flex-col py-5 ml-3">
        <View className="flex flex-row items-center mb-2 justify-between w-[300px]">
          <View className="flex flex-row items-center">
            <TextBold title={name} style="text-Body-2" />
            <TextRegular title=" / " style="text-Body-2" />
            <TextBold title={recipientName} style="text-Body-2" />
            {isDefault && <TextSemiBold title=" (기본)" style="text-Main-01" />}
          </View>
          <View className="flex flex-row items-center">
            <Pressable
              className="bg-Sub-01 rounded-full px-2 py-1"
              onPress={throttle(handleUpdateBtn, 1000)}>
              <TextSemiBold title="수정" style="text-Main-01 text-Detail-1" />
            </Pressable>
            {!isDefault && (
              <Pressable
                className="bg-Gray-02 rounded-full px-2 py-1 ml-1"
                onPress={throttle(handleDeleteBtn, 1000)}>
                <TextSemiBold title="삭제" style="text-Gray-06 text-Detail-1" />
              </Pressable>
            )}
          </View>
        </View>
        <View className="flex flex-row items-center">
          <TextSemiBold title={`(${zonecode})`} style="text-Body-2" />
          <View className="flex flex-col ml-2">
            {roadAddress && (
              <TextRegular
                title={`${roadAddress} ${detailAddress}`}
                style="text-Body-2 w-[220px]"
                numberOfLines={2}
              />
            )}
            {!roadAddress && (
              <TextRegular
                title={`${jibunAddress} ${detailAddress}`}
                style="text-Body-2 w-[220px]"
                numberOfLines={2}
              />
            )}
          </View>
        </View>
        <TextRegular title={phoneNumber} style="mt-1" />
      </View>
    </View>
  );
};

export default AddressItem;
