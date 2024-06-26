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
import {makeDynamicLink, throttle} from '../../../utils/device';

export default function FundDetailScreen({navigation, route}) {
  const {id, title, endDate} = route.params;
  const [leftSelected, setLeftSelected] = useState(true);
  const [msgUpdated, setMsgUpdated] = useState(false);
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
    status: 'COMPLETE',
    fundedAmount: 0,
    participationCount: 0,
    productImageUrl: 'https://',
    participants: [
      {
        messageId: 0,
        memberId: 0,
        nickName: '',
        profileImageUrl: '',
        message: '',
        createAt: '',
        visibility: 'PUBLIC',
      },
    ],
  });

  const {fundDetailQuery, FundPolicyQuery} = useFunding();

  useEffect(() => {
    const getFundDetail = async () => {
      const fund = await fundDetailQuery(id);
      setData({
        ...fund,
      });
      setMsgUpdated(false);
    };
    getFundDetail();
  }, [fundDetailQuery, id, msgUpdated]);

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
        <View className="flex items-center">
          <Image
            className="w-full h-[360px]"
            source={{
              uri: productImageUrl,
            }}
          />
        </View>
        <FundDesc
          id={id}
          userName={nickName}
          title={data.title}
          endDate={data.endDate}
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
              <View className="min-h-[150px] pb-10">
                {participants.length > 0 &&
                  participants.map(msg => (
                    <FundMessage
                      key={msg.messageId}
                      messageId={msg.messageId}
                      memberId={msg.memberId}
                      message={msg.message}
                      nickName={msg.nickName}
                      profileImageUrl={msg.profileImageUrl}
                      createAt={msg.createAt}
                      visibility={msg.visibility}
                      setMsgUpdated={setMsgUpdated}
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
                  {FundPolicyQuery &&
                    FundPolicyQuery.map((policy, index) => (
                      <View key={policy.title + index}>
                        <TextRegular
                          title={`▶ ${policy.title}`}
                          style="text-Body-2 text-Gray-06 w-[312px] leading-Body-2"
                        />
                        {policy.content.map((text, index) => (
                          <TextRegular
                            key={index}
                            title={`· ${text}`}
                            style="text-Body-2 text-Gray-06 w-[312px] leading-Body-2"
                          />
                        ))}
                      </View>
                    ))}
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
            onPress={throttle(async () => {
              const dynamicUrl = await makeDynamicLink('FundDetailScreen', id);
              Platform.select({
                ios: Share.share({
                  url: dynamicUrl,
                  message: `${nickName}님의 선물 펀딩이예요!`,
                }),
                android: Share.share({
                  title: `${nickName}님의 선물 펀딩이예요!`,
                  message: dynamicUrl,
                }),
              });
            }, 1000)}>
            <TextSemiBold title="공유" style="text-white text-Body-1" />
          </Pressable>
          {memberId !== user?.id && (
            <Pressable
              className="h-[56px] w-[234px] bg-Main-01 rounded-lg flex items-center justify-center"
              onPress={() =>
                navigation.navigate('JoinFundScreen', {
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
                navigation.navigate('JoinFundPayScreen', {
                  price: remainAmount,
                  id,
                  title: data.title,
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
}
