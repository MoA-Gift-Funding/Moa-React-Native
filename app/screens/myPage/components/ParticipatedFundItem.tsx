import React from 'react';
import {Image, Pressable, View} from 'react-native';
import TextSemiBold from '../../../components/text/TextSemiBold';
import {ParticipatedFund} from '../../../types/Funding';
import TextRegular from '../../../components/text/TextRegular';
import {autoCurrency} from '../../../utils/regex';
import {useNavigation} from '@react-navigation/native';

const ParticipatedFundItem = ({item}: {item: ParticipatedFund}) => {
  const {id, title, activated, productImage, paidDate, price, name} = item;
  const navigation = useNavigation();
  return (
    <Pressable
      className="py-6 border-b-2 border-Gray-02"
      onPress={() => {
        activated === 'Y' && navigation.navigate('FundDetail', {id});
      }}>
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-row">
          <TextRegular title="[결제 일자]" style="text-Body-2" />
          <TextSemiBold title={paidDate} style="text-Body-2 ml-2" />
        </View>
        {activated === 'Y' ? (
          <View className="bg-Sub-01 rounded-xl px-2 h-[22px] flex flex-col justify-center items-center">
            <TextRegular title="펀딩중" style="text-Body-2 text-Main-01" />
          </View>
        ) : (
          <View className="bg-Gray-02 rounded-xl px-2 h-[22px] flex flex-col justify-center items-center">
            <TextRegular title="펀딩종료" style="text-Body-2 text-Gray-06" />
          </View>
        )}
      </View>
      <View className="flex flex-row items-center mt-2">
        <Image
          source={{
            uri: productImage,
          }}
          width={70}
          height={70}
          className="rounded-md"
        />
        <View className="ml-3">
          <TextRegular title={title} style="text-Detail-1" />
          <View className="flex flex-row mt-2 items-center">
            <Image
              source={{
                uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1704288414/moa-gift-icon_r9mnc2.png',
              }}
              className="rounded-md w-[12px] h-[12px]"
            />
            <TextRegular title={name} style="text-Detail-1 ml-1" />
            <TextRegular title="에게 " style="text-Detail-1" />
            <TextSemiBold
              title={`${autoCurrency(price)}원`}
              style="text-Main-01 text-Detail-1"
            />
            <TextRegular title=" 펀딩했어요" style="text-Detail-1" />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ParticipatedFundItem;
