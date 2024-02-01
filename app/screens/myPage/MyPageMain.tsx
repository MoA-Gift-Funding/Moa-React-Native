import React from 'react';
import {Image, Pressable, SafeAreaView, ScrollView, View} from 'react-native';
import {useUserContext} from '../../contexts/UserContext';
import TextSemiBold from '../../components/text/TextSemiBold';
import TextRegular from '../../components/text/TextRegular';
import TextBold from '../../components/text/TextBold';
import MenuCategory from './components/MenuCategory';
import MenuCategoryTop from './components/MenuCategoryTop';
import useFriends from '../../hooks/useFriends';

const MyPageMain = ({navigation}) => {
  const {
    userState: {user},
  } = useUserContext();
  const {friendsQuery} = useFriends();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="bg-white">
        <View className="px-4">
          <Pressable
            className="mb-2 flex items-end mt-2"
            onPress={() =>
              navigation.navigate('MyAlarm', {headerTitle: '알림'})
            }>
            <Image
              source={{
                uri: 'https://res.cloudinary.com/dkjk8h8zd/image/upload/v1704254786/image_gqjmje.png',
              }}
              width={40}
              height={40}
            />
          </Pressable>
          <View className="flex flex-row mb-6">
            <Image
              source={{
                uri:
                  user?.profileImageUrl[4] !== 's'
                    ? `https://${user.profileImageUrl?.substring(7)}`
                    : user.profileImageUrl,
              }}
              className="w-[56px] h-[56px] rounded-full"
            />
            <View className="flex flex-col ml-3 justify-center">
              <Pressable
                className="flex flex-row items-center"
                onPress={() =>
                  navigation.navigate('MyPageDetail', {headerTitle: '내 정보'})
                }>
                <View className="w-[17px] h-[17px] bg-Kakao flex items-center justify-center rounded-sm">
                  <TextBold title="K" style="text-center text-Detail-1" />
                </View>
                <TextSemiBold title={user?.nickname} style="text-Body-1 ml-1" />
                <TextSemiBold title=">" style="text-Body-2 text-Gray-06 ml-1" />
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
              dataLength={2}
              title="펀딩"
              onPress={() =>
                navigation.navigate('MyFunding', {headerTitle: '펀딩'})
              }
            />
            <MenuCategoryTop
              dataLength={friendsQuery?.length || 0}
              title="친구"
              onPress={() =>
                navigation.navigate('MyFriends', {headerTitle: '친구'})
              }
            />
            <MenuCategoryTop
              dataLength={53}
              title="메세지"
              onPress={() =>
                navigation.navigate('MyMessages', {headerTitle: '메세지'})
              }
            />
          </View>
        </View>
      </SafeAreaView>
      <View className="bg-white mt-3">
        <MenuCategory
          title="주문 · 배송"
          onPress={() =>
            navigation.navigate('MyOrders', {headerTitle: '주문 · 배송'})
          }
        />
        <MenuCategory title="친구 불러오기" onPress={() => {}} />
      </View>
      <View className="bg-white mt-3">
        <MenuCategory
          title="공지사항"
          onPress={() =>
            navigation.navigate('Notices', {headerTitle: '공지사항'})
          }
        />
        <MenuCategory
          title="고객 센터"
          onPress={() =>
            navigation.navigate('CustomerCenter', {headerTitle: '고객센터'})
          }
        />
        <MenuCategory
          title="1:1 문의"
          onPress={() =>
            navigation.navigate('MyInquiries', {headerTitle: '문의내역'})
          }
        />
        <MenuCategory title="앱 설정" onPress={() => {}} />
      </View>
      <View className="bg-white mt-3">
        <MenuCategory title="로그아웃" onPress={() => {}} />
        <MenuCategory title="회원탈퇴" onPress={() => {}} />
      </View>
    </ScrollView>
  );
};
export default MyPageMain;
