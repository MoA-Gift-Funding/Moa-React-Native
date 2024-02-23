import React from 'react';
import {Image, Pressable, View} from 'react-native';
import TextSemiBold from '../../../components/text/TextSemiBold';
import TextRegular from '../../../components/text/TextRegular';
import {MyFundItem} from '../../../types/Funding';
import {useNavigation} from '@react-navigation/native';

const ColoredFundLabel = ({label}: {label: string}) => (
  <View className="bg-Sub-01 rounded-xl px-2 h-[22px] flex flex-col justify-center items-center">
    <TextRegular title={label} style="text-Body-2 text-Main-01" />
  </View>
);
const GrayFundLabel = ({label}: {label: string}) => (
  <View className="bg-Gray-02 rounded-xl px-2 h-[22px] flex flex-col justify-center items-center">
    <TextRegular title={label} style="text-Body-2 text-Gray-06" />
  </View>
);

const CancelFundButton = () => (
  <Pressable className="w-[312px] h-[56px] flex justify-center items-center bg-Gray-02 rounded-lg">
    <TextRegular title="펀딩 취소하기" style="text-Gray-06 text-center" />
  </Pressable>
);

const AcquireGiftButton = () => (
  <Pressable className="w-[312px] h-[56px] flex justify-center items-center bg-Main-01 rounded-lg">
    <TextRegular title="상품 수령하기" style="text-white text-center" />
  </Pressable>
);

const CreatedFundItem = ({content}: {content: Partial<MyFundItem>}) => {
  const {
    id,
    title,
    endDate,
    fundingRate,
    status,
    productImageUrl,
    participationCount,
  } = content;
  const navigation = useNavigation();
  return (
    <View className="py-4 border-b-2 border-Gray-02">
      <Pressable onPress={() => navigation.navigate('FundDetail', {id})}>
        <View className="flex flex-row justify-between items-center">
          <TextSemiBold title={endDate} style="text-Body-2" />
          {status === '진행중' && <ColoredFundLabel label="펀딩중" />}
          {status === '수령 대기' && <GrayFundLabel label="수령 대기" />}
        </View>
        <View className="flex flex-row items-center mt-2">
          <Image
            source={{
              uri:
                // productImageUrl ||
                'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703223350/moa-fund-img_n6bsbb.png',
            }}
            width={70}
            height={70}
            className="rounded-md"
          />
          <View className="ml-3">
            <TextRegular title={title} style="text-Detail-1" />
            <View className="flex flex-row mt-2 items-center">
              <TextSemiBold
                title={`${fundingRate}%`}
                style="text-Main-01 text-Detail-1"
              />
              <TextRegular title=" · " style="text-Detail-1" />
              <TextSemiBold
                title={`${participationCount}명`}
                style="text-Detail-1"
              />
              <TextRegular title=" 참여" style="text-Detail-1" />
            </View>
          </View>
        </View>
      </Pressable>
      <View className="mt-3">
        {status === '진행중' && <CancelFundButton />}
        {status === '수령 대기' && <AcquireGiftButton />}
      </View>
    </View>
  );
};

export default CreatedFundItem;
