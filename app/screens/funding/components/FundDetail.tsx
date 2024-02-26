import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  Share,
  View,
} from 'react-native';
import cls from 'classnames';
import TextSemiBold from '../../../components/text/TextSemiBold';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import TextRegular from '../../../components/text/TextRegular';
import FundDesc from './FundDesc';
import FundMessage from './FundMessage';
import useFunding from '../../../hooks/fundings/useFunding';
import {FundDetailItem} from '../../../types/Funding';
import {useUserContext} from '../../../contexts/UserContext';

const FundDetail = ({navigation, route}) => {
  const {id, title, endDate} = route.params;
  const [leftSelected, setLeftSelected] = useState(true);
  const [caution, setCaution] = useState(true);
  const {
    userState: {user},
  } = useUserContext();
  const [data, setData] = useState<FundDetailItem>({
    id: 0,
    nickName: '',
    memberId: 0,
    title,
    description: '',
    endDate,
    maximumAmount: 0,
    remainAmount: 0,
    fundingRate: 0,
    status: 'PROCESSING',
    fundedAmount: 0,
    participationCount: 0,
    productImageUrl: '',
    participants: [
      {
        id: 0,
        memberId: 0,
        nickName: '',
        profileImageUrl: '',
        message: '',
        createAt: '',
      },
    ],
  });

  const {fundDetailQuery} = useFunding();

  useEffect(() => {
    const getFundDetail = async () => {
      const fund = await fundDetailQuery(id);
      setData({
        ...fund,
      });
    };
    getFundDetail();
  }, [fundDetailQuery, id]);

  const {
    nickName,
    fundingRate,
    productImageUrl,
    description,
    participants,
    memberId,
    maximumAmount,
    remainAmount,
    status,
  } = data;

  return (
    <>
      <ScrollView
        className="flex flex-col"
        showsVerticalScrollIndicator={false}>
        <Image
          className="w-[360px] h-[360px]"
          source={{
            uri: productImageUrl,
          }}
        />
        <FundDesc
          id={id}
          userName={nickName}
          title={title}
          endDate={endDate}
          fundingRate={fundingRate}
          status={status}
        />
        <View className="mt-4 bg-white flex flex-col items-center">
          <View className="w-full flex flex-row justify-center border-b-[1px] border-b-Gray-03">
            <Pressable
              className={cls(
                'w-[156px] h-[48px] flex items-center justify-center',
                {'border-b-Main-01 border-b-2': leftSelected},
              )}
              onPress={() => setLeftSelected(true)}>
              <TextSemiBold title="소개글" style="text-Gray-10" />
            </Pressable>
            <Pressable
              className={cls(
                'w-[156px] h-[48px] flex items-center justify-center',
                {'border-b-Main-01 border-b-2': !leftSelected},
              )}
              onPress={() => setLeftSelected(false)}>
              <TextSemiBold title="메세지" style="text-Gray-10" />
            </Pressable>
          </View>
          <View className="w-full py-6">
            {leftSelected && (
              <View className="mt-2 min-h-[150px] pb-10 mx-6">
                <TextRegular
                  title={description}
                  style="text-Gray-08 text-Body-2 leading-Body-2"
                />
              </View>
            )}
            {!leftSelected && (
              <View>
                {participants.length > 0 &&
                  participants.map(msg => (
                    <FundMessage
                      key={msg.id}
                      id={msg.id}
                      message={msg.message}
                      nickName={msg.nickName}
                      profileImageUrl={msg.profileImageUrl}
                      createAt={msg.createAt}
                    />
                  ))}
                {participants.length < 1 && (
                  <View className="min-h-[150px] pb-12">
                    <TextRegular
                      title="선물 펀딩하기로 친구에게 메세지를 남겨보세요🎁"
                      style="text-center mt-4"
                    />
                  </View>
                )}
              </View>
            )}
            <Pressable
              className="w-full border-y-[1px] border-Gray-02 flex items-center"
              onPress={() => setCaution(!caution)}>
              <View className="w-[312px] h-[60px] flex flex-row justify-between items-center">
                <TextSemiBold
                  title="펀딩 취소 규정"
                  style="text-Body-2 text-Gray-10"
                />
                <FontAwesomeIcon icon={caution ? faChevronDown : faChevronUp} />
              </View>
              {caution && (
                <View className="w-full bg-Gray-02 flex items-center py-4">
                  <TextRegular
                    title="- 펀딩 참여자의 결제 취소는 펀딩이 종료되기 전까지, 결제일로부터 7일 이내, 마이페이지 펀딩에서 결제 취소가 가능합니다."
                    style="text-Body-2 text-Gray-06 w-[312px] leading-Body-2"
                  />
                  <TextRegular
                    title="- 단, 아래의 경우는 결제 취소가 불가합니다."
                    style="text-Body-2 text-Gray-06 w-[312px] leading-Body-2"
                  />
                  <TextRegular
                    title="- 제품을 사용 또는 훼손한 경우, 사은품 누락, 상품 TAG, 보증서, 상품 부자재가 제거 혹은 분실된 경우 밀봉 포장을 개봉했거나 내부 포장재를 훼손 또는 분실한 경우(단, 제품확인을 위한 개봉 제외), 시간이 경과되어 재판매가 어려울 정도로 상품가치가 상실된 경우, 기타 전자상거래 등에서의 소비자보호에 관한 법률이 정하는 청약철회 제한사유에 해당하는 경우 결제 취소가 불가능합니다."
                    style="text-Body-2 text-Gray-06 w-[312px] leading-Body-2"
                  />
                </View>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
      {status === 'PROCESSING' && (
        <View className="bg-white flex flex-row items-center py-6 px-2 justify-evenly">
          <Pressable
            className="bg-Gray-08 w-[70px] h-[56px] flex items-center justify-center rounded-lg"
            onPress={async () => {
              Platform.OS === 'ios'
                ? Share.share({
                    url: 'https://www.giftmoa.co.kr/',
                    message: '친구의 펀딩이예요!',
                  })
                : Share.share({
                    title: '친구의 펀딩이예요!',
                    message: 'https://www.giftmoa.co.kr/',
                  });
            }}>
            <TextSemiBold title="공유" style="text-white text-Body-1" />
          </Pressable>
          {memberId !== user?.id && (
            <Pressable
              className="h-[56px] w-[234px] bg-Main-01 rounded-lg flex items-center justify-center"
              onPress={() =>
                navigation.navigate('JoinFund', {
                  maximumAmount,
                  remainAmount,
                  id,
                  title,
                  nickName,
                })
              }>
              <TextSemiBold
                style="text-white text-Body-1 ml-[14px]"
                title="선물 펀딩하기"
              />
            </Pressable>
          )}
          {memberId === user?.id && (
            <Pressable
              className="h-[56px] w-[234px] bg-Main-01 rounded-lg flex items-center justify-center"
              onPress={() =>
                navigation.navigate('JoinFundPay', {
                  price: remainAmount,
                  id,
                  title,
                  nickName,
                  isFundOwner: true,
                })
              }>
              <TextSemiBold
                style="text-white text-Body-1 ml-[14px]"
                title="펀딩 채우기"
              />
            </Pressable>
          )}
        </View>
      )}
    </>
  );
};

export default FundDetail;
