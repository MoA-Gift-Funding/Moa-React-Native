import React from 'react';
import {Image, Pressable, View} from 'react-native';
import TextSemiBold from '../../../components/text/TextSemiBold';
import TextRegular from '../../../components/text/TextRegular';
import {autoCurrency} from '../../../utils/regex';
import {useNavigation} from '@react-navigation/native';
import {ParticipatedFundItem} from '../../../types/Funding';

const ParticipatedFund = ({item}: {item: ParticipatedFundItem}) => {
  const {
    fundingId,
    title,
    status,
    productImageUrl,
    participatedDate,
    participateStatus,
    nickName,
    amount,
  } = item;
  const navigation = useNavigation();
  return (
    <View className="py-6 flex items-center border-b-2 border-Gray-02">
      <Pressable
        className="mb-1 w-[314px]"
        onPress={() => navigation.navigate('FundDetail', {id: fundingId})}>
        <View className="flex flex-row justify-between items-center">
          <TextSemiBold
            title={participatedDate.substring(0, 10)}
            style="text-Body-2"
          />
          {status === 'PROCESSING' ? (
            <View className="bg-Sub-01 rounded-xl px-2 h-[22px] flex flex-col justify-center items-center">
              <TextRegular title="펀딩중" style="text-Body-2 text-Main-01" />
            </View>
          ) : (
            <View className="bg-Gray-02 rounded-xl px-2 h-[22px] flex flex-col justify-center items-center">
              <TextRegular title="펀딩종료" style="text-Body-2 text-Gray-06" />
            </View>
          )}
        </View>
        <View className="flex flex-row items-center my-2">
          <Image
            source={{
              uri: productImageUrl,
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
              <TextRegular title={nickName} style="text-Detail-1 ml-1" />
              <TextRegular title="에게 " style="text-Detail-1" />
              <TextSemiBold
                title={`${autoCurrency(amount)}원`}
                style="text-Main-01 text-Detail-1"
              />
              <TextRegular title=" 펀딩했어요" style="text-Detail-1" />
            </View>
          </View>
        </View>
      </Pressable>
      {status === 'PROCESSING' && (
        <Pressable className="flex items-center justify-center bg-Gray-02 w-[314px] h-[56px] rounded-lg">
          <TextRegular title="취소 요청" style="text-Gray-08" />
        </Pressable>
      )}
    </View>
  );
};

export default ParticipatedFund;
