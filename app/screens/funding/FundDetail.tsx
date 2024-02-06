import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  Share,
  View,
} from 'react-native';
import LoadingBar from '../../components/bar/LoadingBar';
import cls from 'classnames';
import TextSemiBold from '../../components/text/TextSemiBold';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronDown, faChevronUp} from '@fortawesome/free-solid-svg-icons';
import TextRegular from '../../components/text/TextRegular';
import {useForm} from 'react-hook-form';
import FundDesc from './FundDesc';
import FundMessage from './FundMessage';
import useFunding from '../../hooks/useFunding';
import {FundDetailItem} from '../../types/Funding';
import {useUserContext} from '../../contexts/UserContext';

const FundDetail = ({navigation, route}) => {
  const {id} = route.params;
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState(true);
  const [message, setMessage] = useState(false);
  const [caution, setCaution] = useState(true);
  const {
    userState: {user},
  } = useUserContext();
  const [data, setData] = useState<FundDetailItem>({
    id: 1,
    memberId: 1,
    title: '나의 에어팟 펀딩',
    description:
      '다들 모여랏! 나에게 에어팟 맥스를 선물해 줄 기회! 기프티콘 줄거면 펀딩해주셈!',
    endDate: '2024-02-04',
    maximumAmount: 50000,
    remainAmount: 140000,
    fundingRate: 56,
    status: '진행중',
    fundedAmount: 50000,
    participationCount: 17,
    productImageUrl: 'https://imageurl.example',
    message: [
      {
        nickName: '주노',
        profileImageUrl: 'https://example.com',
        message: '형님이 보태준다',
        createAt: '2024-02-06T15:12:59.034Z',
      },
    ],
  });
  const handleSelection = () => {
    setDesc(!desc);
    setMessage(!message);
  };
  const {fundDetailQuery} = useFunding();
  const {handleSubmit} = useForm();
  useEffect(() => {
    const getFundDetail = async () => {
      const fund = await fundDetailQuery(id);
      setData(fund);
    };
    getFundDetail();
  }, [fundDetailQuery, id]);

  const {
    title,
    endDate,
    status,
    memberId,
    fundingRate,
    productImageUrl,
    description,
  } = data;

  return (
    <ScrollView className="flex flex-col" showsVerticalScrollIndicator={false}>
      {loading && <LoadingBar />}
      <Image
        className="w-[360px] h-[360px]"
        source={{
          uri: productImageUrl,
        }}
      />
      <FundDesc
        userName={user?.nickname}
        title={title}
        deadline={endDate}
        fundRate={fundingRate}
      />
      <View className="mt-4 bg-white flex flex-col items-center">
        <View className="w-full flex flex-row justify-center border-b-[1px] border-b-Gray-03">
          <Pressable
            className={cls(
              'w-[156px] h-[48px] flex items-center justify-center',
              {'border-b-Main-01 border-b-2': desc},
            )}
            onPress={handleSelection}>
            <TextSemiBold title="소개글" style="text-Gray-10" />
          </Pressable>
          <Pressable
            className={cls(
              'w-[156px] h-[48px] flex items-center justify-center',
              {'border-b-Main-01 border-b-2': message},
            )}
            onPress={handleSelection}>
            <TextSemiBold title="메세지" style="text-Gray-10" />
          </Pressable>
        </View>
        <View className="w-full py-6">
          {desc && (
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
          {message && (
            <View>
              <FundMessage
                message={
                  '경민아 결혼 축하해 행복하게 살아랏! 오늘 파티하자요~ 도움이 되는 선물이었으면 좋겠다!'
                }
                name="루피"
                profileImage="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703225044/moa-loopy_kpoquw.png"
                createdAt="2023-12-30T00:00:00"
              />
              <FundMessage
                message={'잘살아라'}
                name="주먹왕랄프"
                profileImage="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703079069/moa-profile_tl4ilu.png"
                createdAt="2023-12-20T00:00:00"
              />
              <FundMessage
                message={
                  '경민아 결혼 축하해 행복하게 살아랏! 오늘 파티하자요~ 도움이 되는 선물이었으면 좋겠다!'
                }
                name="수지"
                profileImage="https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703225044/moa-suzy_ukhrxz.png"
                createdAt="2023-12-14T00:00:00"
              />
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
