import React, {useEffect, useState} from 'react';
import {Alert, Image, Pressable, View} from 'react-native';
import TextSemiBold from '../../../components/text/TextSemiBold';
import TextRegular from '../../../components/text/TextRegular';
import {FundDetailItem, MyFundItem} from '../../../types/Funding';
import {useNavigation} from '@react-navigation/native';
import useFunding from '../../../hooks/fundings/useFunding';
import LoadingBar from '../../../components/bar/LoadingBar';
import {throttle} from '../../../utils/device';
import NextButton from '../../../components/button/NextButton';
import {useForm} from 'react-hook-form';

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
  const [isLoading, setIsLoading] = useState(false);
  const [detailFund, setDetailFund] = useState<FundDetailItem | undefined>();
  const navigation = useNavigation();
  const {cancelCreatedFundQuery, fundDetailQuery} = useFunding();
  const {handleSubmit} = useForm();

  const handleCancelBtn = async () => {
    Alert.alert(
      '펀딩을 취소하시겠어요?',
      '펀딩에 참여한 모든 참가자들에게 결제 취소가 이루어집니다. 결제 취소는 3-5 영업일이 소요될 예정입니다.',
      [
        {
          text: '펀딩 취소',
          onPress: async () => {
            try {
              setIsLoading(true);
              await cancelCreatedFundQuery(id!);
            } finally {
              setIsLoading(false);
            }
          },
        },
        {
          text: '닫기',
        },
      ],
    );
  };

  useEffect(() => {
    if (id && status === 'EXPIRED') {
      const getDetailedFund = async () => {
        const fund = await fundDetailQuery(id);
        setDetailFund(fund);
      };
      getDetailedFund();
    }
  }, [fundDetailQuery, status, id]);
  return (
    <View className="py-5 border-b-2 border-Gray-02 flex items-center">
      {isLoading && <LoadingBar />}
      <Pressable
        className="mb-1 w-[314px]"
        onPress={() => navigation.navigate('FundDetail', {id, title, endDate})}>
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
        <Pressable
          className="w-[314px] h-[44px] flex justify-center items-center bg-Gray-02 rounded-lg"
          onPress={throttle(handleCancelBtn, 1000)}>
          <TextRegular title="펀딩 취소하기" style="text-Gray-06 text-center" />
        </Pressable>
      )}
      {status === 'STOPPED' && (
        <Pressable
          className="w-[314px] h-[44px] flex justify-center items-center bg-Sub-01 rounded-lg"
          onPress={() => {
            navigation.navigate('CustomerCenter', {
              headerTitle: '고객센터',
              personalInquiry: true,
            });
          }}>
          <TextRegular
            title="상품 중단 문의하기"
            style="text-Main-01 text-center"
          />
        </Pressable>
      )}
      {status === 'EXPIRED' && detailFund && (
        <NextButton
          title="펀딩 채우기"
          onSubmit={() =>
            navigation.navigate('JoinFundPay', {
              price: detailFund.remainAmount,
              id: detailFund.id,
              title: detailFund.title,
              nickName: detailFund.nickName,
              isFundOwner: true,
            })
          }
          handleSubmit={handleSubmit}
        />
      )}
      {/* {status === 'WAITING_ORDER' && <AcquireGiftButton />} */}
    </View>
  );
};

export default CreatedFundItem;
