import React, {useCallback, useState} from 'react';
import {Alert, Image, Pressable, View} from 'react-native';
import TextSemiBold from '../../../components/text/TextSemiBold';
import TextRegular from '../../../components/text/TextRegular';
import {autoCurrency, isRefundable} from '../../../utils/regex';
import {useNavigation} from '@react-navigation/native';
import {ParticipatedFundItem} from '../../../types/Funding';
import useFunding from '../../../hooks/fundings/useFunding';
import LoadingBar from '../../../components/bar/LoadingBar';
import {throttle} from '../../../utils/device';

const ParticipatedFund = ({item}: {item: ParticipatedFundItem}) => {
  const {
    fundingId,
    title,
    status,
    productImageUrl,
    participatedDate,
    participantStatus,
    nickName,
    amount,
    fundingParticipantId,
    endDate,
  } = item;
  const navigation = useNavigation();

  const isWithin7days = useCallback(() => {
    const refundable = isRefundable(participatedDate);
    return refundable;
  }, [participatedDate]);

  const [isLoading, setIsLoading] = useState(false);
  const {cancelParticipatedFundQuery} = useFunding();
  const handleCancelBtn = async () => {
    Alert.alert(
      '펀딩 참여를 취소하시겠어요?',
      '결제 취소는 3-5 영업일이 소요될 예정입니다.',
      [
        {
          text: '닫기',
        },
        {
          text: '펀딩 취소',
          onPress: async () => {
            try {
              setIsLoading(true);
              await cancelParticipatedFundQuery({
                id: fundingId,
                fundingParticipantId,
              });
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
    );
  };

  return (
    <View className="py-5 flex items-center">
      {isLoading && <LoadingBar />}
      <Pressable
        className="w-[314px]"
        onPress={throttle(
          () =>
            navigation.navigate('FundDetail', {id: fundingId, title, endDate}),
          1000,
        )}>
        {participantStatus === 'PARTICIPATING' ? (
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
      {status === 'PROCESSING' &&
        participantStatus === 'PARTICIPATING' &&
        isWithin7days() && (
          <Pressable
            className="flex items-center justify-center bg-Gray-02 w-[314px] h-[44px] rounded-lg"
            onPress={throttle(handleCancelBtn, 1000)}>
            <TextRegular title="취소 요청" style="text-Gray-08" />
          </Pressable>
        )}
    </View>
  );
};

export default ParticipatedFund;
