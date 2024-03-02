import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  Share,
  View,
} from 'react-native';
import {useUserContext} from '../../contexts/UserContext';
import TextBold from '../../components/text/TextBold';
import Footer from '../../components/footer/Footer';
import HomeBanner from './HomeBanner';
import cls from 'classnames';
import TextSemiBold from '../../components/text/TextSemiBold';
import TextRegular from '../../components/text/TextRegular';
import MyFund from '../funding/components/MyFund';
import FundItem from '../funding/components/FundItem';
import useFunding from '../../hooks/fundings/useFunding';
import {FriendFundItem, MyFundItem} from '../../types/Funding';
import {useRefetchOnFocus} from '../../hooks/handlers/useRefetchOnFocus';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDeviceToken, throttle} from '../../utils/device';

export default function Home({navigation}) {
  const {
    userState: {user},
  } = useUserContext();
  const [activated, setActivated] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const {
    myProcessingFundingsQuery,
    refetchMyProcessingFundingsQuery,
    myCompletedFundingsQuery,
    refetchMyCompletedFundingsQuery,
    friendFundingsQuery,
    refetchFriendFudingQuery,
  } = useFunding(0, 3);
  useRefetchOnFocus(refetchFriendFudingQuery);
  useRefetchOnFocus(refetchMyProcessingFundingsQuery);
  useRefetchOnFocus(refetchMyCompletedFundingsQuery);

  const onRefresh = () => {
    refetchFriendFudingQuery();
    refetchMyProcessingFundingsQuery();
    refetchMyCompletedFundingsQuery();
  };

  const deviceToken = useCallback(getDeviceToken, []);

  useEffect(() => {
    deviceToken();
    const ac = async () =>
      console.log(await AsyncStorage.getItem('accessToken'));
    ac();
  }, [deviceToken]);

  return (
    <>
      <ScrollView
        className="h-full"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <HomeBanner navigation={navigation} />
        <View className="flex flex-row h-[40px] bg-white justify-around border-b-2 border-Gray-02">
          <Pressable
            className={cls({
              'border-b-2 border-Main-01': activated,
              '': !activated,
            })}
            onPress={() => setActivated(true)}>
            <TextBold
              title="진행중"
              style={cls('text-center text-Heading-4', {
                'text-Main-01': activated,
                'text-Gray-06': !activated,
              })}
            />
          </Pressable>
          <Pressable
            onPress={() => setActivated(false)}
            className={cls({
              'border-b-2 border-Main-01': !activated,
              '': activated,
            })}>
            <TextBold
              title="완료"
              style={cls('text-center text-Heading-4', {
                'text-Main-01': !activated,
                'text-Gray-06': activated,
              })}
            />
          </Pressable>
        </View>
        <View className="bg-white flex flex-col py-10 justify-center">
          <View className="flex flex-row justify-between items-center mx-6">
            <TextSemiBold
              title={`${user?.nickname}님의 펀딩`}
              style="text-Heading-4"
            />
            {myProcessingFundingsQuery &&
              myProcessingFundingsQuery.length > 0 && (
                <Pressable
                  onPress={throttle(
                    () =>
                      navigation.navigate('MyFunding', {
                        headerTitle: '펀딩',
                      }),
                    1000,
                  )}>
                  <TextSemiBold
                    title="모두보기 >"
                    style="text-Detail-1 text-Gray-06"
                  />
                </Pressable>
              )}
          </View>
          <ScrollView
            className="py-4 pl-6 flex flex-row"
            horizontal={true}
            showsHorizontalScrollIndicator={true}>
            {myProcessingFundingsQuery && (
              <>
                {myProcessingFundingsQuery.length > 0 &&
                  activated &&
                  myProcessingFundingsQuery.map((fund: MyFundItem) => (
                    <MyFund
                      key={fund.id}
                      item={{
                        ...fund,
                      }}
                    />
                  ))}
                {myProcessingFundingsQuery.length < 1 && activated && (
                  <View className="w-[310px] flex items-center justify-center pt-5 pb-12">
                    <TextRegular
                      title="바로가기를 통해 펀딩을 만들어볼까요?🎁"
                      style="text-Body-2 text-Gray-06 text-center"
                    />
                  </View>
                )}
              </>
            )}
            {myCompletedFundingsQuery && (
              <>
                {myCompletedFundingsQuery.length > 0 &&
                  !activated &&
                  myCompletedFundingsQuery.map((fund: MyFundItem) => (
                    <MyFund
                      key={fund.id}
                      item={{
                        ...fund,
                      }}
                    />
                  ))}
                {myCompletedFundingsQuery.length < 1 && !activated && (
                  <View className="w-[310px] flex items-center justify-center pt-5 pb-12">
                    <TextRegular
                      title="아직 완료된 펀딩이 없어요🎁"
                      style="text-Body-2 text-Gray-06 text-center"
                    />
                  </View>
                )}
              </>
            )}
          </ScrollView>
        </View>
        {friendFundingsQuery && (
          <View className="bg-white my-4 py-10 flex flex-col">
            <View className="flex flex-row justify-between mx-6">
              <View className="flex flex-row">
                <TextSemiBold title="현재 " style="text-Heading-4" />
                <TextSemiBold
                  title="진행중"
                  style="text-Heading-4 text-Main-01"
                />
                <TextSemiBold title="인 펀딩" style="text-Heading-4" />
              </View>
              {friendFundingsQuery.length > 0 && (
                <Pressable
                  onPress={throttle(
                    () =>
                      navigation.navigate('FriendFundList', {
                        headerTitle: '펀딩',
                      }),
                    1000,
                  )}>
                  <TextSemiBold
                    title="모두보기 >"
                    style="text-Detail-1 text-Gray-06"
                  />
                </Pressable>
              )}
            </View>
            <View className="flex flex-row gap-1 mt-6 ml-6">
              <Pressable className="bg-Main-01 px-4 h-[32px] flex justify-center items-center rounded-3xl">
                <TextRegular title="전체" style="text-white" />
              </Pressable>
              {/* <Pressable className="bg-Sub-01 px-4 h-[32px] flex justify-center items-center rounded-3xl">
                <TextRegular title="생일" style="text-Main-01" />
              </Pressable>
              <Pressable className="bg-Sub-01 px-4 h-[32px] flex justify-center items-center rounded-3xl">
                <TextRegular title="집들이" style="text-Main-01" />
              </Pressable> */}
            </View>
            <ScrollView
              className="flex flex-row pb-6 pl-4 pr-16"
              horizontal={true}
              showsHorizontalScrollIndicator={true}>
              {friendFundingsQuery.length > 0 &&
                friendFundingsQuery.map((fund: FriendFundItem) => (
                  <FundItem
                    key={fund.fundingId}
                    item={{
                      ...fund,
                    }}
                  />
                ))}
              {friendFundingsQuery.length < 1 && (
                <View className="pt-10 pb-14 w-[340px] flex justify-center items-center">
                  <TextRegular
                    title="앗, 진행중인 펀딩이 없네요🤫"
                    style="text-Gray-06"
                  />
                </View>
              )}
            </ScrollView>
            <Pressable
              className="pt-10 bg-white "
              ㅇ
              onPress={throttle(async () => {
                Platform.OS === 'ios'
                  ? Share.share({
                      url: 'https://www.giftmoa.co.kr/',
                      message: '모두가 행복한 새로운 선물 경험, 기프트모아',
                    })
                  : Share.share({
                      title: '모두가 행복한 새로운 선물 경험, 기프트모아',
                      message: 'https://www.giftmoa.co.kr/',
                    });
              }, 1000)}>
              <Image
                className="w-full h-[150px] bg-white"
                source={{
                  uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1709357319/7681c195-64c5-4c6e-b31e-ae94b9b58169.png',
                }}
              />
            </Pressable>
          </View>
        )}
      </ScrollView>
      <Footer screen="Home" />
    </>
  );
}
