import React from 'react';
import {Image, Pressable, View} from 'react-native';
import TextSemiBold from '../../../components/text/TextSemiBold';
import TextRegular from '../../../components/text/TextRegular';
import {MyFundItem} from '../../../types/Funding';
import {useNavigation} from '@react-navigation/native';

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
    <Pressable
      className="py-6 border-b-2 border-Gray-02"
      onPress={() => navigation.navigate('FundDetail', {id})}>
      <View className="flex flex-row justify-between items-center">
        <TextSemiBold title={endDate} style="text-Body-2" />
        {status === '진행중' ? (
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
            uri:
              productImageUrl ||
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
  );
};

export default CreatedFundItem;
