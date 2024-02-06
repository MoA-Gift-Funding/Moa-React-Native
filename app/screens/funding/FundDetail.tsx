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
import TextSemiBold from '../../components/text/TextSemiBold';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import TextRegular from '../../components/text/TextRegular';
import FundDesc from './FundDesc';
import FundMessage from './FundMessage';
import useFunding from '../../hooks/useFunding';
import {FundDetailItem} from '../../types/Funding';
import {useUserContext} from '../../contexts/UserContext';

const FundDetail = ({navigation, route}) => {
  const {id} = route.params;
  const [leftSelected, setLeftSelected] = useState(true);
  const [caution, setCaution] = useState(true);
  const {
    userState: {user},
  } = useUserContext();
  const [data, setData] = useState<FundDetailItem>({
    id: 0,
    memberId: 0,
    title: '',
    description: '',
    endDate: '',
    maximumAmount: 0,
    remainAmount: 0,
    fundingRate: 0,
    status: '',
    fundedAmount: 0,
    participationCount: 0,
    productImageUrl: '',
    message: [
      {
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
        productImageUrl:
          'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1707260796/moa_testimg_zcylnl.jpg',
      });
    };
    getFundDetail();
  }, [fundDetailQuery, id]);

  const {title, endDate, fundingRate, productImageUrl, description} = data;

  return (
    <ScrollView className="flex flex-col" showsVerticalScrollIndicator={false}>
      <Image
        className="w-[360px] h-[360px]"
        source={{
          uri: productImageUrl,
        }}
      />
      <FundDesc
        userName={user?.nickname}
        title={title}
        endDate={endDate}
        fundingRate={fundingRate}
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
            <>
              <View className="pb-4 mx-6">
                <TextRegular
                  title={description}
                  style="text-Gray-06 text-Body-2 leading-Body-2"
                />
              </View>
              <Pressable
                className="w-full border-y-[1px] border-Gray-02 flex items-center"
                onPress={() => setCaution(!caution)}>
                <View className="w-[312px] h-[60px] flex flex-row justify-between items-center">
                  <TextSemiBold
                    title="펀딩 취소 규정"
                    style="text-Body-2 text-Gray-10"
                  />
                  <FontAwesomeIcon
                    icon={caution ? faChevronDown : faChevronUp}
                  />
                </View>
                {caution && (
                  <View className="w-full bg-Gray-02 flex items-center py-4">
                    <TextRegular
                      title="- 취소 안돼"
                      style="text-Body-2 text-Gray-06 w-[312px] leading-Body-2"
                    />
                    <TextRegular
                      title="- 하지마요"
                      style="text-Body-2 text-Gray-06 w-[312px] leading-Body-2"
                    />
                    <TextRegular
                      title="- 수수료 나와요"
                      style="text-Body-2 text-Gray-06 w-[312px] leading-Body-2"
                    />
                  </View>
                )}
              </Pressable>
            </>
          )}
          {!leftSelected && (
            <View>
              {data.message.length > 0 &&
                data.message.map(msg => (
                  <FundMessage
                    message={msg.message}
                    name={msg.nickName}
                    profileImage={msg.profileImageUrl}
                    createdAt={msg.createAt}
                  />
                ))}
              {data.message.length < 1 && (
                <TextRegular
                  title="선물 펀딩하고 친구에게 메세지를 남겨보세요🎁"
                  style="text-center mt-4"
                />
              )}
            </View>
          )}
        </View>
      </View>
      <View className="bg-white flex flex-row items-center py-6 px-2 justify-evenly">
        <Pressable
          className="bg-Gray-08 w-[70px] h-[56px] flex items-center justify-center rounded-lg"
          onPress={async () => {
            Platform.OS === 'ios'
              ? Share.share({
                  url: 'https://www.giftmoa.co.kr/',
                  message: '이 상품 어때요?',
                })
              : Share.share({
                  title: '이 상품 어때요?',
                  message: 'https://www.giftmoa.co.kr/',
                });
          }}>
          <TextSemiBold title="공유" style="text-white text-Body-1" />
        </Pressable>
        <Pressable
          className={
            'h-[56px] w-[234px] bg-Main-01 rounded-lg flex items-center justify-center'
          }
          onPress={() => navigation.navigate('JoinFund')}>
          <TextSemiBold
            style="text-white text-Body-1 ml-[14px]"
            title="선물 펀딩하기"
          />
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default FundDetail;
