import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
  Pressable,
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
import MyFund from './MyFund';
import FundItem from './FundItem';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import useFunding from '../../hooks/useFunding';
import {FriendFund, MyFundItem} from '../../types/Funding';
import {useRefetchOnFocus} from '../../hooks/useRefetchOnFocus';

export default function Home({navigation}) {
  const {
    userState: {user},
  } = useUserContext();
  const [activated, setActivated] = useState(true);
  const [myFunds, setMyFunds] = useState<MyFundItem[]>([]);
  const [friendFunds, setFriendFunds] = useState<FriendFund[]>([]);
  const {
    myFundingsQuery,
    friendFundingsQuery,
    refetchFriendFudingQuery,
    refetchMyFundingsQuery,
  } = useFunding(0, 3);
  useRefetchOnFocus(refetchFriendFudingQuery);
  useRefetchOnFocus(refetchMyFundingsQuery);

  useEffect(() => {
    const requestAOSPermit = async () => {
      const authStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (authStatus === 'granted') {
        getFCMToken();
      }
      console.log(authStatus);
    };

    const requestiOSPermit = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      console.log(authStatus);
      if (enabled) {
        return getFCMToken();
      }
    };

    const getFCMToken = async () => {
      const fcmToken = await messaging()
        .getToken()
        .then(res => res)
        .catch(error => console.log(error));
      console.log('FCM토큰값:', fcmToken);
    };

    if (Platform.OS === 'android') {
      requestAOSPermit();
    }
    if (Platform.OS === 'ios') {
      requestiOSPermit();
    }

    if (myFundingsQuery) {
      setMyFunds(myFundingsQuery.content);
    }
    if (friendFundingsQuery) {
      setFriendFunds(friendFundingsQuery.content);
    }
  }, [myFundingsQuery, friendFundingsQuery]);

  return (
    <>
      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
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
            {myFunds.length > 0 && (
              <Pressable>
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
            {myFunds.length > 0 &&
              activated &&
              myFunds
                .filter(fund => fund.status === '진행중')
                .map(fund => (
                  <MyFund
                    key={fund.id}
                    item={{
                      ...fund,
                    }}
                  />
                ))}
            {myFunds.length > 0 &&
              !activated &&
              myFunds
                .filter(fund => fund.status === '배달완료')
                .map(fund => (
                  <MyFund
                    key={fund.id}
                    item={{
                      ...fund,
                    }}
                  />
                ))}
            {myFunds.length > 0 && !activated && (
              <TextRegular
                title="아직 완료된 펀딩이 없어요🎁"
                style="text-Body-2 mt-4"
              />
            )}
            {myFunds.length < 1 && (
              <TextRegular
                title="바로가기를 통해 펀딩을 만들어볼까요?🎁"
                style="text-Body-2 mt-4"
              />
            )}
          </ScrollView>
        </View>
        <View className="bg-white my-4 py-10 flex flex-col">
          <View className="flex flex-row ml-6">
            <TextSemiBold title="현재 " style="text-Heading-4" />
            <TextSemiBold title="진행중" style="text-Heading-4 text-Main-01" />
            <TextSemiBold title="인 펀딩" style="text-Heading-4" />
          </View>
          <View className="flex flex-row gap-1 mt-6 ml-6">
            <Pressable className="bg-Main-01 px-4 h-[32px] flex justify-center items-center rounded-3xl">
              <TextRegular title="전체" style="text-white" />
            </Pressable>
            <Pressable className="bg-Sub-01 px-4 h-[32px] flex justify-center items-center rounded-3xl">
              <TextRegular title="생일" style="text-Main-01" />
            </Pressable>
            <Pressable className="bg-Sub-01 px-4 h-[32px] flex justify-center items-center rounded-3xl">
              <TextRegular title="집들이" style="text-Main-01" />
            </Pressable>
          </View>
          <ScrollView
            className="flex flex-row py-6 pl-4 pr-16"
            horizontal={true}
            showsHorizontalScrollIndicator={true}>
            {friendFunds.length > 0 &&
              friendFunds.map(fund => (
                <FundItem
                  key={fund.fundingId}
                  item={{
                    ...fund,
                    productImageUrl:
                      fund.productImageUrl ||
                      'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1707260796/moa_testimg_zcylnl.jpg',
                  }}
                />
              ))}
            {friendFunds.length < 1 && (
              <TextRegular title="진행중인 펀딩이 없네요🤫" style="mt-8 ml-4" />
            )}
          </ScrollView>
          <Pressable
            className="mt-10 bg-white rounded-xl"
            onPress={async () => {
              Platform.OS === 'ios'
                ? Share.share({
                    url: 'https://www.giftmoa.co.kr/',
                    message: '새로운 선물 경험을 선사하는 플랫폼, 모아',
                  })
                : Share.share({
                    title: '새로운 선물 경험을 선사하는 플랫폼, 모아',
                    message: 'https://www.giftmoa.co.kr/',
                  });
            }}>
            <Image
              className="w-full h-[136px] rounded-xl"
              source={{
                uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1703226051/moa-banner2_atc4su.png',
              }}
            />
          </Pressable>
        </View>
      </ScrollView>
      <Footer screen="Home" />
    </>
  );
}
