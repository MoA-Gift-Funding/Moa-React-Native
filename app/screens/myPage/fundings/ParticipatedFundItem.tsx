import React, {useCallback} from 'react';
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
    fundingParticipantId,
  } = item;
  const navigation = useNavigation();

  const isRefundable = useCallback(() => {
    const today = new Date();
    const purchasedDate = new Date(participatedDate);
    const timeDiff = today.getTime() - purchasedDate.getTime();
    const days = Math.round(timeDiff / (1000 * 3600 * 24));
    if (days < 8) {
      return true;
    }
    return false;
  }, [participatedDate]);

  return (
    <View className="py-5 flex items-center border-b-2 border-Gray-02">
      <Pressable
        className="mb-1 w-[314px]"
        onPress={() => navigation.navigate('FundDetail', {id: fundingId})}>
        {participateStatus === 'PARTICIPATING' ? (
          <>
            <View className="flex flex-row justify-between items-center">
              <TextSemiBold
                title={participatedDate.substring(0, 10)}
                style="text-Body-2"
              />
              <View className="bg-Sub-01 rounded-xl px-2 h-[22px] flex flex-col justify-center items-center">
                <TextRegular
                  title="결제 완료"
                  style="text-Body-2 text-Main-01"
                />
              </View>
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
            {status === 'PROCESSING' && isRefundable() && (
              <Pressable className="flex items-center justify-center bg-Gray-02 w-[314px] h-[56px] rounded-lg">
                <TextRegular title="취소 요청" style="text-Gray-08" />
              </Pressable>
            )}
          </>
        ) : (
          <>
            <View className="flex flex-row justify-between items-center">
              <TextSemiBold
                title={participatedDate.substring(0, 10)}
                style="text-Body-2"
              />
              <View className="bg-Gray-02 rounded-xl px-2 h-[22px] flex flex-col justify-center items-center">
                <TextRegular
                  title="결제 취소"
                  style="text-Body-2 text-Gray-06"
                />
              </View>
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
                  <TextRegular title="에게 펀딩한 " style="text-Detail-1" />
                  <TextSemiBold
                    title={`${autoCurrency(amount)}원`}
                    style="text-Main-01 text-Detail-1"
                  />
                  <TextRegular title="이 취소되었어요" style="text-Detail-1" />
                </View>
              </View>
            </View>
          </>
        )}
      </Pressable>
    </View>
  );
};

export default ParticipatedFund;
