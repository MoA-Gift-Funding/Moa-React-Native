import React, {useCallback, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import {useUserContext} from '../../contexts/UserContext';
import TextSemiBold from '../../components/text/TextSemiBold';
import TextRegular from '../../components/text/TextRegular';
import TextBold from '../../components/text/TextBold';
import MenuCategory from './components/MenuCategory';
import MenuCategoryTop from './components/MenuCategoryTop';
import useFriends from '../../hooks/friends/useFriends';
import {httpsUrlCorrector} from '../../utils/regex';
import useFunding from '../../hooks/fundings/useFunding';
import {getContactsInfo, throttle} from '../../utils/device';
import LoadingBar from '../../components/bar/LoadingBar';
import Notification from '../../components/svg/Notification';
import useNotifications from '../../hooks/notification/useNotifications';
import {useRefetchOnFocus} from '../../hooks/handlers/useRefetchOnFocus';
import Footer from '../../components/footer/Footer';

export default function MyPageMainScreen({navigation}) {
  const {
    userState: {user},
    dispatch,
  } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const {friendsQuery, syncContactsQuery} = useFriends();
  const {
    myProcessingFundingsQuery,
    myCompletedFundingsQuery,
    recievedMessagesQuery,
    myParticipatedFundingsQuery,
    refetchMyParticipatedFundingsQuery,
  } = useFunding(0, 100);

  const {hasUnReadQuery, refetchHasUnRead} = useNotifications();
  useRefetchOnFocus(refetchHasUnRead);
  useRefetchOnFocus(refetchMyParticipatedFundingsQuery);

  const syncFriends = useCallback(async () => {
    try {
      setIsLoading(true);
      const organized = await getContactsInfo();
      syncContactsQuery(organized);
    } finally {
      setIsLoading(false);
    }
  }, [syncContactsQuery]);

  const handleLogout = () => {
    Alert.alert(
      '로그아웃 하시겠습니까?',
      '',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '로그아웃',
          onPress: () => dispatch({type: 'LOGOUT'}),
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView className="bg-white">
          <View className="px-4">
            {isLoading && <LoadingBar />}
            <Pressable
              className="mb-2 flex items-end mt-2"
              onPress={throttle(
                () =>
                  navigation.navigate('MyNotificationScreen', {
                    headerTitle: '알림',
                  }),
                1000,
              )}>
              <Notification hasUnRead={hasUnReadQuery} color="#424242" />
            </Pressable>
            <View className="flex flex-row mb-6">
              <Image
                source={{
                  uri: httpsUrlCorrector(user?.profileImageUrl),
                }}
                className="w-[56px] h-[56px] rounded-full"
              />
              <View className="flex flex-col ml-3 justify-center">
                <Pressable
                  className="flex flex-row items-center"
                  onPress={throttle(
                    () =>
                      navigation.navigate('MyPageDetailScreen', {
                        headerTitle: '내 정보',
                      }),
                    1000,
                  )}>
                  <View className="w-[17px] h-[17px] bg-Kakao flex items-center justify-center rounded-sm">
                    <TextBold title="K" style="text-center text-Detail-1" />
                  </View>
                  <TextSemiBold
                    title={user?.nickname}
                    style="text-Body-1 ml-1"
                  />
                  <TextSemiBold
                    title=">"
                    style="text-Body-2 text-Gray-06 ml-1"
                  />
                </Pressable>
                <TextRegular
                  title={`${user?.birthday?.substring(
                    0,
                    2,
                  )}월 ${user?.birthday?.substring(2)}일`}
                  style="text-Body-2 text-Gray-06 mt-1"
                />
              </View>
            </View>
            <View className="flex flex-row items-center justify-around py-6 border-t-2 border-Gray-01">
              <MenuCategoryTop
                dataLength={
                  (myProcessingFundingsQuery?.length || 0) +
                  (myCompletedFundingsQuery?.length || 0) +
                  (myParticipatedFundingsQuery?.length || 0)
                }
                title="펀딩"
                onPress={() =>
                  navigation.navigate('MyFundingScreen', {headerTitle: '펀딩'})
                }
              />
              <MenuCategoryTop
                dataLength={friendsQuery?.length || 0}
                title="친구"
                onPress={() =>
                  navigation.navigate('MyFriendsScreen', {headerTitle: '친구'})
                }
              />
              <MenuCategoryTop
                dataLength={recievedMessagesQuery?.length || 0}
                title="메세지"
                onPress={() =>
                  navigation.navigate('MyMessagesScreen', {
                    headerTitle: '메세지',
                  })
                }
              />
            </View>
          </View>
        </SafeAreaView>
        <View className="bg-white mt-3">
          <MenuCategory
            title="주문 · 배송"
            onPress={() =>
              navigation.navigate('MyOrdersScreen', {
                headerTitle: '주문 · 배송',
              })
            }
          />
          <MenuCategory title="친구 불러오기" onPress={() => syncFriends()} />
        </View>
        <View className="bg-white mt-3">
          <MenuCategory
            title="공지사항"
            onPress={() =>
              navigation.navigate('AnnouncesScreen', {headerTitle: '공지사항'})
            }
          />
          <MenuCategory
            title="고객 센터"
            onPress={() =>
              navigation.navigate('CustomerCenterScreen', {
                headerTitle: '고객센터',
              })
            }
          />
          <MenuCategory
            title="앱 설정"
            onPress={() =>
              navigation.navigate('AppConfigScreen', {headerTitle: '앱 설정'})
            }
          />
        </View>
        <View className="bg-white mt-3">
          <MenuCategory
            title="도움말"
            onPress={() =>
              navigation.navigate('MoATermsAndUsagesScreen', {
                headerTitle: '도움말',
              })
            }
          />
          <MenuCategory title="로그아웃" onPress={handleLogout} />
          {/* <MenuCategory title="회원탈퇴" onPress={() => {}} /> */}
        </View>
      </ScrollView>
      <Footer screen="MyPage" />
    </>
  );
}
