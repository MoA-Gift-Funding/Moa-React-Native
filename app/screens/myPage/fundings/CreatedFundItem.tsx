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
    <View className="py-5 border-b-2 border-Gray-02 flex items-center">
      <Pressable
        className="mb-1 w-[314px]"
        onPress={() => navigation.navigate('FundDetail', {id})}>
        <View className="flex flex-row justify-between items-center">
          <TextSemiBold title={endDate} style="text-Body-2" />
          {status === 'PROCESSING' && <ColoredFundLabel label="펀딩중" />}
          {status === 'COMPLETE' && <GrayFundLabel label="펀딩 달성" />}
          {status === 'CANCELLED' && <GrayFundLabel label="펀딩 취소" />}
          {status === 'STOPPED' && <GrayFundLabel label="상품 중단" />}
          {status === 'EXPIRED' && <GrayFundLabel label="펀딩 만료" />}
        </View>
        <View className="flex flex-row items-center mt-2">
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
      {status === 'PROCESSING' && (
        <Pressable className="w-[314px] h-[44px] flex justify-center items-center bg-Gray-02 rounded-lg">
          <TextRegular title="펀딩 취소하기" style="text-Gray-06 text-center" />
        </Pressable>
      )}
      {/* {status === 'WAITING_ORDER' && <AcquireGiftButton />} */}
    </View>
  );
};

export default CreatedFundItem;
